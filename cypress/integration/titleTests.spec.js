// For local development purposes only
// Primarily used as a visual testing aid for multiple title examples

describe('Title tests', () => {
  const titleExamples = ['Tim', 'John von Neumann', 'Jesse Pinkman', 'Walt', "Conan O'Brien", 'Barack Obama',
    'Hermione Granger', ' ', 'long name with many words', 'princess Zelda', 'Bowser']
  before(()=> {
    cy.visit('http://localhost:3000/')
  })
  beforeEach(()=> {
    cy.get('[data-cy=clear-btn]').click()
  })
  afterEach(()=> {
    cy.wait(1500)
  })
  titleExamples.forEach(title => {
    it(`Renders title: ${title}`, () => {
      cy.get('[data-cy=text-input]').type(title)
    })
  })
})