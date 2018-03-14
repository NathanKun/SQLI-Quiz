import { IAnswer } from './answer.interface'

export interface IQuestion {
    id : number;
    type : string;
    text : string;
    answers : IAnswer[];
}