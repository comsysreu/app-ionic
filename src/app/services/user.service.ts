import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_URL } from '../enums/links.enum';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  getQuery(query: string) {
    const url = `${USER_URL}${query}`;
    const authToken = this.authService.getToken();

    return this.httpClient.get<[any]>(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken
      }
    }).toPromise();
  }

  getAll() {
    return this.getQuery(``);
  }

  getById(userId: string) {
    return this.getQuery(userId);
  }

  getByUserName(user: string) {
    return this.getQuery(`user/${user}`);
  }

  postQuery(query: string, item: any) {
    const url = `${USER_URL}${query}`;
    const authToken = this.authService.getToken();

    return this.httpClient.post<any>(url, item, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken
      }
    }).toPromise();
  }

  postUser(item: any) {
    return this.postQuery(``, item);
  }

  updateQuery(query: string, item: any) {
    const url = `${USER_URL}${query}`;
    const authToken = this.authService.getToken();

    return this.httpClient.put<any>(url, item, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken
      }
    }).toPromise();
  }

  updateUser(item: any) {
    return this.updateQuery(``, item);
  }

  deleteQuery(query: string, id: number) {
    const url = `${USER_URL}${query}${id}`;
    const authToken = this.authService.getToken();

    return this.httpClient.delete<any>(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken
      }
    }).toPromise();
  }

  deleteUser(id: number) {
    return this.deleteQuery(``, id);
  }

}
