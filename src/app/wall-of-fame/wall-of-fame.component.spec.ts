import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WallOfFameComponent } from './wall-of-fame.component';

describe('WallOfFameComponent', () => {
  let component: WallOfFameComponent;
  let fixture: ComponentFixture<WallOfFameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallOfFameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WallOfFameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
