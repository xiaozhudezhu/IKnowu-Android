import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { AdvisorListPage } from '../advisor/advisor-list';
import { BillListPage } from '../bill/bill-list';
import { ChargePage } from '../charge/charge';
import { SettingsPage } from '../settings/settings';
import { RealTimeProPage } from '../realtimepro/realtimepro';
import { OrderPage } from '../order/order';
import { MapPage } from '../map/map';
import { AttentionPage } from '../attention/attention';
import { ChatPage } from '../chat/chat';
import { WalletPage } from '../blockchain/wallet';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    //menuBeans: MenuBean[] = [
    //    new MenuBean('实时隐秘', 'assets/img/home/u116.png', RealTimeProPage),
    //    new MenuBean('导师查询', 'assets/img/home/u122.png', AdvisorListPage),
    //    new MenuBean('隐秘下单', 'assets/img/home/u120.png', OrderPage),
    //    new MenuBean('系统地图', 'assets/img/home/u118.png', MapPage),
    //    new MenuBean('系统充值', 'assets/img/home/u126.png', ChargePage),
    //    new MenuBean('费用查询', 'assets/img/home/u124.png', BillListPage),
    //    new MenuBean('我的关注', 'assets/img/home/u126.png', AttentionPage),
    //    new MenuBean('系统设置', 'assets/img/home/u144.png', SettingsPage),
    //    new MenuBean('聊天', 'assets/img/home/u144.png', ChatPage),
    //    new MenuBean('钱包', 'assets/img/home/u124.png', WalletPage)
    //];
    menuBeans: MenuBean[] = [
        new MenuBean('当前提问', 'assets/img/home/u116.png', RealTimeProPage),
        new MenuBean('导师查询', 'assets/img/home/u122.png', AdvisorListPage),
        new MenuBean('问题提问', 'assets/img/home/u120.png', OrderPage),
        new MenuBean('钱包', 'assets/img/home/u124.png', WalletPage)
    ];
    constructor(public navCtrl: NavController, private app: App) {

    }

    startSearch() {
        this.app.getRootNav().push(SearchPage);
    }

    gotoPage(page) {
        this.app.getRootNav().push(page);
    }

}

export class MenuBean {

    constructor(public name: string, public img: string, public page: any) {
    }
}