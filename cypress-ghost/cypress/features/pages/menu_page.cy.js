import { siteUrl } from "../../support/e2e";
class menuPage{

    generarGUID() {
        const guid = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return guid;
      }
    codigoUnico = this.generarGUID();

    pagina = {
       botonConfiguracion:()=>cy.get('[data-test-nav="settings"]'), 
       botonConfiguracionNavegacion:()=>cy.get('[data-test-nav="navigation"]')
    };

    navegarConfiguracionesNavegacion()  {
        this.pagina.botonConfiguracion().click();
        this.pagina.botonConfiguracionNavegacion().click();
    };

    agregarEnlaceNavegacionPrimaria(nombre , enlace){
        cy.get('.gh-blognav-item[data-test-navitem="new"] .gh-blognav-label input:first').clear().type(nombre+this.codigoUnico);
        cy.get('.gh-blognav-item[data-test-navitem="new"] .gh-blognav-url input:first').clear().type(enlace);
        cy.get('.gh-btn-primary[data-test-save-button]').click();
        cy.wait(1000);

    };
    
    eliminarEnlaceNavegacionPrimaria(nombre){
        cy.get('form#settings-navigation .gh-blognav-delete').each(($element, index, $list) => {
            cy.wrap($element).click(); 
            cy.wait(1000); 
          });
          

        cy.get('.gh-btn-primary[data-test-save-button]').click();
        cy.wait(5000);
    };

    validarOpcionMenu(nombre,enlace){
        cy.visit(siteUrl);
        cy.wait(3000);
        cy.get(`li.nav-${nombre+this.codigoUnico}`).should('contain', nombre+this.codigoUnico)
        
    };

    validarOpcionMenuEliminada(nombre){
        cy.visit(siteUrl);
        cy.wait(3000);
        cy.get(`li.nav-${nombre+this.codigoUnico}`).should('not.exist')
     
    };

}

export default new menuPage();