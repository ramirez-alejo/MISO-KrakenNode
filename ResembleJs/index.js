const compareImages = require("resemblejs/compareImages")

const fs = require('fs');
const fsPromises = require('fs').promises;

const getScreenShotsFilePaths = async (dir, paths = []) => {
    const featuresDir = await fsPromises.opendir(dir);
    let dirEntry;
    while ((dirEntry = await featuresDir.read()) != null) {
        if (dirEntry.isDirectory()) {
            paths = await getScreenShotsFilePaths(dir + '/' + dirEntry.name, paths)
        } else if (dirEntry.isFile()) {
            if (dirEntry.name.endsWith('.png')) {
                paths.push(dir + '/' + dirEntry.name)
            }
        }
    }
    await featuresDir.close()
    return paths;
}


async function executeTest(){

    //Check if the results folder exists
    if (!fs.existsSync('./diff_images')){
        fs.mkdirSync('./diff_images');
    }

    console.log('------------------------------------------------------------------------------------')
    console.log('Starting execution')
    console.log('------------------------------------------------------------------------------------')
    console.log('Create the compare foilder 1/2')
    console.log('------------------------------------------------------------------------------------')
    //Create the compare folder
    if (!fs.existsSync('./compare')){
        fs.mkdirSync('./compare');
    }
    console.log('Create the compare foilder 2/2')
    console.log('------------------------------------------------------------------------------------')
    //Create the compare folder
    if (!fs.existsSync('./compare2')){
        fs.mkdirSync('./compare2');
    }
    console.log('Get the list of files to compare')
    console.log('------------------------------------------------------------------------------------')
    //Get the list of files to compare
    const files = await getScreenShotsFilePaths('../Kraken/reports/screenshots');

    const options = {
        output: {
            errorColor: {
                red: 255,
                green: 0,
                blue: 255
            },
            errorType: "movement",
            transparency: 0.3,
            largeImageThreshold: 1200,
            useCrossOrigin: false,
            outputDiff: true
        },
        scaleToSameSize: true,
        ignore: "antialiasing"
    };

    // Initialize an array to store comparison results
    let comparisonResults = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Lets fin the equivalent file in the second folder (replace Kraken by Kraken510)
        const file2 = file.replace('Kraken', 'Kraken510');

        //lets check if the file 2 exists
        if (!fs.existsSync(file2)){
            continue;
        }

        // Compare the files
        const data = await compareImages(
            fs.readFileSync(file),
            fs.readFileSync(file2),
            options
        );

        // Write the comparison image to a file
        const diffImagePath = `./diff_images/diff_${i}.png`;
        fs.writeFileSync(diffImagePath, data.getBuffer());

        // Store the result in the array
        comparisonResults.push({
            file1: file,
            file2: file2,
            diffImage: diffImagePath,
            comparisonData: data
        });
    }

    // Now, generate a single report from comparisonResults
// Now, generate a single report from comparisonResults
let report = '';
comparisonResults.forEach(result => {

    report += `<h2>Comparison for ${result.file1} and ${result.file2}:</h2>`;
    report += `<table><tr>`;
    //Source image 1
    report += `<td><h3>Source image 1:</h3>`;
    report += `<img src="${result.file1}" style="width: 100%;" /></td>`;
    //Source image 2
    report += `<td><h3>Source image 2:</h3>`;
    report += `<img src="${result.file2}" style="width: 100%;" /></td>`;
    //Diff image
    report += `<td><h3>Diff image:</h3>`;
    report += `<img src="${result.diffImage}" style="width: 100%;" /></td>`;
    report += `</tr></table>`;
    //Comparison data
    report += `<h3>Comparison data:</h3>`;
    report += `<pre>${JSON.stringify(result.comparisonData, null, 2)}</pre>`;
    report += '<hr>';
    
});

// Wrap the report with necessary HTML tags
report = `
<html>
<head>
    <title>Comparison Report</title>
</head>
<body>
    <h1>Comparison Report</h1>
    ${report}
</body>
</html>`;

// Write the report to a file
fs.writeFileSync('./comparison_report.html', report);

}

executeTest();