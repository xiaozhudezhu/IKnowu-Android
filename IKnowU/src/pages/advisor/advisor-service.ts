import { Injectable } from '@angular/core';
import { HttpService } from '../../providers/HttpService';
import { Constants } from '../../util/Constants';
@Injectable()
export class AdvisorService {
    constructor(private httpService: HttpService) {
    }
    search(param) {
        return this.httpService.get("http://" + Constants.URL_ROOT + Constants.URL_MASTER_SEARCH, param);
    }
  
}