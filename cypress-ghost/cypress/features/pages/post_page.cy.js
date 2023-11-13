class postPage {
  postsURL = '/ghost/#/posts';
  formulario = {
    tituloPost: () => cy.get('[placeholder="Post title"]'),
    accesoDirectoNuevoPost: () => cy.get('[data-test-nav="new-story"]'),
    tituloPost: () => cy.get("[data-test-editor-title-input]"),
    contenidoPost: () =>
      cy.get(
        'div.kg-prose[contenteditable="true"][role="textbox"][data-lexical-editor="true"]'
      ),
    irAlListadoDePosts: () => cy.get('[data-test-link="posts"]'),
    botonPublicar: () => cy.get('[data-test-button="publish-flow"]'),
    botonDespublicar: () => cy.get('[data-test-button="update-flow"]'),
    botonContinuarPublicacion: () => cy.get('[data-test-button="continue"]'),
    botonConfirmarPublicacion: () =>
      cy.get('[data-test-button="confirm-publish"]'),
    botonCerrarPublicacion: () =>
      cy.get('button[data-test-button="close-publish-flow"]'),
    confirmacionDePublicacion: () =>
      cy.get('[data-test-publish-flow="complete"]'),
    confirmacionDeDespublicacion: () => cy.get("[data-test-update-flow-title]"),
    botonConvertirADraft: () =>
      cy.get('button[data-test-button="revert-to-draft"]'),

    botonEliminar: () => cy.get(".settings-menu-delete-button button"),
    botonConfirmacionEliminar: () => cy.get('button[id^="ember"]'),
  };

  crearPostDesdeMenu = (titulo) => {
    this.formulario.accesoDirectoNuevoPost().should("be.visible").click();
    this.formulario.tituloPost().should("exist").type(titulo);
    this.formulario.contenidoPost().should("exist").type("Contenido del post");
  };

  modificarTitulo = (nuevoTitulo) => {
    this.formulario.tituloPost().should("exist").clear().type(nuevoTitulo);
    this.formulario
      .contenidoPost()
      .should("exist")
      .clear()
      .type("¡Modificamos el contenido del post!");
    this.navegarAlListadoDespuesDeGuardado();
  };

  navegarAlListadoDePosts = () => {
    this.formulario.irAlListadoDePosts().should("be.visible").click();
  };

  esperarAQueActualiceElPostEnBaseDeDatos = () => {
    return cy
      .intercept("PUT", /\/admin\/posts\/([^/]+)/)
      .as("putAdminPost")
      .then(() => cy.wait("@putAdminPost"));
  };

  obtenerElIdDelPost = () => {
    return this.esperarAQueActualiceElPostEnBaseDeDatos().then(
      (interception) => {
        return interception.request.url.match(/\/admin\/posts\/([^/]+)/)[1];
      }
    );
  };

  navegarAlListadoDespuesDeGuardado = () => {
    return this.esperarAQueActualiceElPostEnBaseDeDatos().then(() => {
      this.navegarAlListadoDePosts();
    });
  };

  publicarDeInmediato() {
    this.formulario.botonPublicar().should("be.visible").click();
    this.formulario.botonContinuarPublicacion().should("be.visible").click();
    this.formulario.botonConfirmarPublicacion().should("be.visible").click();
    this.formulario.botonCerrarPublicacion().should("exist").click();
    this.navegarAlListadoDePosts();
  }

  despublicarPost(postId) {
    this.editarPostDesdeListado(postId);
    this.formulario.botonDespublicar().should("be.visible").click();
    this.formulario.confirmacionDeDespublicacion().should("be.visible");
    cy.wait(2000);
    this.formulario.botonConvertirADraft().should("exist").click();
    
    this.navegarAlListadoDePosts();
  }

  validarQueExistaElPostEnElListadoConEstado(postId, estado) {
    cy.get(`[data-test-post-id="${postId}"]`)
      .should("exist")
      .find(`.gh-content-entry-status span`)
      .should("have.class", estado.toLowerCase());
  }

  validarTituloEnListadoDePosts(postId, titulo) {
    cy.get(`[data-test-post-id="${postId}"]`)
      .should("exist")
      .find(`h3`)
      .should("contain", titulo);
  }

  validarQueElPostNoEstaEnElListado(postId){
    cy.get(`[data-test-post-id="${postId}"]`).should('not.exist');
  }

  editarPostDesdeListado(postId) {
    cy.get(`a[href="#/editor/post/${postId}/"]`).first().click();
  }

  abrirConfiguracionPost() {
    cy.get("button[data-test-psm-trigger]").should("exist").click();
  }

  eliminarPost() {
    this.formulario.botonEliminar().click();
    this.formulario.botonConfirmacionEliminar().should("be.visible").click();
  }
}

export default new postPage();
