import setting from '../../config/settings'

const exerciseId = '5ffe158d66799d1dd4767ef2'
const teamId = '5ffdea931b0b224a68fd6a10'
const apiRoot = 'http://localhost:7000'
const solutionList = {
    method: 'GET',
    url: apiRoot + '/team-panel/exercise/' + exerciseId + '/solution'
}

describe("Testing team solution upload", () => {
    before(() => {
        cy.setTeam(teamId)
        cy.visit(setting.myRoot + '/team/exercise/' + exerciseId)
    })

    afterEach(() => {
        cy.wait(500)
    })

    it("Check if team is able to send solutions", () => {
        cy.intercept(solutionList).as('solutionList')
        cy.wait('@solutionList')
        cy.get('[data-test="upload_input"]').should('exist')
    })

    it("Attach empty .py file", () => {
        cy.get('[data-test="upload_input"]').should('exist')
        cy.get('[data-test="upload_dropzone"]').dropFile('pusty.py')
        cy.scrollTo('bottom')
    })

    it("Check if file input is gone", () => {
        cy.get('[data-test="upload_input"]').should('not.exist')
    })

    it("Check if can send and cancel", () => {
        cy.get('[data-test="upload_submit"]').should('exist')
        cy.get('[data-test="upload_cancel"]').should('exist')
    })

    it("Cancel the file", () => {
        cy.get('[data-test="upload_cancel"]').click()
    })

    it("Attach too big .py file", () => {
        cy.get('[data-test="upload_input"]').should('exist')
        cy.get('[data-test="upload_dropzone"]').dropFile('zbytduzy.py')
        cy.scrollTo('bottom')
    })

    it("Check if size too big error", () => {
        cy.get('[data-test="upload_error"]').contains('Plik ma zbyt duży rozmiar.')
    })

    it("Attach .py file with incorrect extension", () => {
        cy.get('[data-test="upload_input"]').should('exist')
        cy.get('[data-test="upload_dropzone"]').dropFile('rozwiazanie.txt')
        cy.scrollTo('bottom')
    })

    it("Check if incorrect extension error", () => {
        cy.get('[data-test="upload_error"]').contains('Plik ma niepoprawne rozszerzenie.')
    })

    it("Upload an incorrect solution", () => {
        cy.get('[data-test="upload_input"]').should('exist')
        cy.get('[data-test="upload_dropzone"]').dropFile('bledne.py')
        cy.scrollTo('bottom')
    })

    it("Check if can send and cancel", () => {
        cy.get('[data-test="upload_submit"]').should('exist')
        cy.get('[data-test="upload_cancel"]').should('exist')
    })

    it("Check if solution is pending", () => {
        cy.intercept(solutionList).as('solutionList')
        cy.get('[data-test="upload_submit"]').click()
        cy.wait('@solutionList')
        cy.get('[data-test="upload_input"]').should('not.exist')
        cy.get('[data-test="solution_list"] > div:first-of-type').within(() => {
            cy.contains('Oczekujące')
            cy.contains('bledne.py')
        })
    })

    it("Check if solution is execution_error", () => {
        cy.intercept(solutionList).as('solutionList')
        cy.wait('@solutionList')
        cy.get('[data-test="upload_input"]').should('exist')
        cy.get('[data-test="solution_list"] > div:first-of-type').within(() => {
            cy.contains('Błąd wykonania')
            cy.contains('bledne.py')
        })
    })

    it("Upload a correct solution", () => {
        cy.get('[data-test="upload_input"]').should('exist')
        cy.get('[data-test="upload_dropzone"]').dropFile('poprawne.py')
        cy.scrollTo('bottom')
    })

    it("Check if can send and cancel", () => {
        cy.get('[data-test="upload_submit"]').should('exist')
        cy.get('[data-test="upload_cancel"]').should('exist')
    })

    it("Check if solution is pending", () => {
        cy.intercept(solutionList).as('solutionList')
        cy.get('[data-test="upload_submit"]').click()
        cy.wait('@solutionList')
        cy.get('[data-test="upload_input"]').should('not.exist')
        cy.get('[data-test="solution_list"] > div:first-of-type').within(() => {
            cy.contains('Oczekujące')
            cy.contains('poprawne.py')
        })
    })

    it("Check if solution is correct", () => {
        cy.intercept(solutionList).as('solutionList')
        cy.wait('@solutionList')
        cy.get('[data-test="upload_input"]').should('not.exist')
        cy.get('[data-test="solution_list"] > div:first-of-type').within(() => {
            cy.contains('Poprawne')
            cy.contains('poprawne.py')
        })
    })
})
