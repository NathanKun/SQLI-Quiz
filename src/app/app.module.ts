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
import { HelpPage } from '../pages/help/help';
import { QuestionsPage } from '../pages/questions/questions'
import { UserService } from './user.service';
import { ApiService } from './api.service';
import { QuestionService } from './question.service';

@NgModule({
    declarations: [
        MyApp,
        LoginPage,
        ComposeQuestionPage,
        HelpPage,
        QuestionsPage
    ],
    imports: [
        BrowserModule, 
        HttpModule,
        AutoCompleteModule ,
        BrowserAnimationsModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        LoginPage,
        ComposeQuestionPage,
        HelpPage,
        QuestionsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        UserService, 
        ApiService,
        QuestionService
    ]
})
export class AppModule {}
