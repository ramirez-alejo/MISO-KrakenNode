import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
const postPage = require("../pages/post_page.cy");

When("Se hace click en el acceso directo de nuevo post", () => {
        postPage.crearPostDesdeMenu();
  });

