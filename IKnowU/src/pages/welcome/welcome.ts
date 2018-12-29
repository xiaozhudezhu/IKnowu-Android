import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';


@Component({
    templateUrl: 'welcome.html'
})
export class WelcomePage {
    slides = [
        {
            title: "欢迎使用我懂你APP",
            description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
            image: "assets/img/ica-slidebox-img-1.png",
        },
        {
            title: "放飞沉寂多年的秘密",
            description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
            image: "assets/img/ica-slidebox-img-2.png",
        },
        {
            title: "聆听心底最深处的声音",
            description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
            image: "assets/img/ica-slidebox-img-3.png",
        }
    ];

    constructor(public navCtrl: NavController) {

    }

    start() {
        this.navCtrl.push(LoginPage);
    }
}
