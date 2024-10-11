const { shared } = require('@iobroker/react-components/modulefederation.admin.config');

module.exports = {
    name: 'AdminComponentEasyAccessSet',
    filename: 'customComponents.js',
    exposes: {
        './Components': './src/Components.jsx',
    },
    shared,
};
