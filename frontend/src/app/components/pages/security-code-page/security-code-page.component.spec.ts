import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityCodePageComponent } from './security-code-page.component';

describe('SecurityCodePageComponent', () => {
  let component: SecurityCodePageComponent;
  let fixture: ComponentFixture<SecurityCodePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityCodePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityCodePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
