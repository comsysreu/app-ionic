import { Component, OnInit } from '@angular/core';
import { ContactUsService } from  '../../services/contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  items: any = [];

  constructor(private contactUsService: ContactUsService) {
    this.getItems();
  }

  ngOnInit() {
  }

  getItems() {
    this.contactUsService.getAll().then(resp => this.items = resp);
  }

}
