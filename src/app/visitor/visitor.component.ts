import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { VisitorSocketService } from '../services/visitor-socket.service';
import { VisitorService } from '../services/visitor.service';
import { AgentService } from '../services/agent.service';
import { Agent } from '../models/agent.model';
import { Visitor } from '../models/visitor.model';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html'
})

export class VisitorComponent implements OnInit {
  isClose: boolean = true;
  isAgent: boolean = true;
  isRating: boolean = false;

  licenceID: string = '';

  agent: Agent = {
    _id:        "",
    firstname:  "",
    lastname:   "",
    password:   "",
    email:	    ""
  }

  visitor: Visitor = {
    geoLocation: { lat: "", lng: "" },
    browserSoftware: "",
    lastVisit: new Date,
    operatingSoftware: "",
    representative: ""
  }

  constructor(
    private router: Router, 
    private visitorSocketService: VisitorSocketService, 
    private agentService: AgentService,
    private visitorService: VisitorService) { }

  ngOnInit() {
    if(localStorage.getItem("openchat")){ // true - chat is open so I open conwersation
      localStorage.setItem("openpages", (parseInt(localStorage.getItem("openpages")) + 1) + ""); // open chat means open page
      window.parent.postMessage("show", "*");
      window.parent.postMessage("getLocation", "*");
      this.isClose = false;
      this.isAgent = true;
      this.router.navigate(['/chat/contnet']);
      // pobranie wiadomości itd...
    } else {
      if(!localStorage.getItem("openpages")){
        localStorage.setItem("openpages", "1"); // true - page is open
        
        if (localStorage.getItem('visitor-help-chat-token') !== null) {
          this.visitorService.updateVisitor(localStorage.getItem('visitor-help-chat-token')).subscribe((data: any) => {
            console.log(JSON.stringify(data.message));
            this.visitorSocketService.joinRoom(data.visitor.representative);
          },
          (err: HttpErrorResponse) => {
            //
          });
        } else {
          window.parent.postMessage("getVisitorInfo", "*");
        }
      } else {
        localStorage.setItem("openpages", (parseInt(localStorage.getItem("openpages")) + 1) + "");
        window.parent.postMessage("getLocation", "*");
      }
    }
  }

  openChat() {
    localStorage.setItem("openchat", "1") // set true so it's open
    console.log("STORAGE ON OPEN CHAT " + localStorage.getItem('visitor-help-chat-token'));
    // this.agentService.getWorkingAgent(localStorage.getItem('visitor-help-chat-token')).subscribe((data: any) => {
    //   console.log("AGETN DATA" + JSON.stringify(data));
    //   this.agent = {
    //     _id: data.user._id,
    //     firstname: data.user.firstname,
    //     lastname: data.user.lastname,
    //     email: data.user.emal,
    //     password: "",
    //   }

    //   this.isClose = false;
    //   this.isAgent = true;
    //   window.parent.postMessage("show", "*");
    //   this.router.navigate(['/chat/content']);
    // },
    // (err: HttpErrorResponse) => {
      this.isClose = false;
      this.isAgent = false;
      window.parent.postMessage("show", "*");
      this.router.navigate(['/chat/mail']);
    // });
  }

  closeChat() {
    if (!this.isRating) {
      this.isRating = true;
      this.router.navigate(['/chat/rating']);
    } else {
      localStorage.removeItem("openchat"); // false as I close chat
      this.isClose = true;
      this.isRating = false;
      window.parent.postMessage("hide", "*");
      this.router.navigate(['/chat']);
    }
  }

  closeMailForm() {
      this.isClose = true;
      window.parent.postMessage("hide", "*");
      this.router.navigate(['/chat']);
  }

  @HostListener('window:beforeunload', ['$event'])
    onClose(event) {
      if(parseInt(localStorage.getItem("openpages")) > 1){
        localStorage.setItem("openpages", (parseInt(localStorage.getItem("openpages")) - 1) + "");
      } else {
        localStorage.removeItem("openpages");
        localStorage.removeItem("openchat"); // false as I close all tabs 
        this.visitorService.updateVisitor(localStorage.getItem('visitor-help-chat-token')).subscribe((data: any) => {
              console.log(JSON.stringify(data.message));
        },
        (err: HttpErrorResponse) => {
          //
        });
      }
  }

  @HostListener('window:message', ['$event'])
    onMessage(event) {
      if (event.data.res == "visitorInfo") {
        this.visitor = {
          geoLocation: { 
            lat: event.data.visitor.geoLocation.lat, 
            lng: event.data.visitor.geoLocation.lng,
          },
          lastVisit: new Date,
          browserSoftware: event.data.visitor.browserSoftware,
          operatingSoftware: event.data.visitor.operatingSoftware,
          representative: event.data.licence
        }
        
        this.visitorService.newVisitor(this.visitor).subscribe((data: any) => {
          console.log(JSON.stringify(data.message));
          localStorage.setItem('visitor-help-chat-token', data.token);
          this.visitorSocketService.joinRoom(data.visitor.representative);
        },
        (err: HttpErrorResponse) => {
          //
        });
      }

      if (event.data.res == "locationChange") {
        console.log(JSON.stringify(event.data));
        this.visitorSocketService.emitLocationChange(JSON.stringify(event.data.data));
      }
      
      if (event.data == "closePages") {
        localStorage.removeItem("openpages");
        localStorage.removeItem("openchat");
        this.visitorService.updateVisitor(localStorage.getItem('visitor-help-chat-token')).subscribe((data: any) => {
              console.log(JSON.stringify(data.message));
        },
        (err: HttpErrorResponse) => {
          //
        });
      }
  }
}
