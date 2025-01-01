import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteNameModalComponent } from './site-name-modal.component';

describe('SiteNameModalComponent', () => {
  let component: SiteNameModalComponent;
  let fixture: ComponentFixture<SiteNameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteNameModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
