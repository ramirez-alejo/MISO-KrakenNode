import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
const tagPage = require("../pages/tags_page.cy");
const pagePage  = require("../pages/page_page.cy");
const postPage = require("../pages/post_page.cy");

When(
    "Se crea el tag con nombre:{string} y descripcion:{string}",
    (nombre,descripcion) =>{
        tagPage.crearTag(nombre,descripcion);
        cy.screenshot();
    }
);

When(
    "Se edita el tag con nombre:{string} y nueva  descripcion:{string}",
    (nombre,descripcion)=>{
        tagPage.editarTag(nombre,descripcion);
        cy.screenshot();
    }
);

When(
    "Se elimina el tag con nombre:{string}",
    (nombre)=>{
        tagPage.eliminarTag(nombre);
        cy.screenshot();
    }
);

When(
    "Se agrega el tag con nombre:{string} a la pagina con titulo:{string}",
    (nombretag,titulo)=>{
        pagePage.agregarTagAPagina(nombretag,titulo);
        cy.screenshot();
    }
);

When(
    "Se agrega el tag con nombre:{string} al post con titulo:{string}",
    (nombre,tituloPost)=>{
        postPage.agregarTag(nombre,tituloPost);
        cy.screenshot();
    }
);


Then(
    "Validar que exista un tag con nombre:{string} , descripcion:{string} y cantidad de posts:{string}",
    (nombre,descripcion,cantidaPosts) =>{
        tagPage.validarExisteTag(nombre,descripcion,cantidaPosts);
        cy.screenshot();
    }
);


Then(
    "Validar que no exista un tag con nombre:{string}",
    (nombre)=>{
        tagPage.validarNoExisteTag(nombre);
        cy.screenshot();
    }
);

Then(
     "Validar que  solo una pagina tenga el tag:{string} la pagina con titulo:{string}",
     (nombretag,tituloPagina)=>{
        pagePage.validarTagPagina(nombretag,tituloPagina);
        cy.screenshot();
     }
);

Then(
    "Validar que  solo un post tenga el tag:{string} el post con titulo:{string}",
    (nombre,tituloPost)=>{
        postPage.validarTagPagina(nombre,tituloPost);
        cy.screenshot();
    }    
);


