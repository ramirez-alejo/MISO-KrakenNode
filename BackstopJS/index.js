const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');


const buscarArchivos = (directorio, extension, archivosEncontrados = []) => {
  const archivos = fs.readdirSync(directorio);

  archivos.forEach(archivo => {
    const rutaCompleta = path.join(directorio, archivo);

    if (fs.statSync(rutaCompleta).isDirectory()) {
      // Si es un directorio, realizar la búsqueda recursiva
      buscarArchivos(rutaCompleta, extension, archivosEncontrados);
    } else if (path.extname(rutaCompleta) === extension) {
      // Si es un archivo con la extensión deseada, agregar a la lista
      archivosEncontrados.push(rutaCompleta);
    }
  });

  return archivosEncontrados;
};

const sustituirEnRutas = (rutas, antiguo, nuevo) => {
  return rutas.map(ruta => ruta.replace(antiguo, nuevo));
};

const directorioBase = path.join('..', 'Kraken510', 'reports', 'screenshots');
const extensionBuscada = '.png';

const rutasDeArchivosPNGReferencia = buscarArchivos(directorioBase, extensionBuscada);
const rutasDeArchivosPNGcomparacion = sustituirEnRutas(
  rutasDeArchivosPNGReferencia,
  'Kraken510',
  'Kraken'
);

// Cargar el archivo JSON existente
const archivoExistente = './backstop-base.json';
const archivoResultado = './backstop.json';
const contenidoExistente = fs.readFileSync(archivoExistente, 'utf-8');
const jsonExistente = JSON.parse(contenidoExistente);

// Agregar nuevos escenarios al archivo existente
rutasDeArchivosPNGcomparacion.forEach((ruta, index) => {
  const referencia = rutasDeArchivosPNGReferencia[index];

  const carpetas = path.dirname(ruta).split(path.sep);

  // Obtener el nombre del archivo sin extensión
  const nombreArchivo = path.basename(ruta, path.extname(ruta));

  // Crear el nombre del escenario
  const nombreEscenario = `${carpetas[carpetas.length - 2]} - ${carpetas[carpetas.length - 1]} : paso - ${nombreArchivo}`;

  // Verificar si ambos archivos existen antes de agregar el escenario
  if (fs.existsSync(ruta) && fs.existsSync(referencia)) {
    const url = `file://${path.resolve(__dirname, ruta).replace(/\\/g, '/')}`;
    const referenceUrl = `file://${path.resolve(__dirname, referencia).replace(/\\/g, '/')}`;

    jsonExistente.scenarios.push({
      "label": `Escenario: ${nombreEscenario}`,
      "url": url,
      "referenceUrl": referenceUrl
    });
  }
});

// Guardar el archivo actualizado
const jsonFinal = JSON.stringify(jsonExistente, null, 2);
fs.writeFileSync(archivoResultado, jsonFinal);

console.log(`Escenarios agregados al archivo existente: ${archivoResultado}`);

// Ejecutar el comando "backstop reference" 
try {
  execSync('backstop reference', { stdio: 'inherit' });
  console.log('Comando "backstop reference" ejecutado exitosamente.');
} catch (error) {
  console.error('Error al ejecutar el comando "backstop reference".', error);
}

// Ejecutar el comando "backstop reference" 
try {
  execSync('backstop test', { stdio: 'inherit' });
  console.log('Comando "backstop test" ejecutado exitosamente.');
} catch (error) {
  console.error('Error al ejecutar el comando "backstop test".', error);
}