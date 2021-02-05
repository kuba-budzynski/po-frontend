import moment from 'moment'

describe("Testing team-panel page", () => {
    const apiRoot = 'http://localhost:7000';
    const myRoot = 'http://localhost:3000';

    beforeEach(() => {
        cy.visit(myRoot + '/team')
    })

    afterEach(() => {
        cy.wait(1500);
    })

    it("Check clock before session", () => {
        cy.intercept({
            method: 'GET',
            url: apiRoot + '/team-panel/dashboard'
        },{
            solutions: [],
            exercises: [],
            sesja: {
                start: '2030-11-11T11:11',
                end: '2030-11-11T15:15',
                isFrozen: false
            },
            ranking: []
        })
        cy.get('#teamRanking > h1').should('contain', "Sesja się nie rozpoczęła");
    })

    it("Check clock after session", () => {
        cy.intercept({
            method: 'GET',
            url: apiRoot + '/team-panel/dashboard'
        },{
            solutions: [],
            exercises: [],
            sesja: {
                start: '2004-01-01T11:11',
                end: '2004-01-01T15:15',
                isFrozen: false
            },
            ranking: []
        })
        cy.get('#teamRanking > h1').should('contain', "Sesja się już zakończyła!");
    })

    it("Check ranking freeze", () => {
        cy.intercept({
            method: 'GET',
            url: apiRoot + '/team-panel/dashboard'
        },{
            solutions: [],
            exercises: [],
            sesja: {
                start: moment().subtract(1, 'hour').format('YYYY-MM-DDTHH:MM'),
                end: moment().add(1, 'hour').format('YYYY-MM-DDTHH:MM'),
                isFrozen: true
            },
            ranking: []
        })
        cy.get('#lastReload').should('contain', "ranking zamrożony");
    })
})