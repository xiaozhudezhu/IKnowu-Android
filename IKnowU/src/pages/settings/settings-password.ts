import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { Constants } from '../../util/Constants';
import { SettingsPatternLockPage } from '../settings/settings-patternlock';


@Component({
    selector: 'page-settings-password',
    templateUrl: 'settings-password.html'
})
export class SettingsPasswordPage {
    oldPassword: string = '';
    newPassword: string = '';
    confirmPassword: string = '';
    isPatternLockEnabled: boolean;
    isFirstTimeChange: boolean = false;
    constructor(public navCtrl: NavController, public loadCtrl: LoadingController, private toastCtrl: ToastController) {
        this.isPatternLockEnabled = Constants.isPatternLockEnabled;
        if (this.isPatternLockEnabled)
            this.isFirstTimeChange = true;
    }

    updatePatternLock() {
        this.navCtrl.push(SettingsPatternLockPage);
    }

    updateIsPatternLock() {
        //this.isPatternLockEnabled = !this.isPatternLockEnabled;
        if (this.isFirstTimeChange) {
            this.isFirstTimeChange = false;
            return;
        }
        Constants.isPatternLockEnabled = this.isPatternLockEnabled;
        if (this.isPatternLockEnabled) {
            this.updatePatternLock();
        }
    }

    updatePassword() {
        if (!this.oldPassword)
            this.presentToast('请输入正确的旧密码！');
        else if (!this.newPassword)
            this.presentToast('请输入新密码！');
        else if (!this.confirmPassword)
            this.presentToast('请输入确认密码！');
        else if (this.newPassword != this.confirmPassword)
            this.presentToast('确认密码必须和新密码保持一致！');
        else {
            let loading = this.loadCtrl.create({
                content: "正在提交..",//loading框显示的内容
                dismissOnPageChange: false, // 是否在切换页面之后关闭loading框
                showBackdrop: false //是否显示遮罩层
            });
            loading.present();// 弹出load框
            setTimeout(() => {
                loading.dismiss();
                this.updatePasswordSuccess();
            }, 1000);
        }
    }

    updatePasswordSuccess() {
        this.presentToast('密码修改成功');
        this.navCtrl.pop();
    }

    presentToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'middle'
        });
        toast.present();
    }

}
