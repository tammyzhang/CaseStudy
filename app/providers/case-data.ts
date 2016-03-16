import {Injectable, Inject} from 'angular2/core';
import {CaseItem} from '../providers/caseItem'
import {ModalityCondition} from '../providers/ModalityCondition'
import {ResponseOptions, Response} from 'angular2/http';
import {Http, URLSearchParams, HTTP_PROVIDERS} from 'angular2/http';
import {Observable, Subject, ReplaySubject} from 'rxjs/Rx';
import {CaseLocalProvider} from '../providers/CaseLocalProvider';
import {CaseWebProvider} from '../providers/CaseWebProvider';


@Injectable()
export class CaseData {
    data: Array<CaseItem>;
    isWebProvideAvailable: boolean;
    constructor(private localProvider: CaseLocalProvider, private webProvider: CaseWebProvider) {
    }

    public getCasesByKeyword(term: string, page?: number, size?: number): any {
        return this.localProvider.getPageCasesByKeyword(term, page, size);
    }

    public getAllCases(): any {
        return this.localProvider.getCases();
    }

   
    
    // TODO: should get data from service 
    // return the group types grouped by modality, e.g. CT, MR, DXR, US
    public getFilterConditionModality(keyword: string): any {
        return this.localProvider.getFilterConditionModality(keyword);

    }

    public getCaseById(id: string): any {
        return this.localProvider.getCaseById(id);
    }

}
