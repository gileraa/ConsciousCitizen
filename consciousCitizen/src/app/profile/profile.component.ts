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
    this.authService.getUserById(1).subscribe();
    this.user = this.userService.getUserData();
    this.personForm = new FormGroup({
      firstName: new FormControl(
        { value: this.user?.firstName, disabled: !this.isEditingMode },
        Validators.required
      ),
      lastName: new FormControl(
        { value: this.user?.lastName, disabled: !this.isEditingMode },
        Validators.required
      ),
      middleName: new FormControl(
        { value: this.user?.middleName, disabled: !this.isEditingMode },
        Validators.required
      ),
      email: new FormControl(
        { value: this.user?.email, disabled: !this.isEditingMode },
        Validators.required
      ),
      phone: new FormControl(
        { value: this.user?.phoneNumber, disabled: !this.isEditingMode },
        Validators.required
      ),
      city: new FormControl(
        { value: this.user?.city, disabled: !this.isEditingMode },
        Validators.required
      ),
      street: new FormControl(
        { value: this.user?.street, disabled: !this.isEditingMode },
        Validators.required
      ),
      house: new FormControl(
        { value: this.user?.building, disabled: !this.isEditingMode },
        Validators.required
      ),
      apartment: new FormControl(
        { value: this.user?.apartment, disabled: !this.isEditingMode },
        Validators.required
      ),
      login: new FormControl(
        { value: this.user?.login, disabled: !this.isEditingMode },
        Validators.required
      ),
      password: new FormControl(
        { value: this.user?.password, disabled: !this.isEditingMode },
        Validators.required
      ),
      newPassword: new FormControl({ value: '' }),
    });
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
    this.userService.update(JSON.stringify(this.user)).subscribe(() => {
      this.authService.getUserById(1).subscribe();
    });
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
    this.user.email = this.personForm.value['email'];
    this.user.phoneNumber = this.personForm.value['phone'];
    this.user.city = this.personForm.value['city'];
    this.user.street = this.personForm.value['street'];
    this.user.building = this.personForm.value['building'];
    this.user.apartment = this.personForm.value['apartment'];
    this.user.login = this.personForm.value['login'];
    this.user.status = false;
    this.user.role = { id: 1, name: 'Ivan' };
  }
}
