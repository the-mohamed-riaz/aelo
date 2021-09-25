import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanticDdComponent } from './semantic-dd.component';

describe('SemanticDdComponent', () => {
  let component: SemanticDdComponent;
  let fixture: ComponentFixture<SemanticDdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemanticDdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemanticDdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
