import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map'
import { Observable } from "rxjs/Observable";

import { ApiService } from "./api.service";

import { IComposition } from "./interfaces/composition.interface";
import { IResponse } from "./interfaces/response.interface";

@Injectable()
export class QuestionService {
    
    constructor(private http : Http, private api : ApiService) {
        
    }
    
    composeQuestions(composition : IComposition) : Observable<any> {
        return this.http.post(
            this.api.composeQuestions, 
            {
                userId : composition.userId, 
                technique : composition.technique, 
                pilotage : composition.pilotage, 
                fonctionnel : composition.fonctionnel, 
                extra : composition.extra
            })
            .map(
                result => {
                    return result.json();
                }
            )
            .catch(
                (error : any) => {return this.errorHandler(error)}
            );
    }
    
    postResponse(response : IResponse) : Observable<any> {
        return this.http.post(
            this.api.postResponse, 
            {
                userId : response.userId, 
                time : response.time, 
                answerId : response.answerId
            })
            .map(
                result => {
                    return result.json();
                }
            )
            .catch(
                (error : any) => {return this.errorHandler(error)}
            );
    }
    
    private errorHandler(error : any) : Observable<any> {
        console.log(error);
        return Observable.of({"valid" : false, "error" : "erreur de connexion"});
    }
}