import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelComposerComponent } from './panel-composer.component';

describe('PanelComposerComponent', () => {
  let component: PanelComposerComponent;
  let fixture: ComponentFixture<PanelComposerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelComposerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelComposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
