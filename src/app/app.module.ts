import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

//import { NgAutoCompleteModule } from "ng-auto-complete";
import { AutoCompleteModule } from 'ionic2-auto-complete';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ComposeQuestionPage } from '../pages/compose-question/compose-question';
import { UserService } from './user.service';

@NgModule({
    declarations: [
        MyApp,
        LoginPage,
        ComposeQuestionPage
    ],
    imports: [
        BrowserModule, 
        HttpModule,
        //NgAutoCompleteModule,
        AutoCompleteModule ,
        BrowserAnimationsModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        LoginPage,
        ComposeQuestionPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        UserService
    ]
})
export class AppModule {}
