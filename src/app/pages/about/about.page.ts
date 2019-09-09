import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  items: any = [];

  constructor(private userService: UserService) {
    this.getItems();
  }

  ngOnInit() {
  }

  getItems() {
    this.userService.getAll().then(resp => this.items = resp);
  }

}
