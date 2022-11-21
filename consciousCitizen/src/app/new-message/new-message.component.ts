import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMessageComponent implements OnInit {
  // public readonly options: Record<EEventTypeOptions, string> = {
  //   [EEventTypeOptions.All]: 'Все',
  //   [EEventTypeOptions.Parking]: 'Парковки',
  //   [EEventTypeOptions.OutdatedProduct]: 'Просроченные продукты',
  // };
  // public readonly options: Map<EEventTypeOptions, string> = new Map([
  //   [EEventTypeOptions.All, 'Все'],
  //   [EEventTypeOptions.Parking, 'Парковки'],
  //   [EEventTypeOptions.OutdatedProduct, 'Просроченные продукты'],
  // ]);
  public options = ["Все", "Парковки", "Просроченные продукты"];
  formGroup: FormGroup;
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  titleAlert: string = 'This field is required';
  post: any = '';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    console.log('new');
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


  onSubmit(post) {
    this.post = post;

  }
}
