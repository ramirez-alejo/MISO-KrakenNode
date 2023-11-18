import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
const menuPage = require("../pages/menu_page.cy");

When(
    "Navega a las configuraciones de navegacion",
    ()=>{
        menuPage.navegarConfiguracionesNavegacion();
    }
);

When(
    "Agrega opcion al menu con nombre:{string} y enlace:{string} a la navegacion primaria",
    (nombre,enlace)=>{
        menuPage.agregarEnlaceNavegacionPrimaria(nombre,enlace);
    }
);

When(
    "Elimina opcion del menu con nombre:{string}",
    (nombre)=>{
        menuPage.eliminarEnlaceNavegacionPrimaria(nombre);
    }
);

Then(
    "Verificar que exista una opcion al menu con nombre:{string} y enlace:{string} a la navegacion primaria",
    (nombre,enlace)=>{
        menuPage.validarOpcionMenu(nombre,enlace);
    }
);

Then(
    "Verificar que exista una opcion al menu con nombre:{string}",
    (nombre)=>{
        menuPage.validarOpcionMenuEliminada(nombre);
    }
);
