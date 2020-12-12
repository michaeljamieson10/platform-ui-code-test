import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-provider-card',
  templateUrl: './provider-card.component.html',
  styleUrls: ['./provider-card.component.css']
})
export class ProviderCardComponent implements OnInit {
  
  /** prov is the provider object name phone address */
  @Input() prov: object;

  /** Is it select/unselect t/f */
  @Input() selectListProv: boolean;

  /**Event emitter listed to named event then returns that event with a value(t/f) called by onClickIdEmit */
  @Output() clickedUnselect = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  
  /** triggered by clicking X button; passes id back up to parent component by emit */
  onClickIdEmit(id){
    this.clickedUnselect.emit(id)
  }
  /** make reg ex (000)000-0000 https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript */
  makeRegExPhoneNumber(phoneNumber){
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  }
}
