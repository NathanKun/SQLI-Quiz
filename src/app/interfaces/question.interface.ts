export interface IQuestion {
    userId : number;
    questionId : number;
    count : number;
    type : string;
    text : string;
    responses : string[];
}