class loginPage {
  
  formulario = {
    usuario: () => cy.get(".email"),
    clave: () => cy.get(".password"),
    botonLogIn: () =>
      cy.get(".login.gh-btn.gh-btn-login.gh-btn-block.gh-btn-icon.ember-view"),
  };

  autenticar = (usuario, clave) => {
    this.formulario.usuario().clear().type(usuario);
    this.formulario.clave().clear().type(clave);
    this.formulario.botonLogIn().click();
  };

  verificarIngreso = () => {
    cy.url().should("contains", "/#/dashboard");
  };

  verficarErrorAutenticacion = (mensajeError) =>{
    const labelError = cy.get('.main-error');
    labelError.should('include.text', mensajeError)
  };
}

export default new loginPage();
