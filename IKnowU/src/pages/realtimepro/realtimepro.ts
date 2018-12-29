import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';

@Component({
    selector: 'page-realtimepro',
    templateUrl: 'realtimepro.html'
})
export class RealTimeProPage {
    @Input('isComponent') isComponent: boolean = false;
    pcatalog: string = 'catalog0';
    problemCatalogs: ProblemCatalogBean[] = [
        new ProblemCatalogBean('智能合约', 1345, 1134, 75, [
            new ProblemItemBean('luke', '15:01', '对方不肯花钱', '水月', '11:30', '未接单'),
            new ProblemItemBean('luke', '13:01', '不愿意给彩礼', '牧师', '11:30', '已解决'),
            new ProblemItemBean('luke', '12:01', '对方不肯花钱', '水月', '11:30', '已解决'),
            new ProblemItemBean('luke', '11:01', '对方不肯花钱', '水月', '11:30', '已解决')
        ]),
        new ProblemCatalogBean('ios', 2267, 1023, 49, [
            new ProblemItemBean('luke', '15:01', '对方不肯花钱', '水月', '11:30', '未接单'),
            new ProblemItemBean('luke', '13:01', '不愿意给彩礼', '牧师', '11:30', '已解决'),
            new ProblemItemBean('luke', '12:01', '对方不肯花钱', '水月', '11:30', '已解决'),
            new ProblemItemBean('luke', '11:01', '对方不肯花钱', '水月', '11:30', '已解决')
        ]),
        new ProblemCatalogBean('android', 1546, 960, 80, [
            new ProblemItemBean('luke', '15:01', '对方不肯花钱', '水月', '11:30', '未接单'),
            new ProblemItemBean('luke', '13:01', '不愿意给彩礼', '牧师', '11:30', '已解决'),
            new ProblemItemBean('luke', '12:01', '对方不肯花钱', '水月', '11:30', '已解决'),
            new ProblemItemBean('luke', '11:01', '对方不肯花钱', '水月', '11:30', '已解决')
        ]),
        new ProblemCatalogBean('数据库', 1169, 580, 96, [
            new ProblemItemBean('luke', '15:01', '对方不肯花钱', '水月', '11:30', '未接单'),
            new ProblemItemBean('luke', '13:01', '不愿意给彩礼', '牧师', '11:30', '已解决'),
            new ProblemItemBean('luke', '12:01', '对方不肯花钱', '水月', '11:30', '已解决'),
            new ProblemItemBean('luke', '11:01', '对方不肯花钱', '水月', '11:30', '已解决')
        ])
    ];
    constructor(public navCtrl: NavController) {

    }

    startSearch() {
        this.navCtrl.push(SearchPage);
    }

}

export class ProblemItemBean {

    constructor(public createUser: string, public createTime: string, public content: string,
        public resolveUser: string, public resolveTime: string, public status: string) {
    }
}

export class ProblemCatalogBean {
    constructor(public name: string, public dayCount: number, public hourCount: number, public completePercent: number,
        public itemList: ProblemItemBean[]) {
    }
}