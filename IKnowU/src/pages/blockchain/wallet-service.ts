import { Injectable } from '@angular/core';
import { HttpService } from '../../providers/HttpService';
import { Constants } from '../../util/Constants';
@Injectable()
export class WalletService {
    constructor(private httpService: HttpService) {
    }

    getAccounts() {
        return this.httpService.get("http://" + Constants.URL_ROOT + Constants.URL_BLOCKCHAIN_GETACCOUNTS, {});
    }

    newAccount(param) {
        return this.httpService.get("http://" + Constants.URL_ROOT + Constants.URL_BLOCKCHAIN_NEWACCOUNT, param);
    }

    getUFOBalance(param) {
        return this.httpService.get("http://" + Constants.URL_ROOT + Constants.URL_BLOCKCHAIN_GETUFOBALANCE, param);
    }

    sendUFOTransaction(param) {
        return this.httpService.get("http://" + Constants.URL_ROOT + Constants.URL_BLOCKCHAIN_SENDUFOTRANSACTION, param);
    }
  
}