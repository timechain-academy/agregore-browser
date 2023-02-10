#!/usr/bin/env node

const { exec } = require('child_process')


exec('pushd node_modules/hyper-dns && yarn add --optional better-sqlite3@8.0.1 && popd', (error, stdout, stderr) => {

	if (error) {
    console.log(`error: ${error.message}`)
    return
  }
  if
	(stderr) {
    console.log(`stderr: ${stderr}`)
    return
  }
  console.log(`stdout: ${stdout}`)
})
// exec('pushd node_modules/hyper-dns && npm install --optional better-sqlite3@8.0.1 && popd', (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });

const { extensionFlat } = require('@netless/extension-flat')

const EXTENSIONS = {
  'archiveweb.page': 'fpeoodllldobpkbkabpblcfaogecpndd',
  ublock: 'cjpalhdlnbpafiamejdnhcphjbkeiagm'
}

const EXTENSION_FOLDER = require('path').join(__dirname, 'app/extensions')

for (const [name, hash] of Object.entries(EXTENSIONS)) {
  downloadExtension(name, hash)
}

async function downloadExtension (name, hash) {
  console.log(`Downloading latest ${name} release from the chrome web store`)
  await extensionFlat({
    extensionHash: hash,
    folderName: name,
    outputFolder: EXTENSION_FOLDER,
    deleteCRX: true
  })
  console.log(`Finished downloading and installing ${name}`)
}
