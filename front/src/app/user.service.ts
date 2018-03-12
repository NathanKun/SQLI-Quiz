import { AutoCompleteService } from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map'
import { Observable } from "rxjs/Observable";

import{ ApiService } from "./api.service";

import { IComposition } from "./interfaces/composition.interface";
import { IQuestion } from "./interfaces/question.interface";

@Injectable()
export class UserService implements AutoCompleteService {

    labelAttribute = "";
    
    currentUser : string = null;
    composition : IComposition;
    questions : IQuestion[];

    constructor(private http : Http, private api : ApiService) {

    }
    
    getResults(keyword : string) : Observable<any> {
        return this.http.get(this.api.user)
            .map(
                result => {
                    return result.json()
                    .filter( item => item.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 )
                }
        );
    }
    
    checkState() : Observable<any> {
        return this.http.get(this.api.checkState)
            .map(
                result => {
                    return result.json()
                }
            );
    }
}