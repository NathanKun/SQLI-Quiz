import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormGroup, Validators, FormControl } from '@angular/forms'

import { UserService } from '../../app/user.service';

import { ComposeQuestionPage } from '../compose-question/compose-question'

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    loginForm: FormGroup;

    constructor(public navCtrl: NavController, public userService: UserService, private alertCtrl: AlertController) {
    }
    
    ngOnInit(){
        this.loginForm = new FormGroup({
          name: new FormControl('', [
            Validators.required
          ])
        })
    }

    submit() {
        let name = this.loginForm.value.name;
        
        if (name == null || name.length == 0) {
            let alert = this.alertCtrl.create({
                title: 'hum...',
                subTitle: 'Vouos devez choisir votre nom dans la liste',
                buttons: ['OK']
            });
            alert.present();
        } else {
            this.userService.currentUser = name;
            this.navCtrl.push(ComposeQuestionPage);
        }
    }
}
