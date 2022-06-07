import TopHead from '../TopHead.vue';

describe('TopHead', () => {
  beforeEach(() => {
    cy.mount(TopHead);
  });

  it('render heading text', () => {
    cy.get('h1').should('contain', 'Custom CTR Values');
  });

  it('render subheading text', () => {
    cy.get('p').should('contain', 'The sum of all positions must be 100%');
  });
});
