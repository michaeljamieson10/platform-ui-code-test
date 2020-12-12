import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;

  beforeEach(() => {
    component = new ListComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('unselected providers', () => {
    it('should have an initial length of 3', () => {
      expect(component.unselectedProviders.length).toEqual(3);
    });

    it('should have an id of 1', () => {
      expect(component.unselectedProviders[0].id).toEqual('1');
    });

    it('should have a name of John', () => {
      expect(component.unselectedProviders[0].name).toEqual('John');
    });

    it('should have an address of 123 Greenway Blvd', () => {
      expect(component.unselectedProviders[0].address).toEqual('123 Greenway Blvd');
    });

    it('should have a phone of 8991234321', () => {
      expect(component.unselectedProviders[0].phone).toEqual('8991234321');
    });
      
  });
  

  describe('selected provider should have id, name,address and phone number', () => {
    beforeEach(() => {
      component.selectOrUnselectProvider('1',false);
    });
    it('should have a id of 1', () => {
      expect(component.selectedProviders[0].id).toEqual('1');
    });
    it('should have a name of John', () => {
      expect(component.selectedProviders[0].name).toEqual('John');
    });
    it('should have a address of 123 Greenway Blvd', () => {
      expect(component.selectedProviders[0].address).toEqual('123 Greenway Blvd');
    });
    it('should have a phone of 8991234321', () => {
      expect(component.selectedProviders[0].phone).toEqual('8991234321');
    });
  });
  describe('testing selectOrUnselectProvider function returning select to unselect', () => {
    it('selectedProviders should have length of 0 after moving into select then out of select', () => {
      component.selectOrUnselectProvider('1',false);
      component.selectOrUnselectProvider('1',true);
      expect(component.selectedProviders.length).toEqual(0);
    });
  });
  describe('selectOrUnselectProvider function should store into local storage', () => {
    let retrievedSelected, selectedProvider, retrievedunSelected, unselectedProvider;
    beforeEach(() => {
      component.selectOrUnselectProvider('1',false);

      retrievedSelected = localStorage.getItem('selectedProviders');
      selectedProvider = JSON.parse(retrievedSelected);

      retrievedunSelected = localStorage.getItem('unselectedProviders');
      unselectedProvider = JSON.parse(retrievedunSelected);
    });
    it('selectedProviders localstorage to have john,', () => {
      expect(selectedProvider[0].name).toBe('John')
    });
    it('unselectedProviders localstorage should not have john,', () => {
      expect(unselectedProvider[0].name).not.toBe('John')
      expect(unselectedProvider[1].name).not.toBe('John')
      expect(unselectedProvider[2]).toBe(undefined);
    });
    it('unselectedProvider localstorage should have john return to unselect, should be on the end as it is pushed', () => {
      component.selectOrUnselectProvider('1',true);
      retrievedunSelected = localStorage.getItem('unselectedProviders');
      unselectedProvider = JSON.parse(retrievedunSelected);
      expect(unselectedProvider[2].name).toBe('John')
    });
  });

  describe('selected providers', () => {
    it('should have no initial length, should decrement unselected and increment selected', () => {
      expect(component.selectedProviders.length).toEqual(0);

      component.selectOrUnselectProvider('1',false);
      expect(component.selectedProviders.length).toEqual(1);
      expect(component.unselectedProviders.length).toEqual(2);

      component.selectOrUnselectProvider('2',false);
      expect(component.selectedProviders.length).toEqual(2);
      expect(component.unselectedProviders.length).toEqual(1);

      component.selectOrUnselectProvider('3',false);
      expect(component.selectedProviders.length).toEqual(3);
      expect(component.unselectedProviders.length).toEqual(0);

    });
   
  });
describe('ngOnInit', () => {
    it('should not crash the app, if it the values from storage were null it would crash the application', () => {
      component.ngOnInit()
    });
  });
});
