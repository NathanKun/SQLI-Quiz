import { AutoCompleteService } from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import {Observable} from 'rxjs/Rx'

import{ ApiService } from "./api.service";

import { IQuestion } from "./interfaces/question.interface";
import { IResponse } from "./interfaces/response.interface";

@Injectable()
export class UserService implements AutoCompleteService {

    labelAttribute = "";
    
    currentUser : string = null;
    currentUserId : number = null;
    questions : IQuestion[];
    responses : IResponse[];
    result : any;

    constructor(private http : Http, private api : ApiService) {

    }
    
    getResults(keyword : string) : Observable<any> {
        return this.http.get(this.api.filterUser, {params: {str : keyword}})
            .map(
                result => {
                    return result.json();
                })
            .catch(
                (error : any) => {return this.errorHandler(error)}
        );
    }
    
    getUserState(userId : number) : Observable<any> {
        return this.http.post(this.api.getUserState, {userId : userId})
            .map(
                result => {
                    return result.json();
                }
            )
            .catch(
                (error : any) => {return this.errorHandler(error)}
            );
    }
    
    userlogin(name : string) : Observable<any> {
        return this.http.post(this.api.userLogin, {name : name})
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