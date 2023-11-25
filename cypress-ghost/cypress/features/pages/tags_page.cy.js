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
        if(descripcion !== ""){
            this.pagina.entradaTagDescription().should('be.visible').type(descripcion);
        }
        
        this.pagina.botonGuardarTag().click();
        cy.wait(2000);
    };

    irAcrearTag(){
        this.pagina.irATags().should("be.visible").click();
        cy.wait(500)
        this.pagina.botonNewTag().should("be.visible").click() 
        cy.wait(500)      
    }

    guardoCambiosEnElFormulario(){
        this.pagina.botonGuardarTag().click();
        cy.wait(2000);
    }

    llenarFormulario = (nombre,descripcion,colorhex,slug) => {
        if(nombre !== ""){
            this.pagina.entradaTagName().should('be.visible').type(nombre);
        }else{
            this.pagina.entradaTagName().should('be.visible').clear();
        }
        if(descripcion !== ""){
            this.pagina.entradaTagDescription().should('be.visible').type(descripcion);
        }
        if(colorhex !== ""){
            cy.get('[data-test-input="accentColor"]')
            .type(colorhex);            

        }
        if(slug !== ""){
            cy.get('[data-test-input="tag-slug"]').type(slug);
        }           
    }

    editarTag = (nombre,descripcion) =>{
        cy.visit('/'+'#/tags/'+nombre);
        cy.wait(2000);      
        this.pagina.entradaTagDescription().clear();
        cy.wait(500)
        if(descripcion !== ""){
            this.pagina.entradaTagDescription().should('be.visible').type(descripcion);
        }else{
            this.pagina.entradaTagDescription().should('be.visible').clear();
        }
        this.pagina.botonGuardarTag().click();
        cy.wait(2000);
    }

    irAeditarTag(nombre){
        cy.visit('/'+'#/tags/'+nombre);
        cy.wait(2000);
    };

    validarMensajeErrorPresente(mensajeError){
        cy.contains(mensajeError).should('exist');
    };
    
    eliminarTag = (nombre)=>{
        cy.visit('/'+'#/tags/'+nombre);
        cy.wait(2000); 
        cy.get('[data-test-button="delete-tag"]').click({waitForAnimations : true});
        cy.wait(2000);
        cy.get('.modal-content[data-test-modal="confirm-delete-tag"]').should('exist');
        cy.wait(500);
        cy.get('[data-test-button="confirm"]').click({waitForAnimations : true});
        cy.url().should('include', '#/tags');
        
        
    }

    validarExisteTag = (nombre,descripcion,cantidaPosts) =>{
        cy.visit('/'+'#/tags/', {setTimeout: 2000});
        cy.get('li.gh-tags-list-item:contains("'+nombre+'")').should('have.length', 1);
        cy.get('li.gh-tags-list-item:contains("'+nombre+'") h3.gh-tag-list-name').should('include.text', nombre);
        if(descripcion === ""){
            cy.get('li.gh-tags-list-item:contains("'+nombre+'") p.gh-tag-list-description')
            .should(($descripcion) => {
            const contenido = $descripcion.text().trim(); 
            expect(contenido).to.be.empty;
            });   
        }else{     
            cy.get('li.gh-tags-list-item:contains("'+nombre+'") p.gh-tag-list-description').should('include.text', descripcion);
        }
        cy.get('li.gh-tags-list-item:contains("'+nombre+'") span.nowrap.f8.midlightgrey').should('include.text', cantidaPosts +' posts');
    }

    validarNoExisteTag = (nombre) =>{
        cy.visit('/'+'#/tags/', {setTimeout: 2000});
        cy.get('li.gh-tags-list-item:contains("' + nombre + '")').should('not.exist');
    }

    validarFormularioNoPermiteGuardar(){
        cy.get('[data-test-button="save"]')
        .find('span[data-test-task-button-state="failure"]')
        .should('exist');        
    }

}

export default new tagsPage();