import { Injectable } from '@angular/core';
import { HttpService } from '../../providers/HttpService';
import { Constants } from '../../util/Constants';
@Injectable()
export class OrderService {
    constructor(private httpService: HttpService) {
    }
    create(param) {
        return this.httpService.get("http://" + Constants.URL_ROOT + Constants.URL_ORDER_CREATE, param);
    }
  
}