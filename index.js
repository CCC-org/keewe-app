import { registerRootComponent } from 'expo';
import { vexo } from 'vexo-analytics';

import App from './App';
vexo('0d177384-b89e-4b64-97ca-ad26355cf562');
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
