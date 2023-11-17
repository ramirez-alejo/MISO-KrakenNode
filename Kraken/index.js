const fs = require('fs/promises')
const { exec } = require('child_process')
const util = require('util')
const execAsync = util.promisify(exec)
const path = require('path')

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

const execFeatures = async (featuresPath, krakenFeaturesPath) => {

    await removeFeaturesFromFolder(krakenFeaturesPath);

    const featureFilePaths = await getFeatureFilePaths(featuresPath)

    for (const filePath of featureFilePaths) {

        const featurePath = krakenFeaturesPath + path.basename(filePath)
        console.log('Inicia copia feature', filePath)
        await fs.copyFile(filePath, featurePath)
        console.log('Inicia ejecución feature', filePath)
        try {
            const { stdout, stderr } = await execAsync('npm run kraken-run')
            !!stdout && console.log('resultado de la ejecución', stdout)
            !!stderr && console.error('error en la ejecución', stderr)
        } catch (error) {
            console.error(error)
        }
        console.log('Finaliza ejecución feaure', filePath)
        await fs.unlink(featurePath)
        console.log('Feature eliminado de la carpeta de kraken', filePath)
    }
}

execFeatures('./escenarios', './features/').catch(console.error)

