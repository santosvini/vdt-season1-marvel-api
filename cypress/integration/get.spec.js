describe("GET /characters", function () {
  const characters = [
    {
      name: "Charles Xavier",
      alias: "Professor X",
      team: [ "X-Men" ],
      active: true,
    },
    {
      name: "Logan",
      alias: "Wolverine",
      team: [ "X-Men" ],
      active: true,
    },
    {
      name: "Peter Parker",
      alias: "Homem-Aranha",
      team: [ "novos vingadores" ],
      active: true,
    },
  ];

  before(function () {
    cy.populateCharacters(characters);
  });

  it("Deve retornar uma lista de personagens", function () {
    cy.getCharacters().then(function (response) {
      expect(response.status).to.equal(200);
      expect(response.body).to.be.a("array");
      expect(response.body.length).greaterThan(0);
    });
  });

  it('Deve buscar personagem por nome', function() {
    cy.searchCharacters('Logan').then(function (response) {
      expect(response.status).to.equal(200);
      expect(response.body.length).to.equal(1);
      expect(response.body[0].alias).to.equal('Wolverine');
      expect(response.body[0].team).to.eql(["X-Men"]);
      expect(response.body[0].active).to.equal(true);
    })
  })
})

describe('GET /characters/id', function() {

  const tonyStark = {
      name: "Tony Stark",
      alias: "Homem de Ferro",
      team: [
        'Vingadores'
      ],
      active: true
  }
  
  context('Quando tem um personagem cadastrado', function() {

    before(function() {
      cy.postCharacters(tonyStark).then(function (response) {
        Cypress.env('characterId', response.body.character_id)
      })
    })

    it('Deve buscar o personagem pelo ID', function() {
      const id = Cypress.env('characterId')
      cy.getCharacterById(id).then(function(response) {
        expect(response.status).to.equal(200);
        expect(response.body.alias).to.equal('Homem de Ferro');
        expect(response.body.team).to.eql(['Vingadores'],);
        expect(response.body.active).to.equal(true);
      })

    })

  })

  it('Deve retornar 404 ao buscar por id nao cadastrado', function() {
    const id = '62ca02959278aeb09e0ea981'
    cy.getCharacterById(id).then(function(response) {
      expect(response.status).to.equal(404);
    })
  })

})