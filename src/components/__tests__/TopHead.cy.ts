import TopHead from '../TopHead.vue';

describe('TopHead', () => {
  it('mount tophead component', () => {
    cy.mount(TopHead);
  });

  it('renders properly', () => {
    cy.mount(TopHead);
    cy.get('h1').should('contain', 'Custom CTR Values');
  });
});
