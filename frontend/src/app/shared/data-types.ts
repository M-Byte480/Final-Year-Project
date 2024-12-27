import {REQUEST_TYPES} from "./constants";

export interface EndpointConfig {
  endpoint: string,
  requestType: REQUEST_TYPES
}

export interface Endpoints {
  registerUser: EndpointConfig;
  sendVerificationEmail: EndpointConfig;
}

export interface Site {
  name: string,
  description: string,
  url: string,
  id: string
}

export interface PanelItem {
  panelName: string,
  onClick: () => void
}
