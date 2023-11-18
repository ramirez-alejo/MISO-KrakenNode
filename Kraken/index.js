const fs = require('fs/promises')
const { exec } = require('child_process')
const util = require('util')
const execAsync = util.promisify(exec)
const path = require('path')
const { stdout } = require('process')
const chalk = require('chalk');

const getFeatureFilePaths = async (dir, paths = []) => {
    const featuresDir = await fs.opendir(dir);
    let dirEntry;
    while ((dirEntry = await featuresDir.read()) != null) {
        if (dirEntry.isDirectory()) {
            paths = await getFeatureFilePaths(dir + '/' + dirEntry.name, paths)
        } else if (dirEntry.isFile()) {
            if (dirEntry.name.endsWith('.feature')) {
                paths.push(dir + '/' + dirEntry.name)
            }
        }
    }
    await featuresDir.close()
    return paths;
}


const removeFeaturesFromFolder = async (path) => {
    const dirEntries = await fs.readdir(path, { withFileTypes: true })

    dirEntries
        .filter(dirEntry => dirEntry.isFile() && dirEntry.name.endsWith('.feature'))
        .map(async (dirEntry) => {
            await fs.unlink(path + '/' + dirEntry.name)
        })

}

const writeToConsole = (msg) => {
    stdout.clearLine();
    stdout.cursorTo(0);
    stdout.write('  ' + msg)
}

const execFeatures = async (featuresPath, krakenFeaturesPath) => {
    console.log('Eliminando escenarios de la carpeta "%s"', krakenFeaturesPath)
    await removeFeaturesFromFolder(krakenFeaturesPath);
    console.log('Obteniendo escenarios a ejecutar de la carpeta "%s"', featuresPath)
    const featureFilePaths = await getFeatureFilePaths(featuresPath)
    console.log('"%d" escenarios encontrados', featureFilePaths.length)
    for (const filePath of featureFilePaths) {
        const featureName = path.basename(filePath)
        writeToConsole(`Escenario ${featureName}`)
        const featurePath = krakenFeaturesPath + '/' + featureName
        writeToConsole(`Escenario ${featureName} - Copiando archivo`)
        await fs.copyFile(filePath, featurePath)
        writeToConsole(`Escenario ${featureName} - Inicia la ejecución del escenario`)
        let error
        try {
            await execAsync('npm run kraken-run')
        } catch (e) {
            error = e
        }
        await fs.unlink(featurePath)
        const buildEndMessage = (color, icon) => color(`Escenario ${featureName} ${icon} \n`)
        const message = !!error ? buildEndMessage(chalk.red, '\u26D4') : buildEndMessage(chalk.green, '\u2713')
        writeToConsole(message)
    }
}

execFeatures('./escenarios' , './features').catch(console.error)

