import { Injectable } from '@angular/core';
import { HttpService } from '../../providers/HttpService';
import { Constants } from '../../util/Constants';
@Injectable()
export class LoginService {
    constructor(private httpService: HttpService) {
    }
    login(param) {
        return this.httpService.get("http://" + Constants.URL_ROOT + Constants.URL_LOGIN, param);
    }
  
}