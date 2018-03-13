import { IAnswer } from './answer.interface'

export interface IQuestion {
    questionId : number;
    type : string;
    text : string;
    answers : IAnswer[];
}