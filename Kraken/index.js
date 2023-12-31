const fs = require('fs/promises')
const { exec } = require('child_process')
const util = require('util')
const execAsync = util.promisify(exec)
const path = require('path')
const { stdout } = require('process')
const chalk = require('chalk');


const featuresPerWeek = new Map([
    ['1', [ '1user.feature', '2user.feature', '3user.feature', '1dashboard.feature', '17post.feature']],
])

const getFeatureFilePaths = async (dir, paths = []) => {
    const featuresDir = await fs.opendir(dir);
    let dirEntry;
    while ((dirEntry = await featuresDir.read()) != null) {
        const fullPath = path.join(dir,dirEntry.name);
        if (dirEntry.isDirectory()) {
            paths = await getFeatureFilePaths(fullPath, paths)
        } else if (dirEntry.isFile()) {
            if (dirEntry.name.endsWith('.feature')) {
                paths.push(fullPath)
            }
        }
    }
    await featuresDir.close()
    return paths;
}


const removeFeaturesFromFolder = async (filePath) => {
    const dirEntries = await fs.readdir(filePath, { withFileTypes: true })

    dirEntries
        .filter(dirEntry => dirEntry.isFile() && dirEntry.name.endsWith('.feature'))
        .map(async (dirEntry) => {
            await fs.unlink(path.join(filePath, dirEntry.name))
        })
}

const writeToConsole = (msg) => {
    stdout.clearLine();
    stdout.cursorTo(0);
    stdout.write('  ' + msg)
}

const execFeatures = async (featuresPath, krakenFeaturesPath) => {

    const week = process.argv[2]
    if (week) {
        console.log('Ejecutando escenarios para la semana %s', week)

        if (!featuresPerWeek.get(week)){
            console.log('La semana "%s" no existe', week)
            return
        }
    }

    console.log('Eliminando escenarios de la carpeta "%s"', krakenFeaturesPath)
    await removeFeaturesFromFolder(krakenFeaturesPath);
    console.log('Obteniendo escenarios a ejecutar de la carpeta "%s"', featuresPath)
    const featureFilePaths = await getFeatureFilePaths(featuresPath)
    console.log('"%d" escenarios encontrados', featureFilePaths.length)
    for (const filePath of featureFilePaths) {
        const feature = chalk.blueBright(filePath.split(path.sep).slice(-2).join(path.sep));
        const featureName = path.basename(filePath)

        //If we got the week parameter, we only execute the features for that week
        if (week && !featuresPerWeek.get(week).includes(featureName)) {
            console.log('Escenario %s - Saltando escenario ya que no es parte de la semana %s', feature, week)
            continue;
        }

        writeToConsole(`Escenario ${feature}`)
        const featurePath = path.join(krakenFeaturesPath,featureName);
        writeToConsole(`Escenario ${feature} - Copiando archivo`)
        await fs.copyFile(filePath, featurePath)
        writeToConsole(`Escenario ${feature} - Inicia la ejecución del escenario`)
        let error
        try {
            await execAsync('npm run kraken-run')
        } catch (e) {
            error = e
        }
        await fs.unlink(featurePath)
        const buildEndMessage = (color, icon) => color(`Escenario ${feature} ${icon} \n`)
        const message = !!error ? buildEndMessage(chalk.red, '\u26D4') : buildEndMessage(chalk.green, '\u2713')
        writeToConsole(message)
    }
}


execFeatures('./escenarios', './features').catch(console.error)

