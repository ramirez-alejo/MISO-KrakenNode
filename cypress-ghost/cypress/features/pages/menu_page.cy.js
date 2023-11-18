class menuPage{

    pagina = {
       botonConfiguracion:()=>cy.get('[data-test-nav="settings"]'), 
       botonConfiguracionNavegacion:()=>cy.get('[data-test-nav="navigation"]')
    };

    navegarConfiguracionesNavegacion()  {
        this.pagina.botonConfiguracion().click();
        this.pagina.botonConfiguracionNavegacion().click();
    };

    agregarEnlaceNavegacionPrimaria(nombre , enlace){
        cy.get('.gh-blognav-item[data-test-navitem="new"] .gh-blognav-label input:first').clear().type(nombre);
        cy.get('.gh-blognav-item[data-test-navitem="new"] .gh-blognav-url input:first').clear().type(enlace);
        cy.get('.gh-btn-primary[data-test-save-button]').click();
        cy.wait(1000);

    };
    
    eliminarEnlaceNavegacionPrimaria(nombre){
        cy.get('button.gh-blognav-delete').first().click();
        cy.get('.gh-btn-primary[data-test-save-button]').click();
        cy.wait(1000);
    };

    validarOpcionMenu(nombre,enlace){
        cy.get('a[data-test-nav="site"]').click();
        cy.get('iframe.site-frame', { timeout: 30000 }).then(iframe => {

            cy.wrap(iframe)                   
            .its('0.contentDocument.body')
            .should('not.be.empty')          
            .as('iframeBody');
            
            cy.get('@iframeBody').find('.gh-navigation-brand .gh-burger').click();
          
            cy.get('@iframeBody')
            .find('li.nav-prueba a').should('have.attr', 'href',enlace);
            
            cy.get('@iframeBody')
            .find('li.nav-prueba a').should('have.text', nombre);
          
          })
    };

    validarOpcionMenuEliminada(nombre){
        cy.get('a[data-test-nav="site"]').click();
        cy.get('iframe.site-frame', { timeout: 30000 }).then(iframe => {

            cy.wrap(iframe)                   
            .its('0.contentDocument.body')
            .should('not.be.empty')          
            .as('iframeBody');
            
            cy.get('@iframeBody').find('.gh-navigation-brand .gh-burger').click();
            cy.get('@iframeBody')
            .find('li.nav-home')
            .should('not.exist');

          
          })
    };

}

export default new menuPage();