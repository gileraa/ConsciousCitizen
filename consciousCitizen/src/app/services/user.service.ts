import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../profile/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User;
  constructor(private http: HttpClient, private authService: AuthService) {}

  update(user: string): Observable<{ response }> {
    return this.http.patch<{ response }>('/saveActor', user);
  }

  getUserData(): User {
    let userData: any = this.authService.getToken();
    if (!userData) {
      return <User>{};
    }
    this.user = {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.secondName,
      password: userData.password,
      id: this.authService.getUserId().toString(),
      apartment: userData.apartment,
      building: userData.building,
      city: userData.city,
      login: userData.login,
      middleName: userData.middleName,
      newsletter: userData.newsletter,
      phoneNumber: userData.phoneNumber,
      role: userData.role,
      status: userData.status,
      street: userData.street,
    };
    return this.user;
  }
}
