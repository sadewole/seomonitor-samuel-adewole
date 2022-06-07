import DefaultItem from '../DefaultItem.vue';

const textSelector = '[data-testid=textItem]';
const valueSelector = '[data-testid=valueItem]';

describe('DefaultItem', () => {
  beforeEach(() => {
    cy.mount(DefaultItem, { props: { text: 'Unattributed title', value: 22 } });
  });

  it('render component content', () => {
    cy.get(textSelector).should('contain.text', 'Unattributed title');
    cy.get(valueSelector).should('contain.text', 22);
  });
});
