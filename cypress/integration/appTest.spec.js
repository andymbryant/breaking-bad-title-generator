describe('General', () => {
  const appStrings = ['Enter Text', 'Breaking Bad Title Generator', '© 2021 Andy Bryant', 'Code']
  it('Loads app and basic components', () => {
    cy.visit('http://localhost:3000/')
    cy.wrap(appStrings).then(arr => {
      arr.forEach(str => cy.contains(str))
    })
  })
})