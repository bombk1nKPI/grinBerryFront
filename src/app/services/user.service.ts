import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../lib/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string;

  constructor(private readonly http: HttpClient) {
    this.baseUrl = 'https://localhost:8080/api/user'
}
getUserProfile(): Observable<User> {
  return this.http.get<User>(`${this.baseUrl}/profile`);
}
}
