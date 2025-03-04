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
  },
  submitRegistrationVerificationCode: {
    endpoint: "/api/email/verify",
    requestType: REQUEST_TYPES.POST
  },
  loginUser: {
    endpoint: "/auth/login",
    requestType: REQUEST_TYPES.POST
  },
  getUserSites: {
    endpoint: "/api/manager/sites",
    requestType: REQUEST_TYPES.GET
  },
  createUserSite: {
    endpoint: "/api/manager/sites",
    requestType: REQUEST_TYPES.POST
  },
  getSitePages: {
    endpoint: "/api/composer/get-sites",
    requestType: REQUEST_TYPES.GET
  },
  makeNewPageForSite: {
    endpoint: "/api/composer/add-site",
    requestType: REQUEST_TYPES.POST
  },
  getFooter: {
    endpoint: "/api/composer/footer",
    requestType: REQUEST_TYPES.GET
  },
  setFooter: {
    endpoint: "/api/composer/footer",
    requestType: REQUEST_TYPES.POST
  },
  getNavBarMapping: {
    endpoint: "/api/composer/navbar-mapping",
    requestType: REQUEST_TYPES.GET
  },
  setNavbarMapping: {
    endpoint: "/api/composer/set-navbar",
    requestType: REQUEST_TYPES.POST
  },
  refreshToken: {
    endpoint: "/auth/refresh",
    requestType: REQUEST_TYPES.POST
  }
};
