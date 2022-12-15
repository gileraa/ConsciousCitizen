import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IActor } from '../events-map/interfaces/actor.interface';
import { BASE_URL, TOKEN } from 'src/app/shared/consts';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userId: number;
  private token = null;
  userLogin = '';
  private readonly url = `${BASE_URL}/actor`;

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<IActor> {
    const headers = new HttpHeaders();
    headers.set('Authorization', `Basic ${TOKEN}`);
    return this.http
      .get<IActor>(`${this.url}/${id}`, { headers: headers })
      .pipe(
        tap((token) => {
          this.setToken(token);
          this.userId = token.id;
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
