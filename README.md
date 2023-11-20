# MISO-Proyecto Pruebas automatizadas Grupo 16

## Participantes:
- Luis Orjuela - l.orjuelag@uniandes.edu.co
- Alejandro Ramírez - a.ramirez1123@uniandes.edu.co
- Camilo Barreto - fc.barreto@uniandes.edu.co
- Augusto Romero - a.romeroa23@uniandes.edu.co

## Funcionalidades:

### Post

1. Crear post sin publicar
2. Crear post publicado
3. Editar post
4. Despublicar post
5. Eliminar post

### Page

6. Crear pagina sin publicar
7. Crear pagina publicada
8. Editar pagina
9. Despublicar pagina
10. Eliminar pagina

### Tags

11. Crear tags
12. Editar tags
13. Asociar tags con post
14. Asociar tags con pagina
15. Eliminar tags

### Members

16. Agregar member
17. Impersonar member
18. Eliminar member

### Menu

19. Agregar pagina al menu
20. Eliminar pagina del menu

## Kraken

### Ghost:

Version 5.68.0
Ghost para nuestras pruebas de kraken se encuentra desplegado en Azure en la siguiente Url https://equipo16-568.azurewebsites.net/
No se requiere ninguna configuración adicional para ejecutar las pruebas.

### Kraken: Instalación y configuración

#### Prerequisitos

Ubicacion carpeta /Kraken desde el root del repositorio
Prerequisitos:

1. Usar la versión 16.14.2 de Node.Js
2. Tener instalado Android Studio
3. En las propiedades de Android Studio tener instalado:
   a. Android SDK Platform-Tools
   b. Android SDK Build-Tools
   c. Android SDK Tools (Obsolete) (Se deben poner visibles los paquetes obsoletos si se está usando Android Studio Giraffe o una versión más reciente)

4. Configurar las siguientes rutas en PATH:
   a. `C:\Users\***\AppData\Local\Android\Sdk\platform-tools`
   b. `C:\Users\***\AppData\Local\Android\Sdk\tools`
   c. `C:\Users\***\AppData\Local\Android\Sdk\build-tools\VERSION`
   d. `C:\Users\***\AppData\Local\Android\Sdk`

5. Configurar la siguiente variable ambiental:
   `JAVA_HOME: C:\Program Files\Android\Android Studio\jre`

#### Instalación y set-up de Kraken:

1. Ir a la carpeta de trabajo /Kraken
2. Sí aun no lo tiene, debe instalar Kraken en global: npm install kraken-node -g
3. Instalar Kraken en local: npm install kraken-node
4. Instalar Appium en global: npm install -g appium
5. Puede verificar que todo haya quedado instalado usando el comando kraken-node doctor

### Ejecución:

Para ejecutar Kraken debe verificar que se encuentre en la carpeta /Kraken desde el root del repositorio y
use el comando: npm start.

Este comando copia uno a uno los feature files de la carpeta /escenarios a la carpeta /features y ejecuta los tests tomando las capturas de pantalla en la carpeta reports/screenshots.

---

## Cypress:

### Ambiente de Ghost

Version 5.68.0
#### Administrador:
Ingresar a [Ghost 5.68.0 - https://equipo16-568.azurewebsites.net/ghost](https://equipo16-568.azurewebsites.net/ghost/)
#### Sitio para miembros
Ingresar a [Ghost 5.68.0 - https://equipo16-568.azurewebsites.net/](https://equipo16-568.azurewebsites.net/)

#### Instrucciones para iniciar el administrador de Ghost
Ingrese a: [Ghost 5.68.0 - https://equipo16-568.azurewebsites.net/ghost](https://equipo16-568.azurewebsites.net/ghost/)

1. En Site title: ingresar cualquier nombre del sitio.
1. En Full name: ingresar cualqueir nombre.
1. En email address: `grupo16@pruebas.com`
1. En password: `VssK5GQ776f2u$r%`

### Para correr el proyecto de pruebas

- Usar la versión 18.18.0 de Node.Js
- Ubicación de los features: ` cypress-ghost/cypress/features `
- Ubicación de los steps: ` cypress-ghost/cypress/features/step_definitions `
- Ubicación de los page objects: ` cypress-ghost/cypress/features/pages `

#### Con la consola de Cypress

1. Ingresar a la carpeta cypress-ghost `cd cypress-ghost`
1. `npm install`
1. `cypress open`
1. En la aplicación web de cypress escoger E2E Testing
1. Escoja el navegador de su preferencia en el siguietne menú
1. Abra el menú Specs
1. Encontrará el listado de lsos features implementados
1. Ingrese a cada feature y ejecute las pruebas.

#### Con la línea de comandos de Cypress

1. Ingresar a la carpeta cypress-ghost `cd cypress-ghost`
2. Corra el comando `npx cypress run --spec "**/*.feature"`

#### Resultados de las pruebas

Después de correr las pruebas los screenshots quedarán en `cypress-ghost/cypress/screenshots`
Encontrará una carpeta por cada feature y dentro de ella los archivos primero con el nombre del escenario y posteriormente el nombre del paso.

----
## Pruebas de regresión visual

Las imágenes se construyeron usando Kraken. Existen dos carpetas separadas con las dos implementaciones de las pruebas automatizadas: 
- Vesión 5.68.0: `Kraken`
- Versión 5.10: `Kraken510`

Para este ejercicio se comparó Ghost con las herramientas *ResmebleJS* y *BackstopJS*.

### Pruebas de regresión visual con ResembleJs

En la raiz del repositorio se encuentra la capeta ResembleJs, esta carpeta contiene el reporte en formato Html comparison_report. `ResembleJs/comparison_report.html`.

Para generar el reporte debe seguir lso siguientes pasos:

1. Navegar al path /ResembleJs desde la raiz del repositorio
2. ejecutar npm ci
3. ejecutar npm run start

Esto generará el reporte nuevamente.

Nota: para generar un reporte con datos actualizados debe haber previamente ejecutado kraken y kraken510

El script buscará las imágenes generadas por kraken de manera recursiva dentro de las carpetas ./Kraken y  ./kraken510
y con base en dichas imagenes generará la comparacián y el reporte.
