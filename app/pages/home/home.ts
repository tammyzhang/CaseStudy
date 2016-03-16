import {NavController, Page, Alert} from 'ionic-framework/index';
import {CaseListPage} from '../case-list/case-list';
import {CaseItem} from '../../providers/caseItem';
import {CaseWebProvider} from '../../providers/CaseWebProvider';

@Page({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

    queryText: string = '';
    defaultPageIndex: number = 1;
    defaultPageSize: number = 5;
    isSearching: boolean = false;
    hasSearchContent: boolean = false;
    searchHitTop5Items: Array<string> = [
        'ct',
        'MR Knees',
        'Tumor',
        'Oncology brain',
        'Chest GATE',
    ];


    constructor(private nav: NavController, private caseWebProvider: CaseWebProvider) { }

    goToCaseList(): void {
        this.isSearching = true;
        let keyword=this.queryText;
        var caseList: CaseItem[] = [];
        var resultCount: number = 0;
        console.log("[HomePage]: start to searching cases.....keyword = "+ keyword);
        this.caseWebProvider.getCasesPerPageByKeyword(this.queryText, this.defaultPageIndex, this.defaultPageSize).then(data=> {
            caseList = data;
            console.log(this.queryText + " page=" + this.defaultPageIndex + " size=" + this.defaultPageSize+"     CaseListCount="+caseList.length);
            // for debug use
            // throw Error("this is a testing error!");
            this.caseWebProvider.getCasesCountByKeyword(this.queryText).then(data=> {
                resultCount = data;
                console.log("[HomePage]:  finish searching cases.....keyword = " + this.queryText);
                this.isSearching = false;
                this.queryText="";
                this.nav.push(CaseListPage, [keyword, caseList, resultCount]);

            });
        }).catch(err=> this.doAlert(err));
    }

    onKeyup(): void {
        this.hasSearchContent = true;
    }
    onFocus(): void {
        this.hasSearchContent = true;
    }

    onBlur(): void {
        this.hasSearchContent = false;
    }
    onCancel(): void {
        this.hasSearchContent = false;
    }

    doAlert(errorMessage): void {
        let alert = Alert.create({
            title: 'Service connect Failure',
            subTitle: 'errors',
            buttons: ['reTry', 'Cancel']
        });
        this.nav.present(alert);
    }
    onSelectSearchHit(txt: string): void {
        this.queryText = txt;
        this.goToCaseList();
    }

}
