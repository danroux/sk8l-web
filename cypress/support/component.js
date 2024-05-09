import { mount } from 'cypress/vue'
import { createMemoryHistory, createRouter } from 'vue-router'

Cypress.Commands.add('mount', mount)
