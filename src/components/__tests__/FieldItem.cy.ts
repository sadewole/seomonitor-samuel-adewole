import FieldItem from '../FieldItem.vue';

const textSelector = '[data-testid=inputText]';
const valueSelector = '[data-testid=inputValue]';
const fieldContainer = '[data-testid=fieldContainer]';
const boxContent = '[data-testid=boxContent]';
const tooltip = '[data-testid=tooltip]';
const deleteIcon = '[data-testid=deleteIcon]';
const errorMessage = '[data-testid=errorMessage]';

type PropsType = {
  text: string;
  error: string;
  value: string;
  showIcon: boolean;
  disabled: boolean;
};

const props = (data: PropsType) => {
  const { text, value, error, showIcon, disabled } = data;
  return {
    text,
    value,
    error,
    showIcon,
    disabled,
    handleDelete: () => {},
  };
};

let sample = {
  text: 'Unattributed title',
  value: '22',
  error: '',
  showIcon: false,
  disabled: false,
};

describe('FieldItem', () => {
  it('renders the FieldItem', () => {
    cy.mount(FieldItem, { props: props(sample) })
      .get(textSelector)
      .should('have.value', 'Unattributed title')
      .get(valueSelector)
      .should('have.value', '22')
      .get(errorMessage)
      .should('not.exist');
  });

  it('show tooltip when [data-testid=inputValue] is hovered', () => {
    cy.mount(FieldItem, { props: props(sample) })
      .get(tooltip)
      .should('contain.text', '22')
      .and('be.visible')
      .get(deleteIcon)
      .should('not.exist');
  });

  it('display error warnings', () => {
    sample.error = 'Fields should not be empty';
    cy.mount(FieldItem, { props: props(sample) })
      .get(boxContent)
      .should('have.class', 'border border-red-500')
      .get(errorMessage)
      .should('contain.text', 'Fields should not be empty');
  });

  it('display delete icon', () => {
    sample.showIcon = true;
    cy.mount(FieldItem, { props: props(sample) })
      .get(deleteIcon)
      .should('not.be.empty');
  });

  it('disable input', () => {
    sample.disabled = true;
    cy.mount(FieldItem, { props: props(sample) })
      .get(boxContent)
      .should('have.class', 'pointer-events-none bg-gray-50');
  });
});
