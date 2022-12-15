import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { EEventTypeOptions } from '../events-map/enums/event-type-options.enum';
import { IEvent } from '../events-map/interfaces/event.interface';

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

  map = {
    Все: [EEventTypeOptions.All],
    Парковки: [EEventTypeOptions.Parking],
    'Просроченные продукты': [EEventTypeOptions.OutdatedProduct],
  };

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  titleAlert: string = 'This field is required';
  post: any = '';

  filteredOptions: Observable<any[]>;
  myControl = new FormControl('');

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.createForm();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      switchMap((value) => {
        return from(this.getCoordinates(value));
      }),
      map((x) => this.coordinates)
    );
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

  displayFn(value: any): string {
    return value && value.display_name;
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      categories: [this.options, Validators.required],
      description: [''],
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

  async getCoordinates(value: string) {
    // options: Record<EEventTypeOptions, string> = {
    //   [EEventTypeOptions.All]: 'Все',
    //   [EEventTypeOptions.Parking]: 'Парковки',
    //   [EEventTypeOptions.OutdatedProduct]: 'Просроченные продукты',
    // };
    const params: Record<string, string> = {
      ['q']: value,
      ['format']: 'json',
      ['addressdetails']: '1',
      ['polygon_geojson']: '0',
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: 'GET',
      redirect: 'follow' as RequestRedirect,
    };
    return fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result));
        this.coordinates = JSON.parse(result);
      })
      .catch((err) => console.log('err: ', err));
  }

  submit(isDraft: boolean) {
    console.info(this.myControl.value);
    console.log('coord: ', this.coordinates); // ответ получаем правильный, координаты приходят

    const events = localStorage.getItem('events');
    if (!events) {
      localStorage.setItem('events', JSON.stringify([]));
    }

    const e = JSON.parse(localStorage.getItem('events')) as IEvent[];

    e.push({
      lat: this.myControl.value.lat,
      lng: this.myControl.value.lon,
      description: this.description.value,
      type: this.map[this.formGroup.controls.categories.value][0],
      name: this.name.value,
      address: this.myControl.value.display_name,
      date: new Date().toDateString(),
      firstImageBase64: this.previews[0],
      secondImageBase64: this.previews[0],
      isDraft: isDraft,
      id: this.guid(),
    });

    localStorage.setItem('events', JSON.stringify(e));

    this.formGroup.reset();

    if (isDraft) {
      this.router.navigate(['/messanger']);
    } else {
      this.router.navigate(['/']);
    }
  }

  guid() {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };

    return (
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4()
    );
  }
}
