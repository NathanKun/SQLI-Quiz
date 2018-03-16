import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, Validators, FormControl } from '@angular/forms'

import { UserService } from '../../app/user.service';
import { LoaderService } from '../../app/loader.service';

import { ComposeQuestionPage } from '../compose-question/compose-question'
import { QuestionsPage } from '../questions/questions'
import { ResultPage } from '../result/result'

import { IQuestion } from '../../app/interfaces/question.interface'
import { IResponse } from '../../app/interfaces/response.interface'

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    loginForm: FormGroup;
    loading;
    safeSvg;
    loginBtnDisabled = true;

    constructor(public navCtrl: NavController, private userService: UserService, private loaderService : LoaderService,
                 private alertCtrl: AlertController, public loadingCtrl: LoadingController) { }
    
    ngOnInit(){
        this.loginForm = new FormGroup({
          name: new FormControl('', [
            Validators.required
          ])
        });
    }
    
    itemSelected() {
        // wait a little before enable button, because touching on first username will also touch on the button
        setTimeout(() => {
            this.loginBtnDisabled = false;
        }, 500);
    }
    
    itemsShown() {
        setTimeout(() => {
            this.loginBtnDisabled = true;
        }, 100);
    }

    submit() {
        let name = this.loginForm.value.name;
        
        if (name == null || name.length == 0) {
            let alert = this.alertCtrl.create({
                title: 'hum...',
                subTitle: 'Vous devez choisir votre nom dans la liste',
                buttons: ['OK']
            });
            alert.present();
        } else {
            this.createLoader();
            this.loading.present();
            
            this.userService.userlogin(name).subscribe((res) => {
                console.log(res);
                if(res.valid) {
                    console.log("userlogin ok");
                    // save user data
                    this.userService.currentUser = name;
                    this.userService.currentUserId = res.data.id;
                    
                    // check user state
                    this.userService.getUserState(this.userService.currentUserId).subscribe((res2) => {
                        console.log(res2);
                        if(res2.valid) {
                            console.log("getUserState ok")
                            
                            const state : string = res2.data.state;
                            switch(state) {
                                case "composing":
                                    console.log("user composing");
                                    this.navCtrl.push(ComposeQuestionPage);
                                    break;
                                    
                                case "responsing":
                                case "responsed":
                                    this.userService.questions = res2.data.questions.map(q => q as IQuestion);
                                    this.userService.responses = res2.data.responses.map(r => {
                                        return {userId: r.user_id, answerId : r.answer_id, time : r.time} as IResponse
                                    });
                                    this.userService.result = res2.data.result;
                                    console.log(this.userService.questions);
                                    console.log(this.userService.responses);
                                    console.log(this.userService.result);
                                    
                                    if(state == "responsing") {
                                        console.log("user responsing");
                                        this.navCtrl.push(QuestionsPage);
                                    } else {
                                        this.navCtrl.push(ResultPage);
                                        console.log("user responsed");
                                    }
                                    break;
                                    
                                default:
                                    console.log("user is beyond the earth");
                                    this.showAlert("state incorrect");
                                    break;
                            }
                        } else {
                            console.log("getUserState failed")
                            this.showAlert(res2);
                        }
                        this.loading.dismiss();
                    });
                } else {
                    console.log("userlogin failed");
                    this.showAlert(res);
                    this.loading.dismiss();
                }
            });
            
        }
    }
    
    private createLoader() {
        this.loading = this.loaderService.getLoader(this.loadingCtrl);
    }
    
    private showAlert(msg) {
        let alert = this.alertCtrl.create({
            title: 'Something wrong...',
            subTitle: typeof msg === "string" ? msg : (msg.hasOwnProperty('error') ? msg.error : JSON.stringify(msg)),
            buttons: ['OK']
        });
        alert.present();
    }
}
