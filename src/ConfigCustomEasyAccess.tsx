import React from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from '@mui/material';

// important to make from package and not from some children.
// invalid
// import ConfigGeneric from '@iobroker/adapter-react-v5/ConfigGeneric';
// valid
import { ConfigGeneric, type ConfigGenericProps, type ConfigGenericState } from '@iobroker/json-config';
import { I18n } from '@iobroker/adapter-react-v5';

const styles = {
    table: {
        minWidth: 400,
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
    },
};

interface ConfigCustomEasyAccessState extends ConfigGenericState {
    instances: { id: string; config: boolean; adminTab: ioBroker.InstanceObject['common']['adminTab'] }[];
}

class ConfigCustomEasyAccess extends ConfigGeneric<ConfigGenericProps, ConfigCustomEasyAccessState> {
    componentDidMount(): void {
        super.componentDidMount();

        void this.props.oContext.socket.getAdapterInstances().then((instances: ioBroker.InstanceObject[]) => {
            const _instances = instances
                .filter(
                    instance =>
                        instance?.common?.adminUI &&
                        (instance.common.adminUI.config !== 'none' || instance.common.adminUI.tab),
                )
                .map(instance => ({
                    id: instance._id.replace(/^system\.adapter\./, ''),
                    config: instance.common.adminUI?.config !== 'none',
                    adminTab: instance.common.adminTab,
                }))
                .sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

            this.setState({ instances: _instances });
        });
    }

    renderItem(_error: unknown, _disabled: boolean, _defaultValue?: unknown): React.JSX.Element | string | null {
        if (!this.state.instances) {
            return null;
        }
        const accessAllowedConfigs = ConfigGeneric.getValue(this.props.data, 'accessAllowedConfigs') || [];
        const accessAllowedTabs = ConfigGeneric.getValue(this.props.data, 'accessAllowedTabs') || [];

        return (
            <TableContainer>
                <Table
                    style={styles.table}
                    size="small"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell style={styles.header}>{I18n.t('custom_easy_Instance')}</TableCell>
                            <TableCell style={styles.header}>{I18n.t('custom_easy_Config')}</TableCell>
                            <TableCell style={styles.header}>{I18n.t('custom_easy_Tab')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.instances.map(row => (
                            <TableRow key={row.id}>
                                <TableCell
                                    component="th"
                                    scope="row"
                                >
                                    {row.id}
                                </TableCell>
                                <TableCell>
                                    {row.config ? (
                                        <Checkbox
                                            checked={accessAllowedConfigs.includes(row.id)}
                                            onClick={() => {
                                                const _accessAllowedConfigs = [...accessAllowedConfigs];
                                                const pos = _accessAllowedConfigs.indexOf(row.id);
                                                if (pos !== -1) {
                                                    _accessAllowedConfigs.splice(pos, 1);
                                                } else {
                                                    _accessAllowedConfigs.push(row.id);
                                                    _accessAllowedConfigs.sort();
                                                }
                                                void this.onChange('accessAllowedConfigs', _accessAllowedConfigs);
                                            }}
                                        />
                                    ) : null}
                                </TableCell>
                                <TableCell>
                                    {row.adminTab ? (
                                        <Checkbox
                                            checked={accessAllowedTabs.includes(row.id)}
                                            onClick={() => {
                                                const _accessAllowedTabs = [...accessAllowedTabs];
                                                const pos = _accessAllowedTabs.indexOf(row.id);
                                                if (pos !== -1) {
                                                    _accessAllowedTabs.splice(pos, 1);
                                                } else {
                                                    _accessAllowedTabs.push(row.id);
                                                    _accessAllowedTabs.sort();
                                                }
                                                void this.onChange('accessAllowedTabs', _accessAllowedTabs);
                                            }}
                                        />
                                    ) : null}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default ConfigCustomEasyAccess;
