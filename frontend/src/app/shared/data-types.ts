import {REQUEST_TYPES} from "./constants";

export interface EndpointConfig {
  endpoint: string,
  requestType: REQUEST_TYPES
}

export interface Endpoints {
  [key: string]: EndpointConfig;
}

export interface Site {
  name: string,
  url: string,
  id: string
}

export interface PanelItem {
  panelName: string,
  component: any
}

export interface RootComponent {
  components: {
    [key: number]: ComponentConfig
  },
  root: number
}

export interface ComponentConfig {
  id: number,
  name: string,
  properties: any
}
