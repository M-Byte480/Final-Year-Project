import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteComposerComponent } from './site-composer.component';

describe('SiteComposerComponent', () => {
  let component: SiteComposerComponent;
  let fixture: ComponentFixture<SiteComposerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteComposerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteComposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
