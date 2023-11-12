class postPage {
  formulario = {
    tituloPost: () => cy.get('[placeholder="Post title"]'),
    accesoDirectoNuevoPost: () => cy.get('[data-test-nav="new-story"]'),
    tituloNuevoPost: () => cy.get("[data-test-editor-title-input]"),
    contenidoNuevoPost: () => cy.get('div.kg-prose[contenteditable="true"][role="textbox"][data-lexical-editor="true"]'),
    irAlListadoDePosts: () => cy.get('[data-test-link="posts"]'),
  };

  crearPostDesdeMenu = (titulo) => {
    this.formulario.accesoDirectoNuevoPost().should("be.visible").click();
    this.formulario.tituloNuevoPost().should("exist").type(titulo);
    this.formulario.contenidoNuevoPost().should("exist").type("Contenido del post");
  };

  navegarAlListadoDePosts =()=>{
    this.formulario.irAlListadoDePosts().should("be.visible").click();
  };

 
  obtenerElIdDelPost = () => {
    return cy
      .intercept('PUT', /\/admin\/posts\/([^/]+)/)
      .as('putAdminPost')
      .then(() => {
        // Espera a que la interceptación se complete antes de continuar
        cy.wait('@putAdminPost');
      })
      .then((interception) => {
        const postId = interception.request.url.match(/\/admin\/posts\/([^/]+)/)[1];
        // Retorna el postId
        return postId;
      });
  };
  

  obtenerElPostDentroDelListado(postId){
    cy.get(`[data-test-post-id="${postId}"]`);

  }

}

export default new postPage();
