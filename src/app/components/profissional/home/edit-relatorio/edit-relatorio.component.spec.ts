import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRelatorioComponent } from './edit-relatorio.component';

describe('EditRelatorioComponent', () => {
  let component: EditRelatorioComponent;
  let fixture: ComponentFixture<EditRelatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRelatorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
