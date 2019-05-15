import productsMock from './assets/products.json';

describe('App', () => {
  beforeEach('visit', () => {
      cy.server();
      cy.route({
        url: '/staging/products?page=0&hitsPerPage=20',
        method: 'GET',
        response: productsMock,
      }).as('getProducts');
  });

  describe('Beauty Swipe', () => {
    it('should show a loading when it is getting the products', () => {
      cy.visit('/');

      cy.get('.loading').should('exist');
    });

    it('should show a draggable card when products stop loading', () => {
      cy.visit('/');

      cy.wait('@getProducts');

      cy.get('.draggable').should('exist');
    });

    it('should like a product swipping it to the right', () => {
      cy.visit('/');

      cy.wait('@getProducts');
      cy.wait(1);

      cy.get('.draggable').first()
        .trigger('mousedown', { force: true, position: 'bottom' })
        .trigger('mousemove', { force: true, position: 'bottomRight' })
        .trigger('mouseup', { force: true, position: 'bottomRight' });

      cy.wait(1);

      cy.get('.like-container span').should('have.text', '1');
    });

    it('should dislike a product swipping it to the left', () => {
      cy.visit('/');

      cy.wait('@getProducts');
      cy.wait(1);

      cy.get('.draggable').first()
        .trigger('mousedown', { force: true, position: 'bottom' })
        .trigger('mousemove', { force: true, position: 'bottomLeft' })
        .trigger('mouseup', { force: true, position: 'bottomLeft' });

      cy.wait(1);

      cy.get('.dislike-container span').should('have.text', '1');
    });
  });
});
