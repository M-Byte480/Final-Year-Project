import {REQUEST_TYPES} from "./constants";

export interface EndpointConfig {
  endpoint: string,
  requestType: REQUEST_TYPES
}

export interface JwtToken {
  access_token: string,
  refresh_token: string
}

export interface Endpoints {
  [key: string]: EndpointConfig;
}

export interface Site {
  name: string,
  url: string,
  id: string,
  lastUpdated?: string
}

export interface SiteResponse {
  siteId: string,
  userId: string,
  siteName: string,
  lastUpdated: string
}

export interface PageDTO{
  id: string, // Page ID
  pageName?: string | null,
  siteId?: string | null,
}

export interface PanelItem {
  panelName: string,
  component: any
}

export interface RootComponent {
  components: {
    [key: number]: ComponentConfig
  },
  root: number,
  maxId: number
}

export interface ComponentConfig {
  id: number,
  name: string,
  properties: any
}

export interface NavBarStateStruct {
  brandName: string,
  logo: string,
  routes: NavMapper[]
}

export interface NavMapper {
  displayName: string,
  pageName: string
}

export interface FooterStateStruct {
  links: FooterMapper[],
  properties: any
}

export interface FooterMapper {
  id: string,
  hyperlink: string,
  socialMedia: string
}
