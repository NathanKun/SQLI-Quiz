import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { UserService } from '../../app/user.service';
import { LoaderService } from '../../app/loader.service';

import { IQuestion } from '../../app/interfaces/question.interface'
import { IResponse } from '../../app/interfaces/response.interface'

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
    
    loading : any;
    result : any;

    constructor(public navCtrl: NavController, public navParams: NavParams, 
               private alertCtrl : AlertController, private loadingCtrl : LoadingController, 
               private loaderService : LoaderService, private userService : UserService) {
        this.result = this.userService.result;
    }

    ionViewDidLoad() {
    }

    
    private showAlert(msg) : void {
        let alert = this.alertCtrl.create({
            title: 'Something wrong...',
            subTitle: typeof msg === "string" ? msg : (msg.hasOwnProperty('error') ? msg.error : JSON.stringify(msg)),
            buttons: ['OK']
        });
        alert.present();
    }
}
