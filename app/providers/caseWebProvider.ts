import {Injectable, Inject} from 'angular2/core';
import {CaseItem} from '../providers/caseItem'
import {ModalityCondition} from '../providers/ModalityCondition'
import {ResponseOptions, Response} from 'angular2/http';
import {Http, URLSearchParams, HTTP_PROVIDERS} from 'angular2/http';

@Injectable()
export class CaseWebProvider {
    http: Http;
    data: Array<CaseItem>;
    urlBase: string;

    constructor(http: Http) {
        this.http = http;
        this.urlBase = "http://161.92.157.247:8080/";
    }

    public getCasesPerPageByKeyword(term: string, page?: number, size?: number): Promise<CaseItem[]> {
        let url = this.urlBase + "api/search/cases";
        var params = new URLSearchParams();

        params.set('keyword', term); // the user's search value
        page ? params.set("page", (page - 1) + "") : params.set('page', '0'); // default page index is 0
        size ? params.set("size", size + "") : params.set('size', '10'); // default size of one page is 10

        return new Promise(resolve => {
            this.http.get(url, { search: params }).subscribe(res => {
                this.data = res.json();
                console.log("CaseWebProvider: "+new Date() + " getPageCasesByKeyword : " + this.data);
                resolve(this.data);
            });
        }).catch(this.handleError);
    }


    private handleError(error: any) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Promise.reject(error.message || error.json().error || 'Server error');
    }

    
    // TODO: should get data from service 
    // return the group types grouped by modality, e.g. CT, MR, DXR, US
    public getFilterConditionModality(keyword: string): ModalityCondition[] {

        return [{ "id": 1, "name": "CT", "isChecked": true },
            { "id": 2, "name": "MR", "isChecked": true }, ];
    }

    public getCaseById(id: string): Promise<CaseItem> {
        let url = this.urlBase + "api/cases/" + id;
        return new Promise(resolve => {
            this.http.get(url).subscribe(res => {
                this.data = res.json();
                console.log("CaseWebProvider: "+new Date()+ " getCaseById : " + this.data);
                resolve(this.data);
            });
        }).catch(this.handleError);;
    }

    public getCasesCountByKeyword(keyword: string): Promise<number> {
        let url = this.urlBase + "api/search/cases?keyword="+keyword;
        return new Promise(resolve => {
            this.http.get(url).subscribe(res => {
                this.data = res.json();
                console.log("CaseWebProvider: "+new Date() + " getCasesCountByKeyword : " + this.data.length);
                resolve(this.data.length);
            });
        }).catch(this.handleError);;
    }

}
