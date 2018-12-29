import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-attention-problems',
    templateUrl: 'attention-problems.html'
})
export class AttentionProblemsPage {
    pcatalog: string = 'catalog0';
    problemCatalogs: ProblemAttentionCatalogBean[] = [
        new ProblemAttentionCatalogBean('情感类', 4, [
            new ProblemAttentionItemBean('luke', '15:01', '对方不肯花钱', '水月', '11:30', '未接单', true),
            new ProblemAttentionItemBean('luke', '13:01', '不愿意给彩礼', '牧师', '11:30', '已解决', true),
            new ProblemAttentionItemBean('luke', '12:01', '对方不肯花钱', '水月', '11:30', '已解决', true),
            new ProblemAttentionItemBean('luke', '11:01', '对方不肯花钱', '水月', '11:30', '已解决', true)
        ]),
        new ProblemAttentionCatalogBean('婚恋类', 3, [
            new ProblemAttentionItemBean('luke', '13:01', '不愿意给彩礼', '牧师', '11:30', '已解决', true),
            new ProblemAttentionItemBean('luke', '12:01', '对方不肯花钱', '水月', '11:30', '已解决', true),
            new ProblemAttentionItemBean('luke', '11:01', '对方不肯花钱', '水月', '11:30', '已解决', true)
        ]),
        new ProblemAttentionCatalogBean('健康类', 2, [
            new ProblemAttentionItemBean('luke', '12:01', '对方不肯花钱', '水月', '11:30', '已解决', true),
            new ProblemAttentionItemBean('luke', '11:01', '对方不肯花钱', '水月', '11:30', '已解决', true)
        ]),
        new ProblemAttentionCatalogBean('社交类', 4, [
            new ProblemAttentionItemBean('luke', '15:01', '对方不肯花钱', '水月', '11:30', '未接单', true),
            new ProblemAttentionItemBean('luke', '13:01', '不愿意给彩礼', '牧师', '11:30', '已解决', true),
            new ProblemAttentionItemBean('luke', '12:01', '对方不肯花钱', '水月', '11:30', '已解决', true),
            new ProblemAttentionItemBean('luke', '11:01', '对方不肯花钱', '水月', '11:30', '已解决', true)
        ])
    ];
    constructor(public navCtrl: NavController) {

    }

    showDetail(item: ProblemAttentionItemBean) {
        console.log(item);
    }

    follow(item: ProblemAttentionItemBean) {
        item.isFollow = true;
    }

    cancelFollow(advisor: ProblemAttentionItemBean) {
        advisor.isFollow = false;
    }

    addAttention() {

    }

}

export class ProblemAttentionItemBean {
    constructor(public createUser: string, public createTime: string, public content: string,
        public resolveUser: string, public resolveTime: string, public status: string, public isFollow: boolean) {
    }
}

export class ProblemAttentionCatalogBean {
    constructor(public name: string, public count: number,
        public itemList: ProblemAttentionItemBean[]) {
    }
}