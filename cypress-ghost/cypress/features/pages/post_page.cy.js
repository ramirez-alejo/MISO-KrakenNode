class postPage{

    formulario = {
        tituloPost: () => cy.get('[placeholder="Post title"]'),
        accesoDirectoNuevoPost: () => cy.get('[data-test-nav="new-story"]')

     
    }

    crearPostDesdeMenu = () => {
        this.formulario.accesoDirectoNuevoPost().should('be.visible').click();
    };

    

}

export default new postPage();