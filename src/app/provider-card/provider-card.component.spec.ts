import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProviderCardComponent } from './provider-card.component';
import { ListComponent } from '../list/list.component';
import { MockComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';
/**
 * Props to article
 * https://medium.com/@abdul_74410/towards-better-testing-in-angular-part-1-mocking-child-components-b51e1fd571da
 */
describe('ProviderCardComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent,      
      MockComponent(ProviderCardComponent)],      

    }).compileComponents();
  }));  
  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    component.selectOrUnselectProvider('1',false)
    component.selectOrUnselectProvider('2',false)
    component.selectOrUnselectProvider('3',false)
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();    
  });
  it('should create one child component for each child', () => {
    expect(childComponents().length).toEqual(3);
  });
 
  it('expect that child in 0 index will be true(which is selected provider group)', () => {
    expect(childComponents()[0].selectListProv).toEqual(true);
  });
 
  it('expect that prov.name in 0 index will be true(which is selected provider group)', () => {
    expect(childComponents()[0].prov.name).toEqual('John');
  });
  it('expect that prov.address in 0 index will be true(selected provider group)', () => {
    expect(childComponents()[0].prov.address).toEqual('123 Greenway Blvd');
  });
  it('expect that prov.phone in 0 index will be true(selected provider group)', () => {
    expect(childComponents()[0].prov.phone).toEqual('8991234321');
  });
function childComponents(): ProviderCardComponent[] {
  return fixture.debugElement
    .queryAll(By.directive(ProviderCardComponent))
    .map(el => el.componentInstance);
}
});