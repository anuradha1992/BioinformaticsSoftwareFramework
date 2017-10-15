import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchVisualizeComponent } from './match-visualize.component';

describe('MatchVisualizeComponent', () => {
  let component: MatchVisualizeComponent;
  let fixture: ComponentFixture<MatchVisualizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchVisualizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchVisualizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
