import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {FaIconComponent, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MapperComponent} from "../../../shared/mapper/mapper.component";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {FooterStateService} from "../../../../services/states/footer-state/footer-state.service";
import {FooterMapper} from "../../../../shared/data-types";
import {SOCIAL_MEDIA_LOOKUP} from "../../../../shared/constants";

@Component({
    selector: 'app-footer-manager',
    standalone: true,
    imports: [
        MatIcon,
        FontAwesomeModule,
        MapperComponent,
        CdkDrag,
        CdkDropList
    ],
    templateUrl: './footer-manager.component.html',
    styleUrl: './footer-manager.component.css'
})
export class FooterManagerComponent implements OnInit, OnDestroy {
    hyperlinks: FooterMapper[] = [
    ];
    socialMediaKeys = [];

    constructor(private footerStateService: FooterStateService) {
        this.footerStateService.state$.subscribe(state => {
            this.hyperlinks = state.links;
            this.footerStateService.saveSession();
        })
    }

    ngOnInit() {
        this.socialMediaKeys = [];
        // Not a great solution, unfortunately the way the mapper component is designed. This is a soft issue for now
        const stringNames = Object.keys(SOCIAL_MEDIA_LOOKUP).sort();
        // @ts-ignore
        stringNames.forEach(e => this.socialMediaKeys.push({socialMedia: e}));
    }

    onOpenSocial(link: string): void {
        window.open(link, '_blank');
    }

    // Taken from https://material.angular.io/cdk/drag-drop/overview
    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.hyperlinks, event.previousIndex, event.currentIndex);
    }

    ngOnDestroy() {
        this.footerStateService.saveSession();
    }

    protected readonly SOCIAL_MEDIA_LOOKUP = SOCIAL_MEDIA_LOOKUP;
}
