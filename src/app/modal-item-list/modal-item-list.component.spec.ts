import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalItemListComponent } from './modal-item-list.component';

describe('ModalItemListComponent', () => {
  let component: ModalItemListComponent;
  let fixture: ComponentFixture<ModalItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
