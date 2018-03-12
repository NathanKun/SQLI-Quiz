import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map'
import { Observable } from "rxjs/Observable";

import { ApiService } from "./api.service";
import { UserService } from "./user.service";

import { IComposition } from "./interfaces/composition.interface";
import { IQuestion } from "./interfaces/question.interface";
import { IResponse } from "./interfaces/response.interface";

@Injectable()
export class QuestionService {
    
    constructor(private http : Http, private api : ApiService, private userService : UserService) {
        
    }
    
    sendComposition(composition : IComposition) {
        this.userService.currentUser;
    }
    
    getQuestions(questions : IQuestion[]) {
        
    }
    
    sendResponse(response : IResponse) {
        
    }
}