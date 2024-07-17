const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`

describe('EngageSphere', () => {
  context('Successfully return customers', () => {
    it('retrieves one or more customers', () => {
      //TODO if the return is empty?
      //TODO sub properties
      cy.request({
        method: 'GET',
        url: CUSTOMERS_API_URL,
        qs: {
          page: 1,
          limit: 10,
          size: 'All',
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body[0]).to.have.property('name')
        expect(response.body[0]).to.have.property('employees')
        expect(response.body[0]).to.have.property('contactInfo')
        expect(response.body[0]).to.have.property('address')
        expect(response.body[0]).to.have.property('size')
      })
    })  
  })

  context('Invalid requests', () => {
    it('send requests with negative page', () => {
      cy.request({
        method: 'GET',
        url: CUSTOMERS_API_URL,
        failOnStatusCode: false,
        qs: {
          page: -1,
          limit: 10,
          size: 'All',
        },
      }).then((response) => {
        expect(response.status).to.eq(400)
      })
    })

    it('send requests with  negative limit', () => {
      cy.request({
        method: 'GET',
        url: CUSTOMERS_API_URL,
        failOnStatusCode: false,
        qs: {
          page: 1,
          limit: -10,
          size: 'All',
        },
      }).then((response) => {
        expect(response.status).to.eq(400)
      })
    })

    it('send requests with  page as a string', () => {
      cy.request({
        method: 'GET',
        url: CUSTOMERS_API_URL,
        failOnStatusCode: false,
        qs: {
          page: 'end',
          limit: 10,
          size: 'All',
        },
      }).then((response) => {
        expect(response.status).to.eq(400)
      })
    })

    it('send requests with  page as a boolean', () => {
      cy.request({
        method: 'GET',
        url: CUSTOMERS_API_URL,
        failOnStatusCode: false,
        qs: {
          page: 1,
          limit: true,
          size: 'All',
        },
      }).then((response) => {
        expect(response.status).to.eq(400)
      })
    })

    it('send requests with  unsupported size', () => {
      cy.request({
        method: 'GET',
        url: CUSTOMERS_API_URL,
        failOnStatusCode: false,
        qs: {
          page: 25,
          limit: 10,
          size: 'All',
        },
      }).then((response) => {
        expect(response.status).to.eq(400)
      })
    })
  })
})
