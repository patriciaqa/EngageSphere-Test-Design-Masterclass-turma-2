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
    
    it.only('send requests with negative page', () => {
      // Intercept the GET request with a negative page parameter
      cy.intercept('GET', `${CUSTOMERS_API_URL}?page=-1&limit=10&size=All`, {
        statusCode: 400,
        body: { error: 'Invalid page or limit. Both must be positive numbers.' }
      }).as('invalidPageRequest');
  
      // Make the GET request with a negative page parameter
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
        // Wait for the intercepted request
        cy.wait('@invalidPageRequest');
  
        // Assert that the 400 status code was received and handled
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq('Invalid page or limit. Both must be positive numbers.');
      });
    });
    
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
