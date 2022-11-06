import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewMessageComponent implements OnInit {
  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];
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
    this.createForm();
    this.setChangeValidate();
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
      name: ["", Validators.required],
      categories: [null, Validators.required],
      description: [
        ""
      ],
      address: ["", Validators.required],
      image: [null],
      validate: '',
    });
  }

  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe((validate) => {
      if (validate == '1') {
        this.formGroup
          .get('name')
          .setValidators([Validators.required, Validators.minLength(3)]);
        this.titleAlert = 'You need to specify at least 3 characters';
      } else {
        this.formGroup.get('name').setValidators(Validators.required);
      }
      this.formGroup.get('name').updateValueAndValidity();
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

  onSubmit(post) {
    this.post = post;
  }
}
