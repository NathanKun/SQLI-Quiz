import { Injectable } from "@angular/core";

@Injectable()
export class ApiService {
    
    private local : boolean = true;
    
    private baseUrl : string;
    
    checkIsComposedQuestions : string;
    composeQuestions : string;
    getQuestionsOfUser : string;
    
    postResponse : string; 
    
    filterUser : string;
    getUserState : string;
    userLogin : string;
    
    constructor() {
        this.updateUrls();
    }
    
    setLocal(isLocal : boolean) {
        this.local = isLocal;
        this.updateUrls();
    }
    
    private updateUrls() {
        this.baseUrl = this.local ? "http://localhost:8000/" : "https://sqliapi.catprogrammer.com/";
        
        this.checkIsComposedQuestions = this.baseUrl + "question/checkiscomposedquestions";
        this.composeQuestions = this.baseUrl + "question/composequestions";
        this.getQuestionsOfUser = this.baseUrl + "question/getquestionsofuser";
        
        this.postResponse = this.baseUrl + "response/postResponse";
        
        this.filterUser = this.baseUrl + "user/filterusername";
        this.getUserState = this.baseUrl + "user/getuserstate";
        this.userLogin = this.baseUrl + "user/userlogin";
    }
}
