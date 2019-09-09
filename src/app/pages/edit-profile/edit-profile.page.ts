import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  user = {
    cod: "",
    name: "",
    userName: "",
    profile: "",
  }

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private authService: AuthService,
    private userService: UserService
  ) {

    this.user.cod = this.authService.getId();
    this.user.name = this.authService.getName();
    this.user.userName = this.authService.getUser();
    this.user.profile = this.authService.getPosition();
  }

  ngOnInit() {
  }

  async sendData() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    this.userService.getByUserName(this.user.userName).then((respU: any) => {
      respU.name = this.user.name;
      respU.user = this.user.userName;
      respU.position = this.user.profile;

      this.authService.saveData(respU.user, respU.name, respU.id, respU.position);

      this.userService.updateUser(respU).then(resp => {
        loader.present();
        loader.onWillDismiss().then(async l => {
          const toast = await this.toastCtrl.create({
            showCloseButton: true,
            cssClass: 'bg-profile',
            message: 'Su perfil se ha actualizado correctamente!',
            duration: 2000,
            position: 'bottom'
          });

          toast.present();
          this.navCtrl.navigateForward('/home');
        });
      }).catch(err => {
        loader.present();
        loader.onWillDismiss().then(async l => {
          const toast = await this.toastCtrl.create({
            showCloseButton: true,
            cssClass: 'bg-profile',
            message: 'Se produjo un error al actualizar!',
            duration: 2000,
            position: 'bottom'
          });

          toast.present();
          this.navCtrl.navigateForward('/home');
        });
      });
    }).catch(errU => console.log(errU));
  }

}
