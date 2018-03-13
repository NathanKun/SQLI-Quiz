import { Injectable } from "@angular/core";

@Injectable()
export class ApiService {
    
    private local : boolean = true;
    
    private baseUrl : string;
    
    filterUser : string;
    checkState : string;
    
    constructor() {
        this.baseUrl = this.local ? "http://localhost:8000/" : "https://sqliapi.catprogrammer.com/";
        
        this.filterUser = this.baseUrl + "user/filterusername";
        this.checkState = this.baseUrl + (this.local ? " " : " ");
    }
}
