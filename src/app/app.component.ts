import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { LoginPage } from '../pages/login/login';
@Component({
    templateUrl: 'app.html',
    animations: [
        trigger('popOverState', [
            state('show', style({
                opacity: 1
            })),
            state('hide',   style({
                opacity: 0
            })),
            transition('show => hide', animate('600ms ease-out')),
            transition('hide => show', animate('1000ms ease-in'))
        ])
    ]
})
export class MyApp {
    rootPage = LoginPage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    
    
    show = false;
    get stateName() {
        return this.show ? 'show' : 'hide'
    }
    toggle() {
        this.show = !this.show;
    }
}

