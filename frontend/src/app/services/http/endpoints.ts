/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

import {Endpoints} from "../../shared/data-types";
import {REQUEST_TYPES} from "../../shared/constants";

export const ENDPOINTS: Endpoints = {
  registerUser: {
    endpoint: "/auth/register",
    requestType: REQUEST_TYPES.POST
  },
  sendVerificationEmail: {
    endpoint: "/api/email/send-verification",
    requestType: REQUEST_TYPES.POST
  }
}
