import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { HelpPage } from '../help/help'
import { QuestionsPage } from '../questions/questions'

import { LoaderService } from '../../app/loader.service';
import { QuestionService } from '../../app/question.service';
import { UserService } from '../../app/user.service';

import { IQuestion } from '../../app/interfaces/question.interface'

/**
 * Generated class for the ComposeQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-compose-question',
    templateUrl: 'compose-question.html',
})
export class ComposeQuestionPage {
    
    loading;

    startBtnEnabled:boolean=false;
    
    technique : number = 1;
    pilotage : number = 1;
    fonctionnel : number = 1;
    extra : number = 0;
    total : number = 3;
    
    constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
                 private loadingCtrl : LoadingController, private loaderService : LoaderService, 
                 private questionService : QuestionService, private userService : UserService) { }
    
    rangeOnChange() {
        this.total = this.technique + this.fonctionnel + this.pilotage;
        
        if (this.total !== 7) {
            this.startBtnEnabled = false;
        } else {
            this.startBtnEnabled = true;
        }
    }

    goToHelpPage() {
        this.navCtrl.push(HelpPage);
    }
    
    gameStart() {
        const tech:string = this.technique === 1 ? " question technique</p>" : " questions techniques</p>"
        const pilo:string = this.pilotage === 1 ? " question pilotage</p>" : " questions pilotages</p>"
        const fonc:string = this.fonctionnel === 1 ? " question fonctionnel</p>" : " questions fonctionnels</p>"
        const extra:string = this.extra <= 1 ? " question supplémentaire</p>" : " questions supplémentaires</p>"
        
        const msg:string = 
            "<p>" + this.technique + tech + 
            "<p>" + this.pilotage + pilo + 
            "<p>" + this.fonctionnel + fonc + 
            "<p>" + this.extra + extra + 
            "<p>Are you ready?</p>"
        
        let alert = this.alertCtrl.create({
            title: 'Confirmation',
            message: msg,
            buttons: [
                {
                    text: 'Non',
                    role: 'cancel',
                    handler: () => {
                        
                    }
                },
                {
                    text: 'Oui',
                    handler: () => {
                        this.loading = this.loaderService.getLoader(this.loadingCtrl);
                        this.loading.present();
                        
                        this.questionService.composeQuestions({
                            userId : this.userService.currentUserId,
                            technique : this.technique,
                            pilotage : this.pilotage,
                            fonctionnel : this.fonctionnel,
                            extra : this.extra
                        }).subscribe((res) => {
                            console.log(res);
                            if(res.valid) {
                                console.log("composeQuestions ok");
                                
                                // check user state
                                this.userService.getUserState(this.userService.currentUserId).subscribe((res2) => {
                                    console.log(res2);
                                    
                                    if(res2.valid) {
                                        console.log("getUserState ok")
                                        
                                        const state : string = res2.data.state;
                                        switch(state) {
                                            case "responsing":
                                                console.log("user responsing");
                                                this.userService.questions = res2.data.questions.map(q => q as IQuestion);
                                                console.log(this.userService.questions);
                                                this.navCtrl.push(QuestionsPage);
                                                break;
                                                
                                            case "composing":
                                                console.log("user composing, state incorrect");
                                                this.showAlert("state incorrect");
                                                break;
                                                
                                            case "responsed":
                                                console.log("user responsed, state incorrect");
                                                this.showAlert("state incorrect");
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
                                });
                            } else {
                                console.log("composeQuestions failed");
                                this.showAlert(res);
                            }
                        });
                        this.loading.dismiss();
                        
                    }
                }
            ]
        });
        alert.present();
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
