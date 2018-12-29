import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

import { AdvisorListPage, AdvisorBean } from '../advisor/advisor-list';
import { OrderService } from '../order/order-service';
import { Constants } from '../../util/Constants';

@Component({
    selector: 'order-page',
    templateUrl: 'order.html',
    providers: [ OrderService ]
})
export class OrderPage {
    order: OrderBean = new OrderBean('', '', '', 10, 0, '', '', '', '', [], [], [], []);
    problemTypeList: string[] = ['智能合约', 'ios', 'android', '数据库'];
    areaList: string[] = [
        '华东区', '华南区', '华北区', '西部'
    ];
    constructor(public navCtrl: NavController, public loadCtrl: LoadingController, private toastCtrl: ToastController, private orderService: OrderService) {

    }

    selectAdvisor() {
        this.navCtrl.push(AdvisorListPage);
    }

    submit() {
        let loading = this.loadCtrl.create({
            content: "正在提交..",//loading框显示的内容
            dismissOnPageChange: false, // 是否在切换页面之后关闭loading框
            showBackdrop: false //是否显示遮罩层
        });
        loading.present();// 弹出load框
        this.order.createUser = Constants.currentUser.id;
        this.orderService.create(this.order)
            .then(res => {
                loading.dismissAll();
                console.log(res);
                this.submitSuccess();
            }).catch(error => {
                console.log(error);
                loading.dismissAll();
            });
    }

    submitSuccess() {
        this.presentToast('提交成功');
        //this.navCtrl.pop();
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

export class OrderBean {
    constructor(public id: string, public issueContent: string, public type: string, public price: number,
        public createUser: number, public createUserName: string, public master: string, public date: string, public state: string,
        public advisorExcludeList: AdvisorBean[], public advisorList: AdvisorBean[], public areaList: string[], public areaExcludeList: string[]) {

    }
}
