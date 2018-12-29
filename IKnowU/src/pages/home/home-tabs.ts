import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { OrderPage } from '../order/order';
import { BillListPage } from '../bill/bill-list';
import { SettingsPage } from '../settings/settings';

@Component({
    selector: 'page-home-tabs',
    templateUrl: 'home-tabs.html'
})
export class HomeTabsPage {
    tabs;

    constructor() {
        this.tabs = [HomePage, OrderPage, BillListPage, SettingsPage];
    }
}