import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * Generated class for the ComposeQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-compose-question',
    templateUrl: 'compose-question.html',
})
export class ComposeQuestionPage {

    
    technique : number = 1;
    fonctionnel : number = 1;
    pilotage : number = 1;
    extra : number = 0;
    total : number = 3;
    
    constructor(public navCtrl: NavController, public navParams: NavParams) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ComposeQuestionPage');
    }
    
    rangeOnChange() {
        this.total = this.technique + this.fonctionnel + this.pilotage;
    }

}
