import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComposeQuestionPage } from './compose-question';

@NgModule({
    declarations: [
        ComposeQuestionPage,
    ],
    imports: [
        IonicPageModule.forChild(ComposeQuestionPage),
    ]
})
export class ComposeQuestionModule {}
