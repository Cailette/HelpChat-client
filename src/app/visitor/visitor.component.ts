import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { VisitorService } from '../services/visitor.service';
import { AgentService } from '../services/agent.service'
import { Visitor } from '../models/visitor.model';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html'
})

export class VisitorComponent implements OnInit {
  isClose: boolean;
  isAgent: boolean ;
  isRating: boolean;
  licenceID: string;
  visitor: Visitor;
  agent: any;

  constructor(
    private router: Router, 
    private agentService: AgentService,
    private visitorService: VisitorService) { 
    }

  ngOnInit(){
    this.isClose = true;
    this.isAgent = true;
    this.isRating = false;
    this.agent = '';
    this.licenceID = '';
    this.resetVisitor();
    
    if(localStorage.getItem("openchat") && (localStorage.getItem("disconnect") !== "1")){ 
      this.nextChat();
    } else { 
      this.openPage();
    }
  }

  openPage(){
    if(!localStorage.getItem("openpages")){
      localStorage.setItem("openpages", "1");
      this.newVisitor(); 
    } else {
      localStorage.setItem("openpages", (parseInt(localStorage.getItem("openpages")) + 1) + ""); 
    }
  }

  newVisitor() {
    if (localStorage.getItem('visitor-help-chat-token') !== null) {
      this.visitorService.updateVisitor(localStorage.getItem('visitor-help-chat-token'), true).subscribe((data: any) => {
        console.log(JSON.stringify(data.message));
      },
      (err: HttpErrorResponse) => {
        console.log(JSON.stringify(err));
      }); 
    } else {
      window.parent.postMessage("getVisitorInfo", "*");
    }
  }

  openChat() {
    if(localStorage.getItem("disconnect")){ 
      localStorage.removeItem("disconnect");
    }
    localStorage.setItem("openchat", "1") // set true, it's open
    this.agentService.getRandomWorkingAgent(localStorage.getItem('visitor-help-chat-token')).subscribe((data: any) => {
      this.isClose = false;
      this.isAgent = true;
      this.agent = data.user;
      window.parent.postMessage("show", "*");
      console.log("/chat/content/" + this.agent._id);
      this.router.navigate(['/chat/content', this.agent._id]);
    },
    (err: HttpErrorResponse) => {
      this.isClose = false;
      this.isAgent = false;
      window.parent.postMessage("show", "*");
      this.router.navigate(['/chat/mail']);
    });
  }

  nextChat() {
    this.openPage(); // open chat means open page
    this.isClose = false;
    this.isAgent = true;
    window.parent.postMessage("show", "*");
    this.router.navigate(['/chat/content', null]); // chat is open so I open conwersation
    // connect and donwload messagess for this chat
  }

  closeChat() {
    if (!this.isRating) {
      this.isRating = true;
      this.router.navigate(['/chat']);
    } else {
      this.isClose = true;
      this.isRating = false;
      localStorage.removeItem("openchat"); // false as I close chat
      window.parent.postMessage("hide", "*");
      this.router.navigate(['/chat']);
    }
  }

  closeMailForm() {
      this.isClose = true;
      localStorage.removeItem("openchat"); // false as I close chat
      window.parent.postMessage("hide", "*");
      this.router.navigate(['/chat']);
  }

  @HostListener('window:pagehide', ['$event'])
    async onClose($event) {
      if(parseInt(localStorage.getItem("openpages")) > 1){
        localStorage.setItem("openpages", (parseInt(localStorage.getItem("openpages")) - 1) + "");
      } else {
        localStorage.removeItem("openpages");
        localStorage.removeItem("openchat"); // close all tabs -> disconnect

        this.visitorService.updateVisitor(localStorage.getItem('visitor-help-chat-token'), false)
        
        // if (!navigator.sendBeacon) {
        //   navigator.sendBeacon = (url, data) =>{ window.fetch(url, {method: 'POST', body: data, credentials: 'include'}) }
        // }

        // let headers = {
        //   type: 'application/json',
        //   'x-access-token': localStorage.getItem('visitor-help-chat-token')
        // };
        // let blob = new Blob([], headers);
        // navigator.sendBeacon('http://localhost:3000/visitors/' + status, blob);




        
// $(window).on('pagehide', function() {
// 	$.ajax({
//         type: 'PUT',
//         url: 'http://localhost:3000/visitors/' + false,
//         headers: {
//             type: 'application/json',
//             'x-access-token': localStorage.getItem('visitor-help-chat-token')
//         },
//         async: false
//     });
// });
      }
  }

  @HostListener('window:message', ['$event'])
    onMessage(event) {
      if (event.data.res == "visitorInfo") {
        this.visitor = {
          _id: "",
          geoLocation: { 
            lat: event.data.visitor.geoLocation.lat, 
            lng: event.data.visitor.geoLocation.lng,
          },
          lastVisit: String(new Date),
          browserSoftware: event.data.visitor.browserSoftware,
          operatingSoftware: event.data.visitor.operatingSoftware,
          representative: event.data.licence
        }
        
        this.visitorService.newVisitor(this.visitor).subscribe((data: any) => {
          localStorage.setItem('visitor-help-chat-token', data.token);
        },
        (err: HttpErrorResponse) => {
          console.log(JSON.stringify(err));
        });
      }
      
      // if (event.data == "closePages") {
      //   if(parseInt(localStorage.getItem("openpages")) > 1){
      //     localStorage.setItem("openpages", (parseInt(localStorage.getItem("openpages")) - 1) + "");
      //   } else {
      //     localStorage.removeItem("openpages");
      //     localStorage.removeItem("openchat"); // close all tabs -> disconnect
          
      //     this.visitorService.updateVisitor(localStorage.getItem('visitor-help-chat-token'), false).subscribe((data: any) => {
      //       console.log(JSON.stringify(data.message));
      //     },
      //     (err: HttpErrorResponse) => {
      //       console.log(JSON.stringify(err));
      //     });
      //   }
      // }
  }
  
  resetVisitor(){
    this.visitor = {
      _id: "",
      geoLocation: { lat: "", lng: "" },
      browserSoftware: "",
      lastVisit: "",
      operatingSoftware: "",
      representative: ""
    }
  }
}
