import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackPackComponent } from './back-pack.component';

describe('BackPackComponent', () => {
  let component: BackPackComponent;
  let fixture: ComponentFixture<BackPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackPackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
