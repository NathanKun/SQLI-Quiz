import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-help',
    templateUrl: 'help.html',
    animations: [
        trigger('listAnimation', [
            transition('* => *', [

                query(':enter', style({ opacity: 0 }), {optional: true}),

                query(':enter', stagger('200ms', [
                    animate('0.4s ease-in', keyframes([
                        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
                        style({opacity: 1, transform: 'translateX(0)', offset: 1.0}),
                  ]))]), {optional: true})
            ])
        ])

    ]
})
export class HelpPage {
    texts : string[] = [
        "Rien de plus simple ! ", 
        "Devenez le meilleur du classement en répondant juste et le plus rapidement possible à 5 questions minimum.",
        "Vous devez composer vos questions parmi les trois rubriques proposées (fonctionnel, pilotage et technique).",
        "Et si vous êtes joueur... vous pouvez sélectionner 1 à 3 questions bonus !",
        "Si vous répondez bien, vous marquerez plus de points mais si vous échouez, vous en perdrez !",
        "Vous n'êtes pas satisfait de votre classement ? Retentez votre chance !",
        "Attention seul le dernier score est retenu...",
        "Les trois meilleurs seront récompensés !",
        "A vous de jouer !"
    ];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }
}
