import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

declare var BMap, BMAP_ANCHOR_BOTTOM_RIGHT, BMAP_ANCHOR_TOP_LEFT, BMAP_ANCHOR_TOP_RIGHT, BMap_Symbol_SHAPE_FORWARD_CLOSED_ARROW;
@Component({
    selector: 'map-page',
    templateUrl: 'map.html'
})

export class MapPage {
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    constructor(
        private navCtrl: NavController,
        private platform: Platform
    ) {
    }

    ionViewWillEnter() {
        let map = this.map = new BMap.Map(this.mapElement.nativeElement, { enableMapClick: true });//创建地图实例
        map.enableScrollWheelZoom();//启动滚轮放大缩小，默认禁用
        map.enableContinuousZoom();//连续缩放效果，默认禁用
        let point = new BMap.Point(113.631732, 34.753459);//坐标可以通过百度地图坐标拾取器获取
        map.centerAndZoom(point, 5);//设置中心和地图显示级别
        //插入百度的一些控件，展示在地图中

        //地图放大缩小控件
        let sizeMap = new BMap.Size(10, 80);//显示位置
        map.addControl(new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,//显示方向
            offset: sizeMap
        }));

        //3D效果矢量图控件
        let size3D = new BMap.Size(10, 10);
        map.addControl(new BMap.MapTypeControl({
            anchor: BMAP_ANCHOR_TOP_RIGHT,
            offset: size3D
        }));
        map.setCurrentCity("上海");//3D效果需要设置城市

        //城市列表控件
        let sizeCity = new BMap.Size(10, 10);
        map.addControl(new BMap.CityListControl({
            anchor: BMAP_ANCHOR_TOP_LEFT,
            offset: sizeCity
        }));

        let geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition((position) => {
            //0代表调用成功，具体状态可见百度地图api
            if (geolocation.getStatus() == 0) {
                //经度
                let longitude = position.longitude;
                //纬度
                let latitude = position.latitude;
                let pPoint = new BMap.Point(longitude, latitude);
                let heading = 0;
                if (position.heading != null && position.heading != '') {
                    heading = position.heading;
                }
                let icon = new BMap.Symbol(BMap_Symbol_SHAPE_FORWARD_CLOSED_ARROW, {
                    scale: 2,
                    strokeWeight: 1,
                    rotation: heading,//顺时针旋转30度
                    fillColor: '#1794f6',
                    fillOpacity: 0.8
                });

            } else {
                console.log(position);
            }
        });

        function showAttractionControl() {
            //定义显示位置
            this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
            this.defaultOffset = new BMap.Size(10, 50);
        }
    }


}
