const { deleteFoldersRecursive, npmInstall, buildReact, copyFiles } = require('@iobroker/build-tools');

function copyAllFiles() {
    copyFiles(['src/i18n/*.json'], 'admin/custom/i18n');
    copyFiles(['build/static/js/*.js'], 'admin/custom/static/js');
    copyFiles(['build/customComponents.js'], 'admin/custom');
    copyFiles(['build/customComponents.js.map'], 'admin/custom');
    copyFiles(['build/static/js/*.map'], 'admin/custom/static/js');
}

function build() {
    return buildReact(__dirname, { rootDir: __dirname, craco: true, exec: true });
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
    build().catch(e => {
        console.error(`Cannot compile: ${e}`);
        process.exit(1);
    });
} else if (process.argv.includes('--3-copy')) {
    copyAllFiles();
} else {
    deleteFoldersRecursive(`${__dirname}/build`);
    npmInstall(__dirname)
        .then(() => build())
        .then(() => copyAllFiles())
        .catch(e => {
            console.error(`Cannot build: ${e}`);
            process.exit(1);
        });
}
