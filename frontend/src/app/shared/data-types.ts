import {REQUEST_TYPES} from "./constants";

export interface EndpointConfig {
  endpoint: string,
  requestType: REQUEST_TYPES
}

export interface Endpoints {
  registerUser: EndpointConfig;
  sendVerificationEmail: EndpointConfig;
}
