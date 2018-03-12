import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { HelpPage } from '../help/help'
import { QuestionsPage } from '../questions/questions'

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

    startBtnEnabled:boolean=false;
    
    technique : number = 1;
    pilotage : number = 1;
    fonctionnel : number = 1;
    extra : number = 0;
    total : number = 3;
    
    constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ComposeQuestionPage');
    }
    
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
                        console.log('Non clicked');
                    }
                },
                {
                    text: 'Oui',
                    handler: () => {
                        console.log('Oui clicked');
                        this.navCtrl.push(QuestionsPage);
                    }
                }
            ]
        });
        alert.present();
    }
}
