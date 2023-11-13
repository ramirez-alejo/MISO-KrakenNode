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
    this.elementos.contenidoPage().should("exist").type("Contenido del page");
  };

  esperarAQueActualiceElPageEnBaseDeDatos = () => {
    return cy
      .intercept("PUT", /\/admin\/pages\/([^/]+)/)
      .as("putAdminPages")
      .then(() => cy.wait("@putAdminPages"));
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
      .type("¡Modificamos el contenido de esta page!");
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
      .find(`h3`)
      .should("contain", titulo);
  }

  despublicarPage() {
    this.elementos.botonDespublicar().should("be.visible").click();
    this.elementos.confirmacionDeDespublicacion().should("be.visible");
    cy.wait(3000);
    this.elementos.botonConvertirADraft().should("exist").click();
    
    this.elementos.volverAPaginas();
  }


}
export default new pagePage();
