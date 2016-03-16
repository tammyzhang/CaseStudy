import {NavParams, Page} from 'ionic-framework/index';
import {CaseItem} from '../../providers/caseItem';
import {CaseWebProvider} from '../../providers/CaseWebProvider';

@Page({
    templateUrl: 'build/pages/case-detail/case-detail.html'
})


export class CaseDetailPage {
    id: string;
    case: CaseItem;
    headline: string;
    urlBase:string = "http://161.92.157.247:8080/api";
    constructor(navParams: NavParams, private caseWebProvider: CaseWebProvider) {
        this.case = navParams.data;
    }

}
