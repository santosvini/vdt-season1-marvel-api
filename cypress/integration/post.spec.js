describe('POST /characters', function() {
      
  it('Deve cadastrar um personagem', function() {

    const character = {
      name: 'Wanda Maximoff',
      alias: 'Feiticeira Escarlate',
      team: ['Vingadores'],
      active: true
    }

    cy.postCharacters(character)
    .then(function(response){
      expect(response.status).to.equal(201)
      cy.log(response.body.character_id)
      expect(response.body.character_id.length).to.equal(24)
    })

  })

  context('Quando o personagem já existe', function() {

    const character = {
        name: "Pietro Maximoff",
        alias: "Mercúrio",
        team: [
          "Vingadores da Costa Oeste",
          "Irmandade de Mutantes"
        ],
        active: true
    }

    before(function() {
      cy.postCharacters(character)
        .then(function(response){
          expect(response.status).to.equal(201)
      })
      
    })

    it('Não deve ter cadastro duplicado', function() {
      cy.postCharacters(character)
        .then(function(response){
          expect(response.status).to.equal(400)
          expect(response.body.error).to.equal('Duplicate character')
      })
    })
  })
})

