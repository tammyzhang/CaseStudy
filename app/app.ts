import {App, Platform} from 'ionic-framework/index';
import {HomePage} from './pages/home/home';
import { CaseData } from './providers/case-data';
import {bootstrap}         from 'angular2/platform/browser';
import {CaseLocalProvider} from './providers/CaseLocalProvider';
import {CaseWebProvider} from './providers/CaseWebProvider';


@App({
    templateUrl: 'build/app.html',
    providers: [CaseData, CaseLocalProvider, CaseWebProvider],
    config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
    rootPage: any;
    caseData: CaseData;

    constructor(platform: Platform) {
        //platform.ready().then(() => {
        // The platform is now ready. Note: if this callback fails to fire, follow
        // the Troubleshooting guide for a number of possible solutions:
        //
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        //
        // First, let's hide the keyboard accessory bar (only works natively) since
        // that's a better default:
        //
        // Keyboard.setAccessoryBarVisible(false);
        //
        // For example, we might change the StatusBar color. This one below is
        // good for dark backgrounds and light text:
        // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
           
        //});
        //caseData.load();
        this.rootPage = HomePage;
        //this.caseData = caseData;
        this.initialize();
    }

    initialize(): void {
        //this.caseData.load();
        //this.caseLocalProvider.load();
    }
}
