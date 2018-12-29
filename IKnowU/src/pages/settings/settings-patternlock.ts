import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { Constants } from '../../util/Constants';

declare var PatternLock: any;
@Component({
    selector: 'page-settings-patternlock',
    templateUrl: 'settings-patternlock.html'
})
export class SettingsPatternLockPage {
    isPatternLockEnabled: boolean;
    lockPattern: string;
    constructor(public navCtrl: NavController, public loadCtrl: LoadingController, private toastCtrl: ToastController) {
        this.isPatternLockEnabled = Constants.isPatternLockEnabled;
        console.log(this.isPatternLockEnabled);
    }

    ionViewDidLoad() {
        let $this = this;
        let lock = new PatternLock('#patternContainerSetting', {
            onDraw: function (pattern) {
                $this.lockPattern = pattern;
            }
        });
    }

    updateIsPatternLock() {
        this.isPatternLockEnabled = !this.isPatternLockEnabled;
        Constants.isPatternLockEnabled = this.isPatternLockEnabled;
        if (this.isPatternLockEnabled) {

        }
    }

    updatePatternLock() {
        Constants.lockPattern = this.lockPattern;
        let loading = this.loadCtrl.create({
            content: "正在提交..",//loading框显示的内容
            dismissOnPageChange: false, // 是否在切换页面之后关闭loading框
            showBackdrop: false //是否显示遮罩层
        });
        loading.present();// 弹出load框
        setTimeout(() => {
            loading.dismiss();
            this.updatePatternLockSuccess();
        }, 1000);
    }

    updatePatternLockSuccess() {
        this.presentToast('手势密码修改成功');
        this.navCtrl.pop();
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
