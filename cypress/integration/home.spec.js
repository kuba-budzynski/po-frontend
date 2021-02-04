import setting from '../../config/settings'

describe("Testing home page", () => {

    beforeEach(() => {
        cy.visit(setting.myRoot)
    })

    afterEach(() => {
        cy.wait(1500);
    })

    it("Check whether team button works", () => {
        cy.contains('Przejdź do panelu').click()
        cy.url().should('include', "/team")
    })

    it("Check whether admin-panel button works", () => {
        cy.contains('Przejdź do panelu admina').click()
        cy.url().should('include', "/admin-panel/sessions")
    })

    it("Input works correctly", () => {
        cy.get('input[name="teamIdInput"]').clear();
        cy.get('input[name="teamIdInput"]').type("ABCD").should('have.value', "ABCD");
    })
    
    it("Check whether local storage is added", () => {
        cy.get('input[name="teamIdInput"]').clear().type("5ffdea931b0b224a68fd6a10");
        cy.contains('Przejdź do panelu').click().should(() => {
            expect(localStorage.getItem("teamId")).to.equal("5ffdea931b0b224a68fd6a10")
        })
    })
})