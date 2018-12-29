import { Component, Input } from '@angular/core';
import { NavController, MenuController, App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { MapPage } from '../map/map';
import { SettingsPasswordPage } from '../settings/settings-password';
import { WalletPage } from '../blockchain/wallet';
import { WalletService } from '../blockchain/wallet-service';
import { Constants } from '../../util/Constants';

@Component({
    selector: 'settings-page',
    templateUrl: 'settings.html',
    providers: [WalletService]
})
export class SettingsPage {

    @Input('isComponent') isComponent: boolean = false;
    walletBalance: number;
    walletSymbol: string;
    walletBalanceStr: string;

    constructor(private app: App, private menuCtrl: MenuController, private walletService: WalletService) {
        
    }

    ionViewDidLoad() {
        this.walletService.getUFOBalance({ addr: Constants.currentUser.walletAccount }).then(res => {
            this.walletBalance = res.balance;
            this.walletSymbol = res.symbol;
            this.walletBalanceStr = this.walletBalance + ' ' + this.walletSymbol;
            console.log(this.walletBalanceStr);
        }).catch(error => {
            console.log(error);
        });
    }

    openWallet() {
        this.menuCtrl.close();
        this.app.getRootNav().push(WalletPage);
    }

    gotoMap() {
        this.menuCtrl.close();
        this.app.getRootNav().push(MapPage);
    }

    updatePassword() {
        this.menuCtrl.close();
        this.app.getRootNav().push(SettingsPasswordPage);
    }

    logout() {
        this.menuCtrl.close();
        this.app.getRootNav().setRoot(LoginPage);
    }

}
