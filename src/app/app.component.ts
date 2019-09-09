import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Pages } from './interfaces/pages';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appPages: Array<Pages>;

  public name = '';
  public position = '';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    private authService: AuthService,
  ) {

    this.name = this.authService.getName();
    this.position = this.authService.getPosition();

    this.appPages = [
      {
        title: 'Inicio',
        url: '/home',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'Usuarios',
        url: '/user',
        direct: 'forward',
        icon: 'information-circle-outline'
      },
      {
        title: 'Bandeja de mensajes',
        url: '/contact-us',
        direct: 'forward',
        icon: 'information-circle-outline'
      },

      // {
      //   title: 'App Settings',
      //   url: '/settings',
      //   direct: 'forward',
      //   icon: 'cog'
      // }
    ];

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }).catch(() => { });
  }

  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.authService.loggedOut();
    // this.navCtrl.navigateRoot('/');
  }
}
