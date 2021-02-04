describe("Testing admin-panel page", () => {
    const apiRoot = 'http://localhost:7000'
    const myRoot = 'http://localhost:3000'
    beforeEach(() => {
        cy.visit(myRoot+'/admin-panel/sessions')
    })

    afterEach(() => {
        cy.wait(1500);
    })

    it("Check whether you can go back", () => {
        cy.contains('Wyjdz z panelu').click()
        cy.url().should('include', "/")
    })

    it("Check whether modal is hidden on entry", () => {
        cy.get('#modalDiv').should('be.hidden');
    })

    it("Check whether modal is shows up", () => {
        cy.get('#openModal').click();
        cy.get('#modalDiv').should('be.visible');
        cy.get('#overlayDiv');
    })

    it("Check whether session links work", () => {
        cy.get("#sessionDiv").get("div").first("").click();
        cy.url().should('include', '/admin/');
    })
})