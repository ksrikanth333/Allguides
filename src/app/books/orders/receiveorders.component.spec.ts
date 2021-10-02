import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveordersComponent } from './receiveorders.component';

describe('ReceiveordersComponent', () => {
  let component: ReceiveordersComponent;
  let fixture: ComponentFixture<ReceiveordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
