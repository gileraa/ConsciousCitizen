import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../profile/user';

export const BASE_URL = 'http://localhost:8080';

export const TOKEN = 'dXNlcjpmYTBkNjhjYi1lYzFkLTRkMTctODdmMy0wYTA1ZGM0MjgzNDg=';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userId: number;
  private token = null;
  userLogin = '';
  private readonly url = `${BASE_URL}/actor`;

  constructor(private http: HttpClient) {}
  // register(user: User): Observable<User> {
  //   return this.http.post<User>('/api/customers/register', user);
  // }

  getUserById(id: number): Observable<string> {
    const headers = new HttpHeaders();
    headers.set('Authorization', `Basic ${TOKEN}`);
    return this.http
      .get<string>(`${this.url}/${id}`, { headers: headers })
      .pipe(
        tap((token) => {
          localStorage.setItem('auth-token', token);
          const parsedToken = JSON.parse(token);
          this.setToken(parsedToken);
          this.userId = parsedToken.userId;
        })
      );
  }

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('auth-token') != null) {
      this.setToken(localStorage.getItem('auth-token'));
      this.userId = this.token.userId;
    }
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    this.userId = null;
    localStorage.clear();
  }
}
