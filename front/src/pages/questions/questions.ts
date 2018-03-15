import { ViewChild, Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Content } from 'ionic-angular';

import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

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

@Component({
    selector: 'page-questions',
    templateUrl: 'questions.html',
    animations: [
    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true}),
          
        query(':leave', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])

  ]
})
export class QuestionsPage {
    
    @ViewChild(Content) content: Content;
    
    loading;                    // loader
    questions : IQuestion[];    // all questions of this user
    responses : IResponse[];    // responses RESPONSED BEFORE THIS SESSION, won't add new response into
    counter : number;           // question counter
    cards = [];                 // question cards
    title : string;             // page header
    questionStartTime : number; // timer
    startScrollDelay : number;  // first scroll down time (if user get into the page with some questions responsed before)

    constructor(public navCtrl: NavController, public navParams: NavParams, 
               private alertCtrl : AlertController, private loadingCtrl : LoadingController, 
               private loaderService : LoaderService, private questionService : QuestionService, 
               private userService : UserService) 
    {
        this.questions = this.userService.questions;
        this.responses = this.userService.responses;
        this.counter = this.responses.length;
        this.startScrollDelay = this.counter * 500;
        
        for(let i = 0; i < this.responses.length; i++) {
            this.cards.push({ question : this.questions[i], response : this.responses[i] });

            setTimeout(() => {
                this.content.scrollToBottom(this.startScrollDelay);
            }, 500);
        }
    }

    ionViewDidLoad() {
        setTimeout(() => {
            this.nextQuestion();
        }, this.startScrollDelay);
    }
    
    public postResponse() {
        this.loading = this.loaderService.getLoader(this.loadingCtrl);
        this.loading.present();
        
        this.cards[this.counter - 1].response.time = Math.floor(Date.now() / 1000) - this.questionStartTime; // end timer
        console.log(this.cards[this.counter - 1]);
        this.questionService.postResponse(this.cards[this.counter - 1].response)
            .subscribe((res) => {
                console.log(res);
                if(!res.valid) {
                    console.log("postResponse failed");
                    this.showAlert(res);
                } else {
                    console.log("postResponse ok");
                    this.nextQuestion();
                }
                this.loading.dismiss();
            }
        );
        
    }
    
    private nextQuestion() : void {
        this.counter++;
        if(this.counter <= this.questions.length) {
            this.cards[this.counter - 1] = {question : this.questions[this.counter - 1], 
                                            response : {userId : this.userService.currentUserId, answerId : null, time : null } 
                                           };
            this.title = "Question " + this.counter + "/" + this.questions.length + " : Question " + this.cards[this.counter - 1].question.type;

            setTimeout(() => {
                this.content.scrollToBottom(500);
                this.questionStartTime = Math.floor(Date.now() / 1000); // start timer
            });
        } else { // finished
            
            this.loading = this.loaderService.getLoader(this.loadingCtrl);
            this.loading.present();

            // check user state
            this.userService.getUserState(this.userService.currentUserId).subscribe((res2) => {
                console.log(res2);
                if(res2.valid) {
                    console.log("getUserState ok")

                    const state : string = res2.data.state;
                    switch(state) {
                        case "composing":
                            console.log("user composing, state incorrect");
                            this.showAlert("state incorrect");
                            break;

                        case "responsing":
                            console.log("user responsing, state incorrect");
                            break;
                        case "responsed":
                            this.userService.questions = res2.data.questions.map(q => q as IQuestion);
                            this.userService.responses = res2.data.responses.map(r => {
                                return {userId: r.user_id, answerId : r.answer_id, time : r.time} as IResponse
                            });
                            this.userService.result = res2.data.result;
                            
                            console.log(this.userService.questions);
                            console.log(this.userService.responses);
                            console.log(this.userService.result);
                            
                            this.navCtrl.push(ResultPage);

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
        }
    }
    
    radioClicked(answerId, card) : void {
        card.response.answerId = answerId;
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
