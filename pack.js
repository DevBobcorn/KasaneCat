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

const folderToCompress = './dist';

fs.copyFile('./manifest.json', `${folderToCompress}/manifest.json`, (err) => {
    if (err) throw err;
    console.log('manifest.json was copied to dist folder');
});

fs.readFile('./manifest.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    try {
        const jsonData = JSON.parse(data);
        const outputFileName = `./${jsonData['name']}-${jsonData['version']}.plugin`;

        compressFolder(folderToCompress, outputFileName)
            .then(() => {
                console.log(`Compression successful! ${outputFileName} created.`);
            })
            .catch(err => {
                console.error('Error during compression:', err);
            });
    } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
    }
});