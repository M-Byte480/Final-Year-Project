import {Component} from '@angular/core';
import {PanelComposerComponent} from "./panel-composer/panel-composer.component";
import {BuilderComponent} from "./builder/builder.component";

@Component({
  selector: 'app-site-composer',
  standalone: true,
  imports: [
    PanelComposerComponent,
    BuilderComponent
  ],
  templateUrl: './site-composer.component.html',
  styleUrl: './site-composer.component.css'
})
export class SiteComposerComponent {

}
