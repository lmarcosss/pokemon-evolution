import 'cypress/react'

describe('Home Page', () => {
  it('select all pokemons and choose de last one.', () => {
    cy.visit('')

    cy.get('[alt="Pokemon Charmander"]').click().wait(1000)
    cy.get('[alt="Pokemon Bulbasaur"]').click().wait(1000)
    cy.get('[alt="Pokemon Squirtle"]').click().wait(1000)

    cy.get('.home_play__KV3lB').click()

    cy.get(':nth-child(2) > .mission_missionButton__zp9uf').click().wait(10000)

    cy.get('.selected-pokemon_information__q_F2M > :nth-child(4)').contains(
      'XP: 10/100'
    )
  })

  it('open modal and select new pokemon', () => {
    cy.visit('')

    cy.get('.home_title__WpAl1 > span').click().wait(1000)

    cy.get('.code-modal_codeInput__apg2K').type('155').wait(1000)

    cy.get('.code-modal_codeButton__e3dVR').click()

    cy.get('[alt="Pokemon Cyndaquil"]').click().wait(1000)

    cy.get('.home_play__KV3lB').click()
  })
})
