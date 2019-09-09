import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LOGIN_URL, LOGOUT_URL, VALIDATED_TOKEN } from '../enums/links.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private httpClient: HttpClient) { }

  public isAuthenticated() {
    const token = this.getToken();
    const user = this.getUser();
    const name = this.getName();

    if ((!token || token === '') && (!user || user === '') && (!name || name === '')) {
      this.loggedOut();
      return false;
    } else {
      return true;
    }
  }

  public saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  public saveData(user: string, name: string, id: string, position: string) {
    localStorage.setItem('user', user);
    localStorage.setItem('name', name);
    localStorage.setItem('id', id);
    localStorage.setItem('position', position);
  }

  public getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  public getUser() {
    const user = localStorage.getItem('user');
    return user;
  }

  public getName() {
    const name = localStorage.getItem('name');
    return name;
  }

  public getId() {
    const id = localStorage.getItem('id');
    return id;
  }

  public getPosition() {
    const position = localStorage.getItem('position');
    return position;
  }

  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    localStorage.removeItem('position');
    this.router.navigate(['/']);
  }

  login(user: string, password: string) {
    const loginCredentials = `{
        "user" : "${user}", 
        "password" : "${password}" 
    }`;

    return this.httpClient.post(LOGIN_URL, loginCredentials, {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'text'
    }).toPromise();
  }

  loggedOut() {
    const headers: any = {
      'Content-Type': 'application/json',
      'Authorization': this.getToken(),
    };

    this.validateToken(headers).subscribe(resp => {
      if (resp) {
        this.httpClient.delete(`${LOGIN_URL}/${this.getToken()}`, { headers }).subscribe((resLogout: any) => {
        }, error => {
        });
      }
      this.clearLocalStorage();
    });
  }

  validateToken(headers?: any) {

    const headersT: any = {
      'Content-Type': 'application/json',
      'Authorization': this.getToken(),
    };

    if (headers == undefined) {
      headers = headersT;
    }

    const loginCredentials = `{"userName" : "${this.getUser()}", "token" : "${this.getToken()}"}`;
    return this.httpClient.post(VALIDATED_TOKEN, loginCredentials, { headers });
  }

}
