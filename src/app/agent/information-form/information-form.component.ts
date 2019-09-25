import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Agent } from 'src/app/models/agent.model';

@Component({
  selector: 'app-information-form',
  templateUrl: './information-form.component.html'
})

export class InformationFormComponent implements OnInit {
  @Input() user: Agent;
  @Output() closeClick = new EventEmitter<boolean>();
  @Output() dataError = new EventEmitter<boolean>();
  @Output() formSubmit = new EventEmitter<NgForm>();
  @Input() isAdding: boolean;
  @Input() isEmailError: boolean;

  firstnamePattern = /^(?=.*[a-z]).{2,20}$/;
  lastnamePattern = /^(?=.*[a-z]).{2,20}$/;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/;
  
  constructor() { }

  ngOnInit() {
    this.isEmailError = false;
  }

  onDataError(){
    this.dataError.emit()
  }

  close(){
    this.closeClick.emit();
  }
  
  OnSubmit(form: NgForm) {
    this.formSubmit.emit(form)
  }
}