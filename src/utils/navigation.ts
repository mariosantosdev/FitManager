import { NavigationProp } from "@react-navigation/core"

import { screens, ScreeName } from '@utils/contants';

export default class NavigationUtils {
    navigation: NavigationProp<any>;
    screenIndex: number;

    constructor(navigation: NavigationProp<any>,) {
        this.navigation = navigation;
        this.screenIndex = navigation.getState().index;
    }

    getFocusScreen() {
        return this.navigation.getState().routes[this.screenIndex].name as ScreeName;
    }

    getTitleScreen(screename: ScreeName) {
        return screens.filter((screen) => screen.name === screename)[0].title;
    }
}