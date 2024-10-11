const { deleteFoldersRecursive, npmInstall, buildReact, copyFiles } = require('@iobroker/build-tools');

function copyAllFiles() {
    copyFiles(['build/static/js/*.js'], 'dist/admin/custom/static/js');
    copyFiles(['build/customComponents.js'], 'dist/admin/custom');
    copyFiles(['build/customComponents.js.map'], 'dist/admin/custom');
    copyFiles(['build/static/js/*.map'], 'dist/admin/custom/static/js');
    copyFiles(['src/i18n/*.json'], 'dist/admin/custom/i18n');
    copyFiles(['img/*'], 'dist/img');
    copyFiles(['README.md', 'LICENSE'], 'dist');
    copyFiles(['src/package.json'], 'dist');
}

if (process.argv.includes('--0-clean')) {
    deleteFoldersRecursive(`${__dirname}/admin`, ['admin-component-template.png', 'jsonConfig.json']);
    deleteFoldersRecursive(`${__dirname}/src/build`);
} else if (process.argv.includes('--1-npm')) {
    npmInstall(__dirname).catch(e => {
        console.error(`Cannot install packages: ${e}`);
        process.exit(1);
    });
} else if (process.argv.includes('--2-compile')) {
    buildReact(__dirname, { rootDir: __dirname, craco: true, exec: true }).catch(e => {
        console.error(`Cannot compile: ${e}`);
        process.exit(1);
    });
} else if (process.argv.includes('--3-copy')) {
    copyAllFiles();
} else {
    deleteFoldersRecursive(`${__dirname}/admin`, ['admin-component-template.png', 'jsonConfig.json']);
    deleteFoldersRecursive(`${__dirname}/src/build`);
    npmInstall(__dirname)
        .then(() => buildReact(__dirname, { rootDir: __dirname, craco: true, exec: true }))
        .then(() => copyAllFiles())
        .catch(e => {
            console.error(`Cannot build: ${e}`);
            process.exit(1);
        });
}
