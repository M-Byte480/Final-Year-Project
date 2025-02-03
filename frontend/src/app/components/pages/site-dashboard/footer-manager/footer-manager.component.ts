import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {FontAwesomeModule, IconDefinition} from "@fortawesome/angular-fontawesome";
import {
  faBlogger,
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin, faMedium, faPinterest, faQuora, faReddit, faSlack, faSnapchat, faTelegram, faTiktok, faTumblr,
  faTwitter, faWhatsapp, faWordpress,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";
import {MapperComponent} from "../../../shared/mapper/mapper.component";

@Component({
  selector: 'app-footer-manager',
  standalone: true,
  imports: [
    MatIcon,
    FontAwesomeModule,
    MapperComponent
  ],
  templateUrl: './footer-manager.component.html',
  styleUrl: './footer-manager.component.css'
})
export class FooterManagerComponent implements OnInit {
  hyperlinks = [
    {socialMedia: 'facebook', hyperlink: 'https://www.facebook.com'},
  ];

  socialMediasLookup: { [key: string]: IconDefinition } = {
    facebook: faFacebook,
    twitter: faTwitter,
    instagram: faInstagram,
    linkedin: faLinkedin,
    discord: faDiscord,
    youtube: faYoutube,
    github: faGithub,
    reddit: faReddit,
    pinterest: faPinterest,
    snapchat: faSnapchat,
    tiktok: faTiktok,
    whatsapp: faWhatsapp,
    telegram: faTelegram,
    slack: faSlack,
    medium: faMedium,
    tumblr: faTumblr,
    wordpress: faWordpress,
    blogger: faBlogger,
    quora: faQuora,
  }

  socialMediaKeys = [];

  constructor() {}

  ngOnInit(){
    this.socialMediaKeys = [];
    // Not a great solution, unfortunately the way the mapper component is designed. This is a soft issue for now
    const stringNames = Object.keys(this.socialMediasLookup).sort();
    // @ts-ignore
    stringNames.forEach( e => this.socialMediaKeys.push({ socialMedia: e }));
    console.log(this.socialMediaKeys);
  }
}
