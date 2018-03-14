import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { UserService } from '../../app/user.service';
import { QuestionService } from '../../app/question.service';
import { LoaderService } from '../../app/loader.service';

import { ResultPage } from '../result/result'

import { IQuestion } from '../../app/interfaces/question.interface'
import { IResponse } from '../../app/interfaces/response.interface'

/**
 * Generated class for the QuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-questions',
    templateUrl: 'questions.html',
})
export class QuestionsPage {
    
    questions : IQuestion[];
    currentQuestion : IQuestion;
    counter : number;

    constructor(public navCtrl: NavController, public navParams: NavParams, 
               private alertCtrl : AlertController, private loadingCtrl : LoadingController, 
               private loaderService : LoaderService, private questionService : QuestionService, 
               private userSerivce : UserService) 
    {
        this.questions = this.userSerivce.questions;
        this.currentQuestion = this.questions[0];
        this.counter = 1; 
    }

    ionViewDidLoad() {
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
