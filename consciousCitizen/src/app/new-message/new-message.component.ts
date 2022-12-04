import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search?';
const params = {
  q: '',
  format: 'json',
  addressdetails: 'addressdetails',
};

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMessageComponent implements OnInit {
  public options = ['Все', 'Парковки', 'Просроченные продукты'];
  formGroup: FormGroup;
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  coordinates: any = null;

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  titleAlert: string = 'This field is required';
  post: any = '';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  createForm() {

    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      categories: [this.options, Validators.required],
      description: [''],
      address: ['', Validators.required],
      image: [null],
      validate: '',
    });
  }

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  get address() {
    return this.formGroup.get('address') as FormControl;
  }

  get categories() {
    return this.formGroup.get('categories') as FormControl;
  }

  get description() {
    return this.formGroup.get('description') as FormControl;
  }

  async getCoordinates() {
    // options: Record<EEventTypeOptions, string> = {
      //   [EEventTypeOptions.All]: 'Все',
      //   [EEventTypeOptions.Parking]: 'Парковки',
      //   [EEventTypeOptions.OutdatedProduct]: 'Просроченные продукты',
      // };
    const params: Record<string, string> = {
      ['q']: this.address.value,
      ['format']: "json",
      ['addressdetails']: '1',
      ['polygon_geojson']: '0',
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow" as RequestRedirect,
    };
    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result));
        this.coordinates = JSON.parse(result);
      })
      .catch((err) => console.log("err: ", err));
  }

  submit(isDraft: boolean) {
    this.getCoordinates();
    console.log("coord: ", this.coordinates); // ответ получаем правильный, координаты приходят
    const event = {
      lat: null,
      lng: null,
      description: this.description.value,
      type: null,
      name: this.name.value,
      address: this.address.value,
      date: (new Date()).toISOString(),
      firstImageBase64: null,
      secondImageBase64: null,
      isDraft: isDraft,
    };
    this.formGroup.reset();
  }
}
