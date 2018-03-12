import { Injectable } from "@angular/core";

@Injectable()
export class ApiService {
    
    private local : boolean = true;
    
    private baseUrl : string;
    
    user : string;
    checkState : string;
    
    constructor() {
        this.baseUrl = this.local ? "http://localhost:80/" : "TODO";
        
        this.user = this.local ? "./assets/json/users.json" : "";
        this.checkState = this.baseUrl + (this.local ? " " : " ");
    }
}
