class postPage {
  elementos = {
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
    this.elementos.accesoDirectoNuevoPost().should("be.visible").click();
    this.elementos.tituloPost().should("exist").type(titulo);
    this.escribirContenidoPost("Contenido del post");
  };

  crearPostDesdeMenuSinContenido = (titulo) => {
    this.elementos.accesoDirectoNuevoPost().should("be.visible").click();
    this.elementos.tituloPost().should("exist").type("Con la etiqueta: "+titulo);
  } 

  crearContenidoAleatorio = (elemento, contenido) => {
    this.escribirContenidoPost(elemento + " ");
    cy.wait(500);
    this.escribirContenidoPost(contenido);
    
  }

  crearObjetoContenidoAleatorio= (elemento, contenido) => {
    this.crearObjetoComplejoPost(elemento);
    cy.focused().then(($focusedElement) => {
      cy.log($focusedElement);
      cy.wrap($focusedElement).type(contenido); 
    });
  }
    
  

  crearObjetoComplejoPost(elemento) {
    this.elementos.contenidoPost().should("exist").type(elemento).type('{enter}');
    
  }
  modificarTitulo = (nuevoTitulo) => {
    this.elementos.tituloPost().should("exist").clear().type(nuevoTitulo);
    this.elementos
      .contenidoPost()
      .should("exist")
      .clear()
      .type("¡Modificamos el contenido del post!");
    this.navegarAlListadoDespuesDeGuardado();
  };

  navegarAlListadoDePosts = () => {
    this.elementos.irAlListadoDePosts().should("be.visible").click();
  };

  esperarAQueActualiceElPostEnBaseDeDatos = () => {
    return cy
      .intercept("PUT", /\/admin\/posts\/([^/]+)/)
      .as("putAdminPost")
      .then(() => cy.wait("@putAdminPost", {setTimeout:90000}));
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

  escribirContenidoPost(contenido) {
    this.elementos.contenidoPost().should("exist").type(contenido).blur();
  }

  publicarDeInmediato() {
    this.elementos.botonPublicar().should("be.visible").click();
    this.elementos.botonContinuarPublicacion().should("be.visible").click();
    this.elementos.botonConfirmarPublicacion().should("be.visible").click();
    this.elementos.botonCerrarPublicacion().should("exist").click();
  }

  despublicarPost(postId, tipo) {
    // this.editarPostDesdeListado(postId, tipo);
    this.elementos.botonDespublicar().should("be.visible").click();
    this.elementos.confirmacionDeDespublicacion().should("be.visible");
    cy.wait(3000);
    this.elementos.botonConvertirADraft().should("exist").click();
    cy.wait(3000);
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

  editarPostDesdeListado(postId, tipo) {
    cy.get(`a[href="#/editor/${tipo}/${postId}/"]`).first().click();
  }

  abrirConfiguracionPost() {
    cy.get("button[data-test-psm-trigger]").should("exist").click();
  }

  eliminarPost() {
    this.elementos.botonEliminar().click({waitForAnimations : true});
    this.elementos.botonConfirmacionEliminar().should("be.visible").click({waitForAnimations : true});
    cy.wait(1000);
  }

  agregarTag(tag,tituloPost){
    cy.get('a[data-test-nav="posts"]').click();
    cy.contains('.gh-content-entry-title', tituloPost).click();
    cy.wait(500);
    cy.get('.settings-menu-toggle').click();
    cy.wait(500)
    cy.get('#tag-input .ember-power-select-trigger-multiple-input').type(tag);
    cy.wait(500)
    cy.contains('li.ember-power-select-option', tag).click();
    cy.get('.settings-menu-toggle').click();
    cy.get('button[data-test-button="publish-save"]').click();
    cy.contains('.gh-notification-title', 'Updated', { timeout: 10000 }).should('exist')
  }

  validarTagPagina(tag,tituloPost){
    cy.visit('/'+'#/posts?tag='+tag);
    cy.wait(2000);
    cy.get('.gh-list-row .gh-content-entry-title').contains(tituloPost).should('have.length', 1);
  }

  eliminarTodosLosPosts()
  {
    cy.visit('/'+'#/settings/labs/', {setTimeout: 2000});
    cy.get('button[data-test-button="delete-all"]').should('be.visible').click();
    cy.get('[data-test-modal="confirm-delete-all"]').should('be.visible').find('button[data-test-button="confirm"]').should("exist").click();

  }
 
  
  validarQueExistaElElementoConEtiqueta(etiqueta, textoABuscar){
    this.buscarElementoConEtiqueta(etiqueta, textoABuscar);
  }

  validarQueExistaElElementoComplejoConEtiqueta(etiqueta, textoABuscar){
    cy.get('div[data-kg="editor"]').find(`div[data-kg-card="${etiqueta}"]`).first().should('exist')
  }

  buscarElementoConEtiqueta(etiqueta, textoABuscar) {
    cy.get('div[data-kg="editor"]').find(`${etiqueta}`).first().should('exist')
      .find('span').first().should('exist')
      .invoke('text').then((text) => {
        expect(text).to.contain(textoABuscar);
      });
  }
}


export default new postPage();
