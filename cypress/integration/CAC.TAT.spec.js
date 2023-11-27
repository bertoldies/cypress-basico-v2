/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function() {
        cy.visit('./src/index.html')
      })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de tendimento ao Cliente TAT')
  
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'testetestetestetestetestetesteteste testeteste testetesteteste testeteste testeteste'
        cy.get('#firstName').type('Sandro')
        cy.get('#lastName').type('Bertoldi')
        cy.get('#email').type('aaa@a.com')
        cy.get('#open-text-area').type(longText,{delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
  
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Sandro')
        cy.get('#lastName').type('Bertoldi')
        cy.get('#email').type('aaa@a.')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
  
    })

    it('campo telefone vazio ao digitar string', function() {
        cy.get('#phone')
          .type('sdada')  
          .should('have.value', '')
        
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('#firstName').type('Sandro')
    cy.get('#lastName').type('Bertoldi')
    cy.get('#email').type('aaa@a.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

})

it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    cy.get('#firstName').type('Sandro').should('have.value', 'Sandro').clear().should('have.value', '')
    
    cy.get('#lastName').type('Bertoldi').should('have.value', 'Bertoldi').clear().should('have.value', '')
    cy.get('#email').type('aaa@a.com').should('have.value', 'aaa@a.com').clear().should('have.value', '')
    cy.get('#open-text-area').type('teste').should('have.value', 'teste').clear().should('have.value', '')


})

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
})


it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillmandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')


})

it('seleciona um produto', function() {
    cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')

    })

it('seleciona um produto', function() {      

    cy.get('#product').select('mentoria')
      .should('have.value', 'mentoria')

    })

it('seleciona um produto', function() {

    cy.get('#product').select(1)
      .should('have.value', 'blog')
    
})

it('marca tipo de atendimento feedback', function() {

    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('have.value', 'feedback')
  
    
})

it('marca tipo cada tipo atendimento feedback', function() {

    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
    })
  
    
})

it('marca ambos checkboxes 1', function() {

    cy.get('input[type="checkbox"]')
    .each(function($checkbox){
        cy.wrap($checkbox).check()
        cy.wrap($checkbox).should('be.checked')
    })
    cy.get('input[type="checkbox"][value="phone"]')
    .uncheck()
    .should('not.be.checked')


}) 

it('marca ambos checkboxes 2', function() {

    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('be.checked')


}) 

it('upload arquivo', function() {

    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })


})

it('selecionar drag -and-drop', function() {

    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json',{action: 'drag-dro'})
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })


})

it('selecionar que foi dado um alias', function() {

    cy.fixture('example.json').as ('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
    })


})

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
    cy.get('#privacy a').should('have.attr','target', '_blank')

})

it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
    cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

    cy.contains('Talking About Testing').should('be.visible')

})

}) 