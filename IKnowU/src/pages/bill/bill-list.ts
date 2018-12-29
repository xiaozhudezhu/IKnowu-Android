import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'bill-list-page',
    templateUrl: 'bill-list.html'
})
export class BillListPage {
    billMonthList: BillMonthBean[] = [
        new BillMonthBean('2017年7月', [
            new BillBean('', '7月19日', '12:19', 'ZFB', '1', 200, false),
            new BillBean('', '7月18日', '11:19', 'WX', '0', 100, false),
            new BillBean('', '7月17日', '10:19', 'WX', '1', 200, false),
            new BillBean('', '7月14日', '12:45', 'ZFB', '1', 200, false),
            new BillBean('', '7月14日', '18:15', 'YH', '1', 200, false),
            new BillBean('', '7月13日', '15:30', 'YH', '1', 200, false),
            new BillBean('', '7月12日', '13:09', 'ZFB', '1', 200, false)
        ]),
        new BillMonthBean('2017年6月', [
            new BillBean('', '6月19日', '12:19', 'ZFB', '1', 200, false),
            new BillBean('', '6月18日', '11:19', 'WX', '0', 100, false),
            new BillBean('', '6月17日', '10:19', 'WX', '1', 200, false),
            new BillBean('', '6月14日', '12:45', 'ZFB', '1', 200, false),
            new BillBean('', '6月14日', '18:15', 'YH', '1', 200, false),
            new BillBean('', '6月13日', '15:30', 'YH', '1', 200, false),
            new BillBean('', '6月12日', '13:09', 'ZFB', '1', 200, false)
        ]),
        new BillMonthBean('2017年5月', [
            new BillBean('', '5月19日', '12:19', 'ZFB', '1', 200, false),
            new BillBean('', '5月18日', '11:19', 'WX', '0', 100, false),
            new BillBean('', '5月17日', '10:19', 'WX', '1', 200, false)

        ])
    ];
    constructor(public navCtrl: NavController) {

    }

    startSearch() {
    }

    showDetail(bill: BillBean) {
        console.log(bill);
    }

    deleteBill(bill: BillBean, i, k) {
        delete this.billMonthList[i].billList[k];
    }

}

export class BillBean {
    constructor(public id: string, public date: string, public time: string,
         public payMethod: string, public incomeType: string, public amount: number, public isDeleted: boolean) {
    }
}

export class BillMonthBean {
    constructor(public month: string, public billList: BillBean[]) {
    }
}
