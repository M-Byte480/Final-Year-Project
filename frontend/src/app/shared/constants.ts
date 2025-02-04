import {
  faBlogger,
  faDiscord,
  faFacebook, faGithub,
  faInstagram,
  faLinkedin, faMedium, faPinterest, faQuora, faReddit, faSlack, faSnapchat, faTelegram, faTiktok, faTumblr,
  faTwitter, faWhatsapp, faWordpress, faYoutube,
  IconDefinition
} from "@fortawesome/free-brands-svg-icons";

export enum REQUEST_TYPES {
  POST = "POST",
  GET = "GET",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
  OPTION = "OPTION",
  PUT = "PUT"
}

export const SESSION_STORAGE = {
  FOOTER: "footer",
  NAVBAR: "navbar",
  PAGE: "page",
  SITE: "site"
}

export const COMPONENT_NAME = {
  PREVIEW_PAGE: "preview-page",
  NAV_MGR: "nav-mgr",
  FOOTER_MGR: "footer-mgr",
}

// @ts-ignore
export const SOCIAL_MEDIA_LOOKUP: { [key: string]: IconDefinition } = {
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
