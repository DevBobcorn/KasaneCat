const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

function compressFolder(folderPath, outputZipFileName) {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(outputZipFileName);
        const archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level (9 is max)
        });

        output.on('close', () => {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
            resolve();
        });

        output.on('end', () => {
            console.log('Data has been drained');
        });

        archive.on('error', (err) => {
            reject(err);
        });

        archive.pipe(output);

        archive.directory(folderPath, '/'); // Add the entire folder to the archive

        archive.finalize();
    });
}

const targetFolder = './dist';

fs.readFile('./manifest.json', 'utf8', (err, text) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    try {
        const jsonData = JSON.parse(text);
        const outputFileName = `./${jsonData['name']}-${jsonData['version']}.plugin`;

        // Replace file paths
        const newText = text.replaceAll(targetFolder, '.');

        // Write manifest.json to target folder
        fs.writeFile(`${targetFolder}/manifest.json`, newText, err => {
            console.error('Error writing manifest.json:', err);
        });

        console.log('manifest.json created in target folder.');

        // Pack everything up
        compressFolder(targetFolder, outputFileName)
            .then(() => {
                console.log(`Compression successful! ${outputFileName} created.`);
            })
            .catch(err => {
                console.error('Error during compression:', err);
            });
    } catch (parseErr) {
        console.error('Error parsing manifest.json:', parseErr);
    }
});