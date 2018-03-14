import { LoadingController, Loading } from 'ionic-angular';
import { Injectable } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class LoaderService{
    svg = `<svg id="loader" width="75" height="75" version="1.1" id="Calque_3" xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 170.6 170.6" style="enable-background:new 0 0 170.6 170.6;" xml:space="preserve">
        <style type="text/css">
            .st0{fill:#967D4D;}
        </style>
        <g>
            <polygon points="83,83 83,75.2 7.8,0 0,7.8 75.2,83 	"/>
            <polygon class="st0" points="87.6,83 95.4,83 170.6,7.8 162.9,0 87.6,75.2 	"/>
            <polygon class="st0" points="87.6,87.6 87.6,95.4 162.9,170.6 170.6,162.9 95.4,87.6 	"/>
            <polygon points="83,87.6 75.2,87.6 0,162.9 7.8,170.6 83,95.4 	"/>
        </g>
        </svg><br />Loading...`;
    
    safeSvg;

    constructor(private sanitizer: DomSanitizer) { }
    
    getLoader(loadingCtrl: LoadingController) : Loading {

        this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(this.svg);
        
        return loadingCtrl.create({
            spinner: 'hide',
            content: this.safeSvg
        });
    }
}