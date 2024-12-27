import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteManagerComponent } from './site-manager.component';

describe('SiteManagerComponent', () => {
  let component: SiteManagerComponent;
  let fixture: ComponentFixture<SiteManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
