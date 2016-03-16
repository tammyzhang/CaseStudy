import {NavController, Page, NavParams, Alert} from 'ionic-framework/index';
import {CaseDetailPage} from '../case-detail/case-detail';
import {CaseItem} from '../../providers/caseItem';
import {CaseLocalProvider} from '../../providers/CaseLocalProvider';
import {CaseWebProvider} from '../../providers/CaseWebProvider';

@Page({
    templateUrl: 'build/pages/case-list/case-list.html'
})
export class CaseListPage {
    filterredCaseList: Array<CaseItem>;
    queryText: string;
    filter: string;
    hiddenContent: boolean;
    modalityConditions: any;
    resultCount: number;
    currentPageIndex: number;
    totalPageCount: number;
    size: number;
    isSearching: boolean;
    urlBase: string = "http://161.92.157.247:8080/api";
    
    constructor(private nav: NavController, navParams: NavParams, private caseWebProvider: CaseWebProvider) {
        this.queryText = navParams.data[0];
        this.filterredCaseList = navParams.data[1];
        this.resultCount = navParams.data[2];
        this.modalityConditions = [];
        this.filter = "filterCondition";
        this.hiddenContent = true;
        this.currentPageIndex = 1;
        this.size = 5;
        this.isSearching = false;
        this.totalPageCount = Math.ceil(this.resultCount / this.size);
    }

    goToNextPage(): void {

        if (this.currentPageIndex < this.totalPageCount) {
            this.isSearching = true;
            this.currentPageIndex += 1;
            console.log("[CaseList]: start to to next page....");
            this.caseWebProvider.getCasesPerPageByKeyword(this.queryText, this.currentPageIndex, this.size).then(data=> {
                this.filterredCaseList = data;
                this.isSearching = false;
                console.log("[CaseList]: Keyword=" + this.queryText + " page=" + this.currentPageIndex + " size=" + this.size);
                console.log("[CaseList]: one page count =" + this.filterredCaseList.length);
                console.log("[CaseList]: finish to next page....");
            });
        }
    }

    goToPreviousPage(): void {
        if (this.currentPageIndex > 1) {
            this.isSearching = true;
            this.currentPageIndex -= 1;
             console.log("[CaseList]: start to to previous page....");
            this.caseWebProvider.getCasesPerPageByKeyword(this.queryText, this.currentPageIndex, this.size).then(data=> {
                this.filterredCaseList = data;
                this.isSearching = false;
                console.log("[CaseList]: Keyword=" + this.queryText + " page=" + this.currentPageIndex + " size=" + this.size);
                console.log("[CaseList]: one page count =" + this.filterredCaseList.length);
                 console.log("[CaseList]: finish to previous page....");
            });
        }
    }

    goToCaseDetail(onecase: CaseItem): void {
        this.isSearching = true;
         console.log("[CaseList]: start to go to case detail page....");
        this.caseWebProvider.getCaseById(onecase.id).then(data=> {
            var caseItem: CaseItem = data;
            this.isSearching = false;
            this.nav.push(CaseDetailPage, caseItem);
            console.log("[CaseList]: CaseID= " + caseItem.id + " CaseHeadline=" + caseItem.headline + " author=" + caseItem.author.name);
            console.log("[CaseList]: finish to go to case detail page....");
        });
    }

    setCheckedInfo(id: number): void {
        this.modalityConditions[id - 1].isChecked = !this.modalityConditions[id - 1].isChecked;
    }

    hiddenContentChange(): void {
        this.hiddenContent = !this.hiddenContent;
    }
}


