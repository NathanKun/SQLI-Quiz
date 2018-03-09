import { AutoCompleteService } from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map'

@Injectable()
export class UserService implements AutoCompleteService {

    labelAttribute = "";
    currentUser : string = null;


    constructor(private http:Http) {

    }
    
    getResults(keyword:string) {
        return this.http.get("./assets/json/users.json")
            .map(
            result => {
                return result.json()
                .filter( item => item.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 )
            }
        );
    }
}