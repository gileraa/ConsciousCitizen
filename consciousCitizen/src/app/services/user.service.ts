import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../profile/user';
import { AuthService } from './auth.service';
import { BASE_URL, TOKEN } from 'src/app/shared/consts';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User;
  private readonly url = `${BASE_URL}`;
  constructor(private http: HttpClient, private authService: AuthService) {}

  update(user: string): Observable<{ response }> {
    const headers = new HttpHeaders();
    headers.set('Authorization', `Basic ${TOKEN}`);
    headers.set('Content-Type', 'application/json');
    return this.http.patch<{ response }>(`${this.url}/saveActor`, user, {
      headers: {
        Authorization: `Basic ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
  }

  getUserData(): User {
    let userData: any = this.authService.getToken();
    if (!userData) {
      return <User>{};
    }

    this.user = {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
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
