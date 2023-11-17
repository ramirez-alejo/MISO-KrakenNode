class memberPage{

    formulario = {
        irAMemebers: ()=> cy.get('[data-test-nav="members"]'),
        botonCrearMiembro: ()=> cy.contains('[data-test-new-member-button="true"]', 'New member'),
        campoNombre: ()=> cy.get('#member-name'),
        campoEmail: () => cy.get('#member-email'),
        botonGuardar: () => cy.get('[data-test-button="save"]'),
        botonImpersonar: () => cy.get('[data-test-button="impersonate"]'),
        botonOpciones: () => cy.get('[data-test-button="member-actions"]'),
        botonEliminar:() => cy.get('[data-test-button="delete-member"]'),
        urlImpersonar: () =>  cy.get('#member-signin-url'),
        botonInformacionMiembro: () => cy.get('.gh-navigation-members a.gh-portal-close')
    };

    crearMiembro = (nombre,correo) => {
        cy.visit ('/'+'#/members/new');
        cy.wait(1000);
        this.formulario.campoNombre().should("be.visible").type(nombre);
        this.formulario.campoEmail().should("be.visible").type(correo);
        cy.wait(1000);
        this.formulario.botonGuardar().click();
        cy.wait(2000);
    };

    eliminarMiembro = (nombre,correo) => {
        cy.wait(2000);
        this.formulario.botonOpciones().should("be.visible").click();
        cy.wait(2000);
        this.formulario.botonEliminar().should("be.visible").click();
        cy.wait(5000);
        cy.get('[data-test-modal="delete-member"] [data-test-button="confirm"]').click();

    };



    validarQueExistaUnMiembroEnElListadoConLosDatos = (nombre,correo) => {
        this.formulario.irAMemebers().should("be.visible").click();
        cy.wait(500);
        cy.get('.gh-members-list-name').should('contain.text', nombre);
        cy.get('.gh-members-list-email').should('contain.text', correo);
    };

    validarQueNoExistaUnMiembroEnElListadoConLosDatos = (nombre,correo) => {
        this.formulario.irAMemebers().should("be.visible").click();
        cy.wait(500);
        cy.get('.gh-members-list-name').should('not.contain.text', nombre);
        cy.get('.gh-members-list-email').should('not.contain.text', correo);
    };

    impersonarMiembro = () =>{
        cy.wait(2000);
        this.formulario.botonOpciones().should("be.visible").click();
        cy.wait(2000);
        this.formulario.botonImpersonar().should("be.visible").click();
    }; 

    validarImpersonar = () => {
        cy.wait(2000);
        this.formulario.urlImpersonar().invoke('val').then((value) => {
            cy.visit (value);
            cy.wait(10000);
            this.formulario.botonInformacionMiembro().should("be.visible").click();
        });

    };


}

export default new memberPage();