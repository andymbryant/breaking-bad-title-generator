// For local development purposes only
// Primarily used as a visual testing aid for multiple title examples

describe('Title tests', () => {
  const titleExamples = ['Tim', 'John von Neumann', 'Jesse Pinkman', "Conan O'Brien", 'Barack Obama',
    'Hermione Granger', ' ', 'three words now', 'princess Zelda', 'Bowser']
  before(()=> {
    cy.visit('http://localhost:3000/')
  })
  afterEach(()=> {
    cy.wait(1500)
    cy.get('[data-cy=clear-btn]').click()
  })
  titleExamples.forEach(title => {
    it(`Renders title: ${title}`, () => {
      cy.get('[data-cy=text-input]').type(title)
    })
  })
})