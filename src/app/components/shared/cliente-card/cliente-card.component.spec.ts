import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteCardComponent } from './cliente-card.component';

describe('ClienteCardComponent', () => {
  let component: ClienteCardComponent;
  let fixture: ComponentFixture<ClienteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
