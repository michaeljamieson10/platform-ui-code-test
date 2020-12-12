import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  /*** public accessed anywhere private only w/in the class can be accessed */
  public selectedProviders = [];
  public unselectedProviders = [
    {
      id: '1',
      name: 'John',
      address: '123 Greenway Blvd',
      phone: '8991234321'
    },
    {
      id: '2',
      name: 'Mary',
      address: '443 Windwhisper Road',
      phone: '2233211903'
    },
    {
      id: '3',
      name: 'Jason',
      address: '9992 Pumpkin Hollow',
      phone: '4343219384'
    }
  ];

  constructor() {}
 
  /** function passed to child provider-card to get id; id -> selectOrUnselectProvider */
  clickedUnselect(id){
    this.selectOrUnselectProvider(id,true)
  }
  
  /** if selectOrUnselect true ? select -> unselect; false ? unselect -> select */
  selectOrUnselectProvider(id, selectOrUnselect){
    let selected, toChangeProviders;

    //checks which list select/unselect
    (selectOrUnselect) ? toChangeProviders = this.selectedProviders : toChangeProviders = this.unselectedProviders;
           
    //filters clicked out of list and becomes selected
    toChangeProviders = toChangeProviders.filter(item => {
      if(item.id !== id){
        return item.id !== id
      }else{
        selected = item;
      }
      })
    
   //push selected onto opposite list and filtered array replaces original array
    this.addAndRemoveFromList(selectOrUnselect, selected, toChangeProviders) 
  }
  /** push selected onto opposite list and filtered array replaces original array */
  addAndRemoveFromList(selectOrUnselect, selected, toChangeProviders){
    if(selectOrUnselect){
      this.unselectedProviders.push(selected);
      this.selectedProviders = toChangeProviders;
      this.setLocalStorage("selectedProviders","unselectedProviders", this.selectedProviders, this.unselectedProviders);
    }else{
      this.selectedProviders.push(selected);
      this.unselectedProviders = toChangeProviders;
      this.setLocalStorage("unselectedProviders","selectedProviders", this.unselectedProviders,this.selectedProviders);
    }
}

/** sets local storage to filtered array and array pushed w/ selected value */
  setLocalStorage(provider1, provider2,toJsonStringify1, toJsonStringify2){
    localStorage.setItem(provider1,JSON.stringify(toJsonStringify1));
    localStorage.setItem(provider2,JSON.stringify(toJsonStringify2));
  }
  ngOnInit() {
    // gets the objects from storage, retrieve previous provider states
    let retrievedSelected = localStorage.getItem('selectedProviders');
    let retrievedUnselected = localStorage.getItem('unselectedProviders');
    if(retrievedSelected && retrievedUnselected){
      // Parse into usable data from local storage and store it on classes' arrays
      this.selectedProviders = JSON.parse(retrievedSelected)
      this.unselectedProviders = JSON.parse(retrievedUnselected)
    }
  }
}
