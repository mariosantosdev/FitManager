import { AdMobInterstitial } from 'expo-ads-admob';


export class AdMob {
    constructor() {
        this.init();
    }

    async init() {
        await AdMobInterstitial.setAdUnitID('ca-app-pub-7642727712683174/9780558659');
    }

    async showAd() {
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
        await AdMobInterstitial.showAdAsync();
    }
}