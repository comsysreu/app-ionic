import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONTACT_US } from '../enums/links.enum';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  getQuery(query: string) {
    const url = `${CONTACT_US}${query}`;
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

  getById(itemId: number) {
    return this.getQuery(`${itemId}`);
  }

  postQuery(query: string, item: any) {
    const url = `${CONTACT_US}${query}`;

    return this.httpClient.post<any>(url, item, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).toPromise();
  }

  postItem(item: any) {
    return this.postQuery(``, item);
  }

}
