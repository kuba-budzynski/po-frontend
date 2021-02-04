import Chance from 'chance';
const chance = new Chance();

describe("Testing modal form", () => {
    const apiRoot = 'http://localhost:7000'
    const myRoot = 'http://localhost:3000'
    beforeEach(() => {
        cy.visit(myRoot+'/admin-panel/sessions');
        cy.get('#openModal').click();
    })

    afterEach(() => {
        cy.wait(1500);
    })

    it("Check whether all correct inputs work", () => {
        cy.get('input[name="nazwa"]').type("Nazwa sesji").should('have.value', "Nazwa sesji");
        cy.get('textarea[name="opis"]').type("To jest opis").should('have.value', "To jest opis");
        cy.get('input[name="rozszerzenia"]').type("cpp, py, c++").should('have.value', "cpp, py, c++");
        cy.get('input[name="start"]').type("2022-01-01T11:25").should('have.value', "2022-01-01T11:25");
        cy.get('input[name="koniec"]').type("2022-01-01T14:00").should('have.value', "2022-01-01T14:00");
        cy.intercept("POST", apiRoot + '/session', {
            statusCode: 200
        })
        cy.contains("Zapisz").click()
    })

    it("Check all required fields", () => {
        cy.get('input[name="nazwa"]').focus().blur();
        cy.get('#errorNazwa').should('contain', "Wymagane pole");
        cy.wait(500);
        cy.get('input[name="rozszerzenia"]').focus().blur();
        cy.get('#errorRozszerzenia').should('contain', "Wymagane pole");
        cy.wait(500);
        cy.get('input[name="start"]').focus().blur();
        cy.get('#errorStart').should('contain', "Wymagane pole");
        cy.wait(500);
        cy.get('input[name="koniec"]').focus().blur();
        cy.get('#errorKoniec').should('contain', "Wymagane pole");
    })

    it("Check name too long error", () => {
        const randomName = chance.word({length: 51});
        cy.get('input[name="nazwa"]').type(randomName).blur();
        cy.get('#errorNazwa').should('contain', "Maksymalnie 50 znaków");
    })

    it("Check opis too long error", () => {
        const randomOpis = chance.word({length: 251});
        cy.get('textarea[name="opis"]').type(randomOpis).blur();
        cy.get('#errorOpis').should('contain', "Zbyt długi opis, maksymalnie 250 znaków");
    })

    it("Check rozszerzenia error", () => {
        const randomRozsz = chance.word({length: 101});
        cy.get('input[name="rozszerzenia"]').type(randomRozsz).blur();
        cy.get('#errorRozszerzenia').should('contain', "Zbyt długi ciąg dozwolonych rozszerzeń");
    })

    it("Check start too early error", () => {
        cy.get('input[name="start"]').type('2004-01-01T00:00').blur();
        cy.get('#errorStart').should('contain', "Nie można zacząć sesji w przeszłości");
    })

    it("Check end before start error", () => {
        cy.get('input[name="start"]').type('2030-01-01T15:15');
        cy.get('input[name="koniec"]').type('2004-01-01T00:00').blur();
        cy.get('#errorKoniec').should('contain', "Koniec nie może być przed początkiem");
    })

    it("Check anuluj modal close works", () => {
        cy.contains("Anuluj").click();
        cy.get("#modalDiv").should('be.hidden');
    })
})