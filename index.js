import "react-native-gesture-handler";
import "dayjs/locale/pt-br";
import { registerRootComponent } from "expo";
import dayjs from "dayjs";

import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
dayjs.locale("pt-br");

registerRootComponent(App);
