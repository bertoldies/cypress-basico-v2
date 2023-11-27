Cypress.Commands.add('fillmandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Sandro')
    cy.get('#lastName').type('Bertoldi')
    cy.get('#email').type('aaa@a.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

})