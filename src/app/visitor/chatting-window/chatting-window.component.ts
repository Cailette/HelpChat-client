import { Component, OnInit, HostListener } from '@angular/core';
import { Agent } from 'src/app/models/agent.model';
import { VisitorSocketService } from 'src/app/services/visitor-socket.service';

@Component({
  selector: 'app-chatting-window',
  templateUrl: './chatting-window.component.html'
})
export class ChattingWindowComponent implements OnInit {
  agent: Agent;

  constructor(private visitorSocketService: VisitorSocketService) { 
      this.visitorSocketService.connect(localStorage.getItem('visitor-help-chat-token'));
      this.visitorSocketService.onConnectionWithAgent().subscribe(data => {
        console.log(JSON.stringify(data))
        window.parent.postMessage("getLocation", "*");
      });

      this.visitorSocketService.onError().subscribe(error => {
        console.log(JSON.stringify(error))
      });
      
      this.visitorSocketService.onGetLocation().subscribe(() => {
        console.log("visitor...getLocation");
        window.parent.postMessage("getLocation", "*");
      });
      
      this.visitorSocketService.onNextChat().subscribe((data) => {
        console.log("onNextChat" + JSON.stringify(data));
      });
      
      // this.visitorSocketService.onSwitchRoom().subscribe(res => {
      //   console.log("agent join");
      //   window.parent.postMessage("getLocation", "*");
      // });
    }

  ngOnInit() {
    this.resetAgent();
    this.visitorSocketService.emitConnectWithAgent();
  }

  resetAgent(){
    this.agent = {
      _id:        "",
      firstname:  "",
      lastname:   "",
      password:   "",
      email:	    ""
    }
  }
  
  ngOnDestroy() {
    this.visitorSocketService.disconnect();
  }
  
  @HostListener('window:message', ['$event'])
    onMessage(event) {
      if (event.data.res == "locationChange") {
        let location = event.data.data.toString();
        this.visitorSocketService.emitLocationChange(location);
      }
  }
}
