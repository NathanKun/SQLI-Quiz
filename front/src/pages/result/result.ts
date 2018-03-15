import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserService } from '../../app/user.service';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
    
    loading : any;
    result : any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private userService : UserService) {
        this.result = this.userService.result;
    }

    ionViewDidLoad() {
    }

}
