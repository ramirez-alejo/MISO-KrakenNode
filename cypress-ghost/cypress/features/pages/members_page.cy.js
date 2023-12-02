import { siteUrl } from "../../support/e2e";

class memberPage{

    generarGUID() {
        const guid = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return guid;
      }
    codigoUnico = this.generarGUID();

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
        this.formulario.campoEmail().should("be.visible").type(nombre+this.codigoUnico+'@correo.com');
        cy.wait(1000);
        this.formulario.botonGuardar().click();
        cy.wait(2000);
    };

    navegarACrearMiembro(){
        cy.visit ('/'+'#/members/new');
    };


    validarActividad(nombre,validardesuscribir){
        this.formulario.irAMemebers().should("be.visible").click();
        cy.wait(500);         
        cy.contains('p.middarkgrey.f8.gh-members-list-email', nombre+this.codigoUnico+'@correo.com').click();
        cy.wait(500);
        cy.contains('.gh-member-feed-footer a', 'View all member activity →').click();
        cy.wait(2000);
        cy.get('span.gh-members-activity-event-text')
        .should('exist')
        .and('contain.text', 'Signed up');
        cy.get('span.gh-members-activity-event-text')
        .should('exist')
        .and('contain.text', 'Subscribed to newsletter');
        if(validardesuscribir){
            cy.get('span.gh-members-activity-event-text')
            .should('exist')
            .and('contain.text', 'Unsubscribed from newsletter');
        }

    };

    desuscribirse(){
        cy.get('label.switch').click();
    };


    llenarFormulario(nombre,correo,nota){
        cy.wait(2000)
        if(nombre !== ""){
            this.formulario.campoNombre().should("be.visible").type(nombre)
        }else{
            this.formulario.campoNombre().should("be.visible").clear();
            
        }
        if(correo !== ""){
            this.formulario.campoEmail().should("be.visible").type(correo);
        }else{
            this.formulario.campoEmail().should("be.visible").clear();
        }
        cy.get('#member-note').type(nota);
    };

    guardarCambiosFormulario(){
        this.formulario.botonGuardar().click();
        cy.wait(500);
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
        cy.get('.gh-members-list-email').should('contain.text', nombre+this.codigoUnico+'@correo.com');
    };

    validarQueNoExistaUnMiembroEnElListadoConLosDatos = (nombre,correo) => {
        this.formulario.irAMemebers().should("be.visible").click();
        cy.wait(500);
        cy.get('.gh-members-list-name').should('not.contain.text', nombre);
        cy.get('.gh-members-list-email').should('not.contain.text', nombre+this.codigoUnico+'@correo.com');
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
            const urlObj = new URL(value);
            const token = urlObj.searchParams.get('token');
            // cy.visit (value);
            cy.visit(siteUrl+"/members?token="+token);
            cy.wait(10000);
            this.formulario.botonInformacionMiembro().should("be.visible").click();
        });

    };

    validarMensajeErrorPresente(mensajeError){
        cy.contains(mensajeError).should('exist');
    };

    validarFormularioNoPermiteGuardar(){
        cy.get('[data-test-button="save"]')
        .find('span[data-test-task-button-state="failure"]')
        .should('exist');        
    }


}

export default new memberPage();