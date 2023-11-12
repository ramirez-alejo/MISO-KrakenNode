import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
const postPage = require("../pages/post_page.cy");

When("Se crea post desde el acceso directo de nuevo post", () => {
        postPage.crearPostDesdeMenu();
  });

