class tagsPage{

    pagina = {
        irATags:()=>cy.get('[data-test-nav="tags"]'),
        botonNewTag:() => cy.get('.gh-btn-primary'),
        entradaTagName:() => cy.get('[data-test-input="tag-name"]'),
        entradaTagDescription:() => cy.get('[data-test-input="tag-description"]'),
        botonGuardarTag:() => cy.get('section.view-actions button[data-test-button="save"]')
    };

    crearTag = (nombre,descripcion) => {
        this.pagina.irATags().should("be.visible").click();
        cy.wait(500)
        this.pagina.botonNewTag().should("be.visible").click();
        cy.wait(500)
        this.pagina.entradaTagName().should('be.visible').type(nombre);
        this.pagina.entradaTagDescription().should('be.visible').type(descripcion);
        this.pagina.botonGuardarTag().click();
        cy.wait(2000);
    };

    editarTag = (nombre,descripcion) =>{
        cy.visit('/'+'#/tags/');
        cy.wait(2000);
        cy.contains('li.gh-tags-list-item', nombre).click();
        cy.wait(2000);      
        this.pagina.entradaTagDescription().clear();
        cy.wait(500)
        this.pagina.entradaTagDescription().should('be.visible').type(descripcion);
        this.pagina.botonGuardarTag().click();
        cy.wait(2000);
    }
    
    eliminarTag = (nombre)=>{
        cy.visit('/'+'#/tags/');
        cy.wait(2000);
        cy.contains('li.gh-tags-list-item', nombre).click();
        cy.wait(2000); 
        cy.get('[data-test-button="delete-tag"]').click({waitForAnimations : true});
        cy.wait(2000);
        cy.get('.modal-content[data-test-modal="confirm-delete-tag"]').should('exist');
        cy.wait(500);
        cy.get('[data-test-button="confirm"]').click({waitForAnimations : true});
        
        
    }

    validarExisteTag = (nombre,descripcion,cantidaPosts) =>{
        cy.visit('/'+'#/tags/', {setTimeout: 2000});
        // cy.wait(2000);
        cy.get('li.gh-tags-list-item:contains("'+nombre+'")').should('have.length', 1);
        cy.get('li.gh-tags-list-item:contains("'+nombre+'") h3.gh-tag-list-name').should('include.text', nombre);
        cy.get('li.gh-tags-list-item:contains("'+nombre+'") p.gh-tag-list-description').should('include.text', descripcion);
        cy.get('li.gh-tags-list-item:contains("'+nombre+'") span.nowrap.f8.midlightgrey').should('include.text', cantidaPosts +' posts');
    }

    validarNoExisteTag = (nombre) =>{
        cy.visit('/'+'#/tags/', {setTimeout: 2000});
        // cy.get('.modal-content[data-test-modal="unsaved-settings"]').should('be.visible');
        // cy.get('[data-test-leave-button]').click();
        // cy.wait(2000);
        cy.get('li.gh-tags-list-item:contains("' + nombre + '")').should('not.exist');
    }

}

export default new tagsPage();