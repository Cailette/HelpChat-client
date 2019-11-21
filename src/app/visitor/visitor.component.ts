import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { VisitorService } from '../services/visitor.service';
import { AgentService } from '../services/agent.service'
import { Visitor } from '../models/visitor.model';
import { ChatService } from '../services/chat.service';

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
    private visitorService: VisitorService,
    private chatService: ChatService
  ) { }

  ngOnInit(){
    this.isClose = true;
    this.isAgent = true;
    this.isRating = false;
    this.agent = '';
    this.licenceID = '';
    this.resetVisitor();
    
    if(localStorage.getItem("openchat") 
      && (localStorage.getItem("disconnect") !== "1")){ 
      this.nextChat(true);
    } else { 
      this.openPage();
    }
  }

  openPage(){
    if(!localStorage.getItem("openpages")){
      localStorage.setItem("openpages", "1");
      this.newVisitor(); 
    } else {
      localStorage.setItem("openpages", 
        (parseInt(localStorage.getItem("openpages")) + 1) + ""); 
    }
  }

  newVisitor() {
    if (localStorage.getItem('visitor-help-chat-token') !== null) {
      this.visitorService.updateVisitor(localStorage.getItem('visitor-help-chat-token'), true)
        .subscribe(
          (data: any) => { },
          (err: HttpErrorResponse) => { console.log(JSON.stringify(err)); }); 
    } else {
      window.parent.postMessage("getVisitorInfo", "*");
    }
  }

  openChat() {
    if(localStorage.getItem("disconnect")){ 
      localStorage.removeItem("disconnect");
    }
    this.agentService.getRandomWorkingAgent(localStorage.getItem('visitor-help-chat-token'))
      .subscribe(
        (data: any) => {
          this.agentIsFound(data);
          localStorage.setItem("openchat", "1") // set true, it's open
          window.parent.postMessage("show", "*");
          this.router.navigate(['/chat/content', this.agent._id]);
        },
        (err: HttpErrorResponse) => {
          this.agentNotFound();
            localStorage.setItem("openmail", "1") // set true, it's open
            window.parent.postMessage("show", "*");
            this.router.navigate(['/chat/mail']);
        }
      );
  }

  agentIsFound(data){
    this.isClose = false;
    this.isAgent = true;
    this.agent = data.user;
  }

  agentNotFound(){
    this.isClose = false;
    this.isAgent = false;
  }

  nextChat(newPage: boolean) {
    if(newPage){
      this.openPage(); // open chat means open page
    }

    this.chatService.getAgent(localStorage.getItem('visitor-help-chat-token'))
      .subscribe(
        (data: any) => { this.agent = data.user; },
        (err: HttpErrorResponse) => { console.log(JSON.stringify(err)); }
      ); 

    this.isClose = false;
    this.isAgent = true;
    window.parent.postMessage("show", "*");
    this.router.navigate(['/chat/content', 'nextChat']); // chat is open so I open conwersation
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
    localStorage.removeItem("openmail"); // false as I close chat
    window.parent.postMessage("hide", "*");
    this.router.navigate(['/chat']);
  }

  @HostListener('window:pagehide', ['$event'])
    onClose($event) {
      if(parseInt(localStorage.getItem("openpages")) > 1){
        localStorage.setItem("openpages", 
          (parseInt(localStorage.getItem("openpages")) - 1) + "");
      } else {
        if(localStorage.getItem("openmail") === "1")
          localStorage.removeItem("openmail");
        localStorage.removeItem("openpages");
        localStorage.removeItem("openchat"); // close all tabs -> disconnect
        this.visitorService.updateVisitor(localStorage.getItem('visitor-help-chat-token'), false)
      }
  }

  @HostListener('window:message', ['$event'])
    onMessage(event) {
      if (event.data.res == "checkChat") {
        if(localStorage.getItem("openmail") === "1") 
        return;

        if(localStorage.getItem("openchat") !=="1" 
          && (localStorage.getItem("disconnect") === "1")){ 
          window.parent.postMessage("hide", "*");
          this.router.navigate(['/chat']);
        }

        if(localStorage.getItem("openchat") ==="1" 
          && (localStorage.getItem("disconnect") !== "1")) 
          this.nextChat(false)
          
        if(!(localStorage.getItem("openchat") !=="1" 
          && (localStorage.getItem("disconnect") === "1")) 
          || !(localStorage.getItem("openchat") ==="1"
          && (localStorage.getItem("disconnect") !== "1"))) 
          window.parent.postMessage("getLocation", "*");
      }

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
        
        this.visitorService.newVisitor(this.visitor)
          .subscribe(
            (data: any) => { localStorage.setItem('visitor-help-chat-token', data.token); },
            (err: HttpErrorResponse) => { console.log(JSON.stringify(err)); }
          );
      }
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
