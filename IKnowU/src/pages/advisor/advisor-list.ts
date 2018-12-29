import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { AdvisorService } from '../advisor/advisor-service';

@Component({
    selector: 'advisor-list-page',
    templateUrl: 'advisor-list.html',
    providers: [ AdvisorService ]
})
export class AdvisorListPage {
    @ViewChild('searchbar') searchbarElement;
    @Input('isComponent') isComponent: boolean = false;
    isAttention: boolean = false;
    searchContent: string = '';
    mcatalog: string = 'new';
    advisorList: AdvisorBean[] = [
        //new AdvisorBean('luke', '水月', '一个牛逼的导师', ['心理辅导', '情绪分析'], 5.0, 20, '2017:07:19 11:40', false),
        //new AdvisorBean('luke', '牧师', '成功靠自强不息', ['心理辅导', '情绪分析'], 3.0, 31, '2017:07:19 11:40', true),
        //new AdvisorBean('luke', '天行健', '简单才是快乐', ['心理辅导', '情绪分析'], 2.3, 15, '2017:07:19 11:40', true),
        //new AdvisorBean('luke', '卢卡斯', '给年轻人的信', ['心理辅导', '情绪分析'], 3.6, 12, '2017:07:19 11:40', true),
        //new AdvisorBean('luke', '天行者', '修养是如何养成的', ['心理辅导', '情绪分析'], 4.9, 11, '2017:07:19 11:40', true),
        //new AdvisorBean('luke', '卢健', '天才需要修行', ['心理辅导', '情绪分析'], 4.7, 28, '2017:07:19 11:40', true),
        //new AdvisorBean('luke', '大V', '天才需要修行', ['心理辅导', '情绪分析'], 4.7, 28, '2017:07:19 11:40', true)
    ];
    constructor(public navCtrl: NavController, private navParams: NavParams, public loadCtrl: LoadingController, public advisorService: AdvisorService) {
        this.isAttention = navParams.get('isAttention') || false;
        this.searchContent = navParams.get('searchContent') || '';
        this.search();
    }

    ionViewLoaded() {
        setTimeout(() => {
            this.searchbarElement.setFocus();
        }, 150);
    }

    search() {
        let loading = this.loadCtrl.create({
            content: "loading...",//loading框显示的内容
            showBackdrop: false //是否显示遮罩层
        });
        loading.present();
        let param = { mastername: this.searchContent, newTecher: null, popTecher: null };
        if (this.mcatalog == 'new')
            param.newTecher = '1';
        else
            param.popTecher = '1';
        this.advisorService.search(param)
            .then(res => {
                loading.dismissAll();
                console.log(res);
                this.advisorList = res;
            }).catch(error => {
                console.log(error);
                loading.dismissAll();
            });
    }

    startSearch() {
        this.navCtrl.push(SearchPage);
    }

    showDetail(advisor: AdvisorBean) {
        console.log(advisor);
    }

    follow(advisor: AdvisorBean) {
        advisor.isFollow = true;
    }

    cancelFollow(advisor: AdvisorBean) {
        advisor.isFollow = false;
    }

}

export class AdvisorBean {
    constructor(public tid: string, public mastername: string, public fields: string, public professions: string[],
         public level: string, public monthCount: number, public lastTime: string, public isFollow: boolean) {
    }
}
