import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewerComponent } from './tree-viewer.component';

describe('TreeViewerComponent', () => {
  let component: TreeViewerComponent;
  let fixture: ComponentFixture<TreeViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
