import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AdvisorListPage } from '../advisor/advisor-list';
import { AttentionProblemsPage } from '../attention/attention-problems';


@Component({
    selector: 'page-attention',
    templateUrl: 'attention.html'
})
export class AttentionPage {
    attentionBeans: AttentionBean[] = [
        new AttentionBean('导师', 'assets/img/home/u122.png', 6, AdvisorListPage),
        new AttentionBean('隐秘', 'assets/img/home/u120.png', 13, AttentionProblemsPage),
        new AttentionBean('添加', 'assets/img/add-menu.png', -1, '')
    ];
    constructor(public navCtrl: NavController) {

    }

    gotoPage(page) {
        this.navCtrl.push(page, { isAttention: true });
    }

}

export class AttentionBean {

    constructor(public name: string, public img: string, public count: number, public page: any) {
    }
}