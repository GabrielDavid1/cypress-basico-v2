/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  this.beforeEach(function () {
    cy.visit("./src/index.html");
  });

  it("verificar o titulo da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preencher os campos obrigatórios e eviar ao formulario", function () {
    const longText = `
        teste, teste, teste, teste,
        teste, teste, teste, teste,
        teste, teste, teste, teste,
        teste, teste, teste, teste,
        teste, teste, teste, teste,
        teste, teste, teste, teste,
        teste, teste, teste, teste,
        teste, teste, teste, teste,
        teste, teste, teste, teste,
        teste, teste, teste, teste,
        teste, teste, teste, teste,
    `;

    cy.get("#firstName").type("gabriel");
    cy.get("#lastName").type("silva");
    cy.get("#email").type("gabriel@gmail.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.get('button[type="submit"]').click();

    cy.get(".success")
      .should("be.visible")
      .contains("Mensagem enviada com sucesso.");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get("#firstName").type("gabriel");
    cy.get("#lastName").type("silva");
    cy.get("#email").type("gabriel@gmail.com");
    cy.get('button[type="submit"]').click();

    cy.get(".error")
      .should("be.visible")
      .contains("Valide os campos obrigatórios!");
  });

  it("campo telefone recebe nulo", function () {
    cy.get("#phone").type("cel").should("have.value", "");
  });

  it(`exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido 
      antes do envio do formulário`, function () {
    cy.get("#firstName").type("gabriel");
    cy.get("#lastName").type("silva");
    cy.get("#email").type("gabriel@gmail.com");
    cy.get("#open-text-area").type("testado", { delay: 0 });

    cy.get("#phone-checkbox").click();
    cy.get('button[type="submit"]').click();

    cy.get(".error")
      .should("be.visible")
      .contains("Valide os campos obrigatórios!");
  });

  it(`preenche e limpa os campos nome, sobrenome, email e telefone`, function () {
    cy.get("#firstName").type("gabriel");
    cy.get("#lastName").type("silva");
    cy.get("#email").type("gabriel@gmail.com");
    cy.get("#open-text-area").type("testado", { delay: 0 });

    cy.get('button[type="submit"]').click();

    cy.get("#firstName").clear().should("have.value", "");
    cy.get("#lastName").clear().should("have.value", "");
    cy.get("#email").clear().should("have.value", "");
    cy.get("#open-text-area").clear().should("have.value", "");
  });

  it(`exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios`, function () {
    cy.get('button[type="submit"]').click();

    cy.get(".error")
      .should("be.visible")
      .contains("Valide os campos obrigatórios!");
  });

  it(`envia o formuário com sucesso usando um comando customizado`, function () {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.success').should("be.visible");
  }); 

  it(`seleciona um produto (YouTube) por seu texto`, function () {
    cy.get('select')
      .select('YouTube')
      .should('have.value', 'youtube')
  }); 

  it(`seleciona um produto (Mentoria) por seu valor (value)`, function () {
    cy.get('select')
      .select('mentoria')
      .should('have.value', 'mentoria')
  }); 

  it(`seleciona um produto (Blog)`, function () {
    cy.get('select')
      .select(1)
      .should('have.value', 'blog')
  }); 

  it(`marca o tipo de atendimento "Elogio"`, function () {
    cy.get('#support-type input[value="elogio"]')
      .click()
      .check();
  }); 

  it(`marca cada tipo de atendimento`, function () {
    cy.get('input[type="radio"]')
      .each(($radio) => {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked');
      })
  }); 

  it(`marca ambos checkboxes, depois desmarca o último`, function () {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  }); 

  it(`seleciona um arquivo da pasta fixtures`, function () {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json');
      })
  }); 

  it(`seleciona um arquivo simulando um drag-and-drop`, function () {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json');
      })
  }); 

  it(`seleciona um arquivo utilizando uma fixture para a qual foi dada um alias`, function () {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json');
      })
  }); 

  it(`acessa a página da política de privacidade removendo o target e então clicando no link`, function () {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click();

    cy.contains('Talking About Testing').should('be.visible');
  }); 

  it(`acessa a página da política de privacidade removendo o target e então clicando no link`, function () {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click();

    cy.contains('Talking About Testing').should('be.visible');
  }); 


});
