/// <reference types="cypress" />
/// <reference path="./cypress/support/component.ts" />

import { mount } from 'cypress/react';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}
