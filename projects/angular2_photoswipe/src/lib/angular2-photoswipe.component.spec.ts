import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Angular2PhotoswipeComponent } from './angular2-photoswipe.component';

describe('Angular2PhotoswipeComponent', () => {
  let component: Angular2PhotoswipeComponent;
  let fixture: ComponentFixture<Angular2PhotoswipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Angular2PhotoswipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Angular2PhotoswipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
