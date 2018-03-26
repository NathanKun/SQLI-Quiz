import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { UserService } from '../../app/user.service';
import { QuestionService } from '../../app/question.service';
import { ApiService } from '../../app/api.service';
import { LoaderService } from '../../app/loader.service';

import { ComposeQuestionPage } from '../compose-question/compose-question'

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

    constructor(public navCtrl: NavController, public navParams: NavParams, 
                 public loadingCtrl : LoadingController, private alertCtrl : AlertController, 
                 private userService : UserService, private apiService : ApiService, 
                 private questionService : QuestionService, private loaderService : LoaderService) {
        this.result = this.userService.result;
    }

    ionViewDidLoad() { }
    
    toLeaderboard() {
        window.open(this.apiService.leaderboard);
    }
    
    retry() {
        let alert = this.alertCtrl.create({
            title: 'Confirmation',
            message: "Vous voulez rejouer ? Seul le dernier score est retenu...",
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
                        this.questionService.retry(this.userService.currentUserId).subscribe((res) => {
                            console.log(res);
                            if(res.valid) {
                                console.log("retry ok");
                                this.navCtrl.push(ComposeQuestionPage);
                            } else {
                                console.log("retry failed");
                                this.showAlert(res);
                            }
                            this.loading.dismiss();
                        });
                    }
                }
            ]
        });
        alert.present();        
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
