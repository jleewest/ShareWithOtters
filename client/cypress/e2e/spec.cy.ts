describe('ShareWithOtters', () => {
  it('should connect to website login', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Log In').click();
  });
});
