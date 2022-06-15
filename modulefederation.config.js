const makeShared = pkgs => {
    const result = {};
    pkgs.forEach(
        packageName => {
            result[packageName] = {
                requiredVersion: '*',
            };
        },
    );
    return result;
};

module.exports = {
    name: 'ConfigCustomEasyAccess',
    // library: { type: 'module' },
    // library: { type: 'var', name: 'MaterialDemo' },
    filename: 'customComponents.js',
    exposes: {
        './Components': './src/Components.jsx',
    },
    shared: makeShared(['@mui/material', '@mui/styles', '@iobroker/adapter-react-v5', 'react', 'react-dom', 'prop-types'])
    // shared: {
    // react: {singleton: true,
    //     eager: true,
    //     requiredVersion: deps.react},
    // 'react-dom': {singleton: true,
    //     requiredVersion: deps.react['react-dom']},
    // '@mui/material': {singleton: true},
    // '@mui/icons-material': {singleton: true},
    // 'prop-types': {singleton: true},
    // '@iobroker/adapter-react-v5': {singleton: true},
    // '@mui/styles': {singleton: true},
    // 'react-ace': {singleton: true},
    // }
    // './src/visRxWidget.jsx': {
    //     packageName: 'visRxWidget',
    // },
};
