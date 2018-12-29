import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'charge-page',
    templateUrl: 'charge.html'
})
export class ChargePage {
    selectedAmount: number;
    selectedPayMethod: string;
    payMethodList: string[] = [
        'ZFB', 'WX', 'YH'
    ];
    payAmountList: number[] = [
        1000, 500, 300, 200, 100, 50
    ];
    constructor(public navCtrl: NavController) {

    }

    charge() {

    }

}
