import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card1xComponent } from './card1x.component';

describe('Card1xComponent', () => {
  let component: Card1xComponent;
  let fixture: ComponentFixture<Card1xComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Card1xComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Card1xComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
