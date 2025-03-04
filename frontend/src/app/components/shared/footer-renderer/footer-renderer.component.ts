import {Component, Input, OnInit} from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FooterMapper} from "../../../shared/data-types";
import {FooterStateService} from "../../../services/states/footer-state/footer-state.service";
import {SOCIAL_MEDIA_LOOKUP} from "../../../shared/constants";

@Component({
  selector: 'app-footer-renderer',
  standalone: true,
  imports: [
    FontAwesomeModule,
  ],
  templateUrl: './footer-renderer.component.html',
  styleUrl: './footer-renderer.component.css'
})
export class FooterRendererComponent implements OnInit{
  hyperlinks: FooterMapper[] = [];
  socialMediaKeys = [];
  @Input() parentComponent!: string;

  constructor(private footerStateService: FooterStateService) {
    this.footerStateService.state$.subscribe(state => {
      this.hyperlinks = state.links;
    });
  }

  ngOnInit() {
    if(this.parentComponent === 'preview-page') {
      this.hyperlinks = this.footerStateService.getSession().links;
    }

    this.socialMediaKeys = [];
    // Not a great solution, unfortunately the way the mapper component is designed. This is a soft issue for now
    const stringNames = Object.keys(SOCIAL_MEDIA_LOOKUP).sort();
    // @ts-ignore
    stringNames.forEach(e => this.socialMediaKeys.push({socialMedia: e}));
  }

  onOpenSocial(link: string): void {
    window.open(link, '_blank');
  }

  protected readonly SOCIAL_MEDIA_LOOKUP = SOCIAL_MEDIA_LOOKUP;
}
