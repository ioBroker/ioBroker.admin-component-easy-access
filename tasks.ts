import { deleteFoldersRecursive, npmInstall, buildReact, copyFiles } from '@iobroker/build-tools';

const rootDir = import.meta.dirname;

function clean(): void {
    deleteFoldersRecursive(`${rootDir}/admin`, ['admin-component-template.png', 'jsonConfig.json']);
    deleteFoldersRecursive(`${rootDir}/build`);
}

function copyAllFiles(): void {
    copyFiles(['src/i18n/*.json'], 'admin/custom/i18n');
    copyFiles(['build/assets/*.js'], 'admin/custom/assets');
    copyFiles(['build/assets/*.map'], 'admin/custom/assets');
    copyFiles(['build/customComponents.js'], 'admin/custom');
    copyFiles(['build/customComponents.js.map'], 'admin/custom');
    // The admin reads this manifest to see which component library the build was made against,
    // and refuses to start the component if it targets an older GUI API generation.
    copyFiles(['build/mf-manifest.json'], 'admin/custom');
}

function build(): Promise<void> {
    return buildReact(rootDir, { rootDir, vite: true, tsc: true, exec: true });
}

if (process.argv.includes('--0-clean')) {
    clean();
} else if (process.argv.includes('--1-npm')) {
    npmInstall(rootDir).catch((e: unknown) => {
        console.error(`Cannot install packages: ${e as Error}`);
        process.exit(1);
    });
} else if (process.argv.includes('--2-compile')) {
    build().catch((e: unknown) => {
        console.error(`Cannot compile: ${e as Error}`);
        process.exit(1);
    });
} else if (process.argv.includes('--3-copy')) {
    copyAllFiles();
} else {
    clean();
    npmInstall(rootDir)
        .then(() => build())
        .then(() => copyAllFiles())
        .catch((e: unknown) => {
            console.error(`Cannot build: ${e as Error}`);
            process.exit(1);
        });
}
