import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootLoaderComponent } from './root-loader.component';

describe('RootLoaderComponent', () => {
  let component: RootLoaderComponent;
  let fixture: ComponentFixture<RootLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RootLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
