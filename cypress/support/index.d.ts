declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Log in via UI
     * @example
     * cy.login(username: string, password: string)
     */
    login(): Chainable<any>
    /**
     * Log in via API
     * @example
     * cy.apiLogin()
     */
    apiLogin(): Chainable<any>

    /**
     * Wait for viewer to load
     * @example
     *  cy.waitForFirstLoad()
     */
    waitForFirstLoad(): Chainable<any>

    /**
     * Log out
     * @example
     *  cy.logout()
     */
    logout(): Chainable<any>
  }
}
