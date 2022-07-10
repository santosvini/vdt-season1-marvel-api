describe('DELETE /characters/id', function() {

  before(function () {
    cy.back2ThePast();
    cy.setToken();
  });

  const drEstranho = {
      name: "Steven Strange",
      alias: "Dr. Estranho",
      team: [
        'Vingadores'
      ],
      active: true
  }
  
  context('Quando tem um personagem cadastrado', function() {

    before(function() {
      cy.postCharacters(drEstranho).then(function (response) {
        Cypress.env('characterId', response.body.character_id)
      })
    })

    it('Deve remover o personagem pelo ID', function() {
      const id = Cypress.env('characterId')
      cy.deleteCharacterById(id).then(function(response) {
        expect(response.status).to.equal(204);
      })

    })

    after(function() {
      const id = Cypress.env('characterId')
      cy.getCharacterById(id).then(function(response) {
        expect(response.status).to.equal(404);
      })
    })

  })

  it('Deve retornar 404 ao remover por id nao cadastrado', function() {
    const id = '62ca02959278aeb09e0ea981'
    cy.deleteCharacterById(id).then(function(response) {
      expect(response.status).to.equal(404);
    })

  })

})