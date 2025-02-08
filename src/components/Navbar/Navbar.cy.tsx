import Navbar from './Navbar';

describe('Navbar', () => {
  it('should render the Navbar component', () => {
    //@ts-ignore
    cy.mount(<Navbar user={} api={} me={} signOut={} />);
    cy.get('nav').should('exist');
  });
});
