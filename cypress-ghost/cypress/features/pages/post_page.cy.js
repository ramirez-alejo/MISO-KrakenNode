class postPage{

    formulario = {
        tituloPost: () => cy.get('[placeholder="Post title"]'),
        accesoDirectoNuevoPost: () => cy.get('[data-test-nav="new-story"]'),
        tituloNuevoPost:() => cy.get('[data-test-editor-title-input]'),
        contenidoNuevoPost:() => cy.get()

     
    }

    crearPostDesdeMenu = () => {
        this.formulario.accesoDirectoNuevoPost().should('be.visible').click();
        this.formulario.tituloNuevoPost().should('exist').type('Titulo de post');
    };



}

export default new postPage();