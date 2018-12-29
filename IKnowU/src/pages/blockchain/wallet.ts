import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

import { WalletService } from '../blockchain/wallet-service';


@Component({
    selector: 'wallet-page',
    templateUrl: 'wallet.html',
    providers: [ WalletService ]
})
export class WalletPage {
    opType: string = '1';
    account: string;
    newAccountPwd: string;
    newAccountHash: string;
    accounts: string[];
    balance: number;
    balanceStr: string;
    symbol: string;
    transfer = {
        from: '',
        pwd: '',
        to: '',
        amount: '',
        transactionHash: ''
    }

    constructor(public navCtrl: NavController, public loadCtrl: LoadingController, private toastCtrl: ToastController, private walletService: WalletService) {
        let loading = this.loadCtrl.create({
            content: "正在加载数据...",//loading框显示的内容
            showBackdrop: false //是否显示遮罩层
        });
        loading.present();
        this.walletService.getAccounts().then(res => {
            loading.dismissAll();
            this.accounts = res.accounts;
        }).catch(error => {
            console.log(error);
            loading.dismissAll();
        });
    }

    getBalance() {
        let loading = this.loadCtrl.create({
            content: "正在查询余额...",//loading框显示的内容
            showBackdrop: false //是否显示遮罩层
        });
        loading.present();
        this.walletService.getUFOBalance({ addr: this.account }).then(res => {
            loading.dismissAll();
            this.balance = res.balance;
            this.symbol = res.symbol;
            this.balanceStr = this.balance + ' ' + this.symbol;
        }).catch(error => {
            console.log(error);
            loading.dismissAll();
        });
    }

    newAccount() {
        let loading = this.loadCtrl.create({
            content: "正在创建账号...",//loading框显示的内容
            showBackdrop: false //是否显示遮罩层
        });
        loading.present();
        this.walletService.newAccount({ pwd: this.newAccountPwd }).then(res => {
            loading.dismissAll();
            this.newAccountHash = res.account;
        }).catch(error => {
            console.log(error);
            loading.dismissAll();
        });
    }

    sendTransaction() {
        let loading = this.loadCtrl.create({
            content: "正在转账...",//loading框显示的内容
            showBackdrop: false //是否显示遮罩层
        });
        loading.present();
        this.walletService.sendUFOTransaction(this.transfer).then(res => {
            loading.dismissAll();
            this.transfer.transactionHash = res.transaction;
        }).catch(error => {
            console.log(error);
            loading.dismissAll();
        });
    }


    submitSuccess() {
        this.presentToast('提交成功');
        this.navCtrl.pop();
    }

    presentToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 500,
            position: 'middle'
        });
        toast.present();
    }

}

