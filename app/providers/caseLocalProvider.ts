import {Injectable, Inject} from 'angular2/core';
import {CaseItem} from '../providers/caseItem'
import {ModalityCondition} from '../providers/ModalityCondition'
import {Http} from 'angular2/http';


@Injectable()
export class CaseLocalProvider {
    http: Http;
    data: Array<CaseItem>;
    urlBase: string;

    constructor(http: Http) {
        this.http = http;
        this.urlBase = "data/repository.json";
        //this.urlBase="http://161.92.157.247:8080/api/cases";
       
    }


    public load(): Promise<CaseItem[]> {
        if (this.data) {
            // already loaded data
            return Promise.resolve(this.data);
        }
        // don't have the data yet
        // We're using Angular Http provider to request the data,
        // then on the response it'll map the JSON data to a parsed JS object.
        // Next we process the data and resolve the promise with the new data.
       
        return new Promise(resolve => {
            this.http.get(this.urlBase).subscribe(res =>
                this.data = res.json());
            resolve(this.data);
        });
    }

    public getCases(): Promise<CaseItem[]> {
        return this.load().then(data=> {
            return data;
        });
    }

    public getCasesCountByKeyword(term: string): Promise<number> {
        return this.load().then(data=> {
            return data.filter(item=> item.headline.indexOf(term) >= 0).length;
        });
    }
    public getPageCasesByKeyword(term: string, page?: number, size?: number): Promise<CaseItem[]> {

        return this.load().then(data=> {
            return data.filter(item=> item.headline.indexOf(term) >= 0).slice((page - 1) * size, page * size);
        });
    }
    private getAllCasesByKeyword(term: string): Promise<CaseItem[]> {
        return this.load().then(data=> {
            return data.filter(item=> item.headline.indexOf(term) >= 0);
        });
    }
    
    // TODO: should get data from service 
    // return the group types grouped by modality, e.g. CT, MR, DXR, US
    public getFilterConditionModality(keyword: string): ModalityCondition[] {

        // return [{ "id": 1, "name": "CT", "isChecked": true },
        //   { "id": 2, "name": "MR", "isChecked": true }, ];
        var index = 1;
        let modalityConditions = [];
        this.getAllCasesByKeyword(keyword).then(data=> {
            data.forEach(item=> {
                if (!this.isConditionExist(item, modalityConditions)) {
                    modalityConditions.push({
                        id: index++,
                        name: item.modality,
                        isChecked: false
                    });
                }
            })
        });
        return modalityConditions;
    }
    private isConditionExist(caseItem: CaseItem, modalityConditions: ModalityCondition[]): Boolean {

        for (var i = 0; i < modalityConditions.length; i++) {
            if (modalityConditions[i].name.indexOf(caseItem.modality) >= 0)
                return true;
        }
        return false;
    }


    public getCaseById(id: string): Promise<CaseItem> {
        return this.load().then(datas=> {
            return datas.find(item=> item.id == id);
        });
    }

    public sortCaseByViewTimes(term: string, page?: number, size?: number): Promise<CaseItem[]> {

        return this.getAllCasesByKeyword(term).then(data=> {
            return data.sort(function(a: CaseItem, b: CaseItem) {
                return b.viewTimes - a.viewTimes;
            }).slice((page - 1) * size, page * size);
        });
    }

}
