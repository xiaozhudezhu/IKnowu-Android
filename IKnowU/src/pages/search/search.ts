import { Component } from '@angular/core';
import { ModalController, ToastController, Platform, App, NavController, LoadingController, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AdvisorListPage } from '../advisor/advisor-list';
import { Constants } from '../../util/Constants';
@Component({
    selector: 'search-page',
    templateUrl: 'search.html'
})

export class SearchPage {
    searchContent: string = '';
    searchCatalogs: SearchCatalogBean[] = [
        new SearchCatalogBean('所有', 'all', true),
        new SearchCatalogBean('导师', 'CATA1', false),
        new SearchCatalogBean('情感', 'CATA2', false),
        new SearchCatalogBean('婚恋', 'CATA3', false),
        new SearchCatalogBean('健康', 'CATA4', false),
        new SearchCatalogBean('社交', 'CATA5', false)
    ];
    searchHistories: SearchHistoryBean[] = [
        new SearchHistoryBean('附近的三甲医院'),
        new SearchHistoryBean('评价最好的导师'),
        new SearchHistoryBean('情绪低落怎么办')
    ];
    searchHotKeys: SearchHotKeyBean[] = [
        new SearchHotKeyBean('买房署名'),
        new SearchHotKeyBean('情感困惑'),
        new SearchHotKeyBean('整容'),
        new SearchHotKeyBean('家暴'),
        new SearchHotKeyBean('找老婆'),
        new SearchHotKeyBean('不自信')
    ];
    constructor(public modalCtrl: ModalController, private toastCtrl: ToastController, private platform: Platform, private app: App, public navCtrl: NavController,
        public loadCtrl: LoadingController, public viewCtrl: ViewController) {
    }

    search() {
        this.navCtrl.push(AdvisorListPage, { searchContent: this.searchContent }).then(() => {
            const index = this.viewCtrl.index;
            this.navCtrl.remove(index - 1, 2); //this will remove page3 and page2
        });
    }

    clearSearchHistory() {
        this.searchHistories = [];
    }

}

export class SearchCatalogBean {
    constructor(public name: string, public code: string, public isSelected: boolean) {
    }
}

export class SearchHotKeyBean {
    constructor(public name: string) {
    }
}

export class SearchHistoryBean {
    constructor(public name: string) {
    }
}
