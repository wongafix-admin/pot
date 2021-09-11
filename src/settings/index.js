import makeDb from '../db';
import makeSettingsQuery from './settings-query';
import makeSettingsEndpointHandler from './settings-endpoint';

const database = makeDb();
const settingsQuery = makeSettingsQuery({ database });
const settingsEndpointHandler = makeSettingsEndpointHandler({ settingsQuery });

export default settingsEndpointHandler;