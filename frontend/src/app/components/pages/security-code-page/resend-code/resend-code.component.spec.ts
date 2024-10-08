import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendCodeComponent } from './resend-code.component';

describe('ResendCodeComponent', () => {
  let component: ResendCodeComponent;
  let fixture: ComponentFixture<ResendCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResendCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResendCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
