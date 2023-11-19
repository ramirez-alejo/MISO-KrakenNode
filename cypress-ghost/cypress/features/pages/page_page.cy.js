class pagePage {
  elementos = {
    pageMenu: () => cy.get('a[data-test-nav="pages"]'),
    botonCrearPage: () => cy.get("a[data-test-new-page-button]"),
    tituloPage: () => cy.get("textarea[data-test-editor-title-input]"),
    contenidoPage: () =>
      cy.get(
        'div.kg-prose[contenteditable="true"][role="textbox"][data-lexical-editor="true"]'
      ),
    volverAPaginas: () => cy.get('a[data-test-link="pages"]'),
    botonDespublicar: () => cy.get('[data-test-button="update-flow"]'),
    confirmacionDeDespublicacion: () => cy.get("[data-test-update-flow-title]"),
    botonConvertirADraft: () =>
      cy.get('button[data-test-button="revert-to-draft"]'),

  };

  navegarAPages = () => {
    this.elementos.pageMenu().should("be.visible").click();
    cy.wait(300);
  };

  devolverAListadoPaginas = () => {
    this.elementos.volverAPaginas().should("be.visible").click();
  };

  crearPage = (titulo) => {
    this.elementos.botonCrearPage().should("be.visible").click();
    this.elementos.tituloPage().should("be.visible").type(titulo);
    this.elementos.contenidoPage().should("exist").type("Contenido del page").blur();
  };

  esperarAQueActualiceElPageEnBaseDeDatos = () => {
    return cy
      .intercept("PUT", /\/admin\/pages\/([^/]+)/)
      .as("putAdminPages")
      .then(() => cy.wait("@putAdminPages", { timeout: 10000 }));
  };

  obtenerElIdDelPage = () => {
    return this.esperarAQueActualiceElPageEnBaseDeDatos().then(
      (interception) => {
        return interception.request.url.match(/\/admin\/pages\/([^/]+)/)[1];
      }
    );
  };

  validarQueExistaElPageEnElListadoConEstado(pageId, estado) {
    cy.get(`[data-test-post-id="${pageId}"]`)
      .should("exist")
      .find(`.gh-content-entry-status span`)
      .should("have.class", estado.toLowerCase());
  }

  editarPageDesdeListado(pageId) {
    cy.get(`a[href="#/editor/page/${pageId}/"]`).first().click();
  }

  modificarTitulo = (nuevoTitulo) => {
    this.elementos.tituloPage().should("exist").clear().type(nuevoTitulo);
    this.elementos
      .contenidoPage()
      .should("exist")
      .clear()
      .type("¡Modificamos el contenido de esta page!").blur();
    this.navegarAlListadoDespuesDeGuardado();
  };

  navegarAlListadoDespuesDeGuardado = () => {
    return this.esperarAQueActualiceElPageEnBaseDeDatos().then(() => {
      this.devolverAListadoPaginas();
    });
  };

  validarTituloEnListadoDePages(pageId, titulo) {
    cy.get(`[data-test-post-id="${pageId}"]`)
      .should("exist")
      .find('h3')
      .should("contain", titulo);
  }

  despublicarPage() {
    cy.wait(3000);
    this.elementos.botonDespublicar().should("be.visible").click();
    this.elementos.confirmacionDeDespublicacion().should("be.visible");
    this.elementos.botonConvertirADraft().should("exist").click();
    cy.wait(3000);
    this.elementos.volverAPaginas();
  }

  agregarTagAPagina(tag,tituloPagina){
    this.navegarAPages();
    cy.contains('.gh-post-list-title', tituloPagina).click();
    cy.get('button.settings-menu-toggle[title="Settings"]').click();
    cy.wait(500);
    cy.get('#tag-input input.ember-power-select-trigger-multiple-input').type(tag);
    cy.wait(500);
    cy.contains('li.ember-power-select-option', tag).click();
    cy.get('button.settings-menu-toggle[title="Settings"]').click();
    // cy.wait(500);
    cy.get('button[data-test-button="publish-save"]').should("exist").click();
    cy.wait(5000);
  }

  validarTagPagina(tag,tituloPagina){
    cy.visit('/'+'#/pages?tag='+tag);
    cy.wait(2000);
    cy.contains('.gh-post-list-title', tituloPagina).should("have.length", 1);
  }


}
export default new pagePage();
