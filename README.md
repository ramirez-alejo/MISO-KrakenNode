# MISO-Proyecto Pruebas automatizadas Grupo 16

## Funcionalidades:
<br>

<br>
### Post
<br>
1.Crear post sin publicar
<br>
2.Crear post publicado
<br>
3.Editar post
<br>
4.Despublicar post
<br>
5.Eliminar post
<br>
<br>
### Page
<br>
6.Crear pagina sin publicar
<br>
7.Crear pagina publicada
<br>
8.Editar pagina
<br>
9.Despublicar pagina
<br>
10.Eliminar pagina
<br>
<br>

### Tags
<br>
11.Crear tags
<br>
12.Editar tags
<br>
13.Asociar tags con post
<br>
14.Asociar tags con pagina
<br>
15.Eliminar tags
<br>
<br>

### Members
<br>
16.Agregar member
<br>
17.Impersonar member
<br>
18.Eliminar member
<br>
<br>

### Menu
<br>
19.Agregar pagina al menu
<br>
20. Eliminar pagina del menu
<br>


# Kraken

## Ghost:
Version 5.68.0
Ghost para nuestras pruebas de kraken se encuentra desplegado en Azure en la siguiente Url https://equipo16-568.azurewebsites.net/
No se requiere ninguna configuración adicional para ejecutar las pruebas.
<br>


## Kraken, Instalación y configuración
Ubicacion carpeta /Kraken desde el root del repositorio
Prerequisitos: 
1. Usar la versión 16.14.2 de Node.Js 
2. Tener instalado Android Studio
3. En las propiedades de Android Studio tener instalado:
	a. Android SDK Platform-Tools
	b. Android SDK Build-Tools
	c. Android SDK Tools (Obsolete) (Se deben poner visibles los paquetes obsoletos si se está usando Android Studio Giraffe o una versión más reciente)

4. Configurar las siguientes rutas en PATH: 
	a. C:\Users\***\AppData\Local\Android\Sdk\platform-tools
	b. C:\Users\***\AppData\Local\Android\Sdk\tools
	c. C:\Users\***\AppData\Local\Android\Sdk\build-tools\VERSION
	d. C:\Users\***\AppData\Local\Android\Sdk

5. Configurar la siguiente variable ambiental:
	JAVA_HOME: C:\Program Files\Android\Android Studio\jre

Instalación y set-up de Kraken: 
1. Ir a la carpeta de trabajo /Kraken
2. Sí aun no lo tiene, debe instalar Kraken en global: npm install kraken-node -g
3. Instalar Kraken en local: npm install kraken-node
4. Instalar Appium en global: npm install -g appium
5. Puede verificar que todo haya quedado instalado usando el comando kraken-node doctor

Ejecución: <br>
Para ejecutar Kraken  debe verificar que se encuentre en la carpeta /Kraken desde el root del repositorio y
use el comando: npm run start.

Este comando copia uno a uno los feature files de la carpeta /escenarios a la carpeta /features y ejecuta los tests tomando las capturas de pantalla en la carpeta reports/screenshots.


-------

# Cypress:

## Instalar Ghost usando docker:
  
1. Correr el siguiente comando con docker instalado en la máquina
```
docker run -d --name ghost5-68 -e NODE_ENV=development -e url=http://localhost:2368 -p 2368:2368 ghost:5.68.0
```
2. navegar a:
```
http://localhost:2368/ghost
```
3. En Site title: ingresar cualquier nombre del sitio.
4. En Full name: ingresar cualqueir nombre.
5. En email address: grupo16@pruebas.com
6. En password: VssK5GQ776f2u$r%

## Para correr el proyecto de pruebas
1. Usar la versión 18.18.0 de Node.Js 
2. Ingresar a la carpeta cypress-ghost
3. npm install
4. cypress open
5. En la aplicación web de cypress escoger E2E Testing
6. Escoja el navegador de su preferencia en el siguietne menú
7. Abra el menú Specs
8. Encontrará el listado de lso features implementados
9. Ingrese a cada feature y ejecute las pruebas.
