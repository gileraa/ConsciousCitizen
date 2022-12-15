import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from './user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public isEditingMode = false;
  user: User;

  public personForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.personForm = new FormGroup({
      firstName: new FormControl(
        { value: null, disabled: !this.isEditingMode },
        Validators.required
      ),
      lastName: new FormControl(
        { value: null, disabled: !this.isEditingMode },
        Validators.required
      ),
      middleName: new FormControl(
        { value: null, disabled: !this.isEditingMode },
        Validators.required
      ),
      email: new FormControl(
        { value: null, disabled: !this.isEditingMode },
        Validators.required
      ),
      phoneNumber: new FormControl(
        { value: null, disabled: !this.isEditingMode },
        Validators.required
      ),
      city: new FormControl(
        { value: null, disabled: !this.isEditingMode },
        Validators.required
      ),
      street: new FormControl(
        { value: null, disabled: !this.isEditingMode },
        Validators.required
      ),
      building: new FormControl(
        { value: null, disabled: !this.isEditingMode },
        Validators.required
      ),
      apartment: new FormControl(
        { value: null, disabled: !this.isEditingMode },
        Validators.required
      ),
      login: new FormControl(
        { value: null, disabled: !this.isEditingMode },
        Validators.required
      ),
      password: new FormControl(
        { value: null, disabled: !this.isEditingMode },
        Validators.required
      ),
      newPassword: new FormControl({ value: '' }),
    });
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      this.personForm.patchValue(this.user);
    } else {
      this.user = {
        firstName: 'Иван',
        lastName: 'Иванов',
        middleName: 'Иванович',
        email: 'ivanov@ivan.com',
        phoneNumber: '88088888888',
        city: 'Иваново',
        street: 'Ивановская',
        building: '88',
        apartment: '8',
        login: 'vanjka',
        password: '1111',
        id: '1',
        status: false,
        newsletter: false,
        role: {
          id: 1,
          name: 'user',
        },
      };
      this.personForm.patchValue(this.user);
    }
  }

  public modeChanged() {
    this.isEditingMode = !this.isEditingMode;
    if (this.isEditingMode) {
      this.personForm.enable();
    } else {
      this.personForm.disable();
    }
  }

  public submitForm() {
    this.updateUserData();
    this.modeChanged();
  }

  updateUserData() {
    if (this.personForm.value['newPassword'] != null) {
      this.user.password = this.personForm.value['newPassword'];
    } else {
      this.user.password = this.personForm.value['password'];
    }
    this.user.firstName = this.personForm.value['firstName'];
    this.user.lastName = this.personForm.value['lastName'];
    this.user.middleName = this.personForm.value['middleName'];
    this.user.email = this.personForm.value['email'];
    this.user.phoneNumber = this.personForm.value['phoneNumber'];
    this.user.city = this.personForm.value['city'];
    this.user.street = this.personForm.value['street'];
    this.user.building = this.personForm.value['building'];
    this.user.apartment = this.personForm.value['apartment'];
    this.user.login = this.personForm.value['login'];
    this.user.status = false;
    this.user.role = { id: 1, name: 'Ivan' };
    localStorage.setItem('user', JSON.stringify(this.user));
  }
}
