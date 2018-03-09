import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class JsonLoader {

   constructor(private http: Http) { }

   getUsersData(){
      let apiUrl = './assets/json/users.json';
      return this.http
          .get(apiUrl)
          .map( (response: Response) => {
             return <string[]>response.json();
      });
   }
}