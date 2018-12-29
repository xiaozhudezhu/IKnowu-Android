import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ToastController } from 'ionic-angular';
import { Transfer } from 'ionic-native';

@Injectable()
export class HttpService {

    constructor(private toastCtrl: ToastController,private http: Http) {
    }

    public get(url: string, paramObj: any) {
        return this.http.get(url + this.toQueryString(paramObj))
            .toPromise()
            .then(res => this.handleSuccess(res))
            .catch(error => this.handleError(error));
    }

    public postBody(url: string, paramObj: any) {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.post(url, this.toBodyString(paramObj), new RequestOptions({ headers: headers }))
            .toPromise()
            .then(res => this.handleSuccess(res))
            .catch(error => this.handleError(error));
    }

    public post(url: string, paramObj: any) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        return this.http.post(url, this.toQueryString(paramObj), new RequestOptions({ headers: headers }))
            .toPromise()
            .then(res => this.handleSuccess(res))
            .catch(error => this.handleError(error));
    }

    private handleSuccess(result) {
        if (result && result.status && result.status == 200) {
            //由于和后台约定好,所有请求均返回一个包含success,msg,data三个属性的对象,所以这里可以这样处理
            let data = result.json();
            if (data.status && data.status && data.status == 'success') { 
                if (data.rows) {
                    return data.rows;
                }
                else if (data.data && typeof (data.data.data) !== "undefined" && data.data.data !== null && data.data.data !== "") {
                    return data.data.data;
                }
                else if (typeof (data.data) !== "undefined" && data.data !== null && data.data !== "") {
                    return data.data;
                }
                else {
                    return data;
                }
                
            } else {
                this.presentToast(data.msg);
                return null;
            }
        } else {
            console.log(result);
            //TODO 这里使用ToastController
            this.presentToast('无法连接服务器，请检查网络');
            return null;
        }
    }

    private handleError(error: Response | any) {
        let msg = '请求失败';
        if (error.status == 0) {
            msg = '请求地址错误';
            this.presentToast(msg);
        }
        if (error.status == 400) {
            msg = '请求无效';
            this.presentToast(msg+'请检查参数类型是否匹配');
        }
        if (error.status == 404) {
            msg = '请求资源不存在';
            this.presentToast(msg + '，请检查路径是否正确');
        }
        console.log(error);
        //TODO 这里使用ToastController
    
        return { success: false, msg: msg };
    }
 
    /**
     * @param obj　参数对象
     * @return {string}　参数字符串
     * @example
     *  声明: var obj= {'name':'小军',age:23};
     *  调用: toQueryString(obj);
     *  返回: "?name=%E5%B0%8F%E5%86%9B&age=23"
     */
    private toQueryString(obj) {
        let ret = [];
        for (let key in obj) {
            key = encodeURIComponent(key);
            let values = obj[key];
            if (values && values.constructor == Array) {//数组
                let queryValues = [];
                for (let i = 0, len = values.length, value; i < len; i++) {
                    value = values[i];
                    queryValues.push(this.toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            } else { //字符串
                ret.push(this.toQueryPair(key, values));
            }
        }
        return '?' + ret.join('&');
    }

    /**
     *
     * @param obj
     * @return {string}
     *  声明: var obj= {'name':'小军',age:23};
     *  调用: toQueryString(obj);
     *  返回: "name=%E5%B0%8F%E5%86%9B&age=23"
     */
    private toBodyString(obj) {
        let ret = [];
        for (let key in obj) {
            key = encodeURIComponent(key);
            let values = obj[key];
            if (values && values.constructor == Array) {//数组
                let queryValues = [];
                for (let i = 0, len = values.length, value; i < len; i++) {
                    value = values[i];
                    queryValues.push(this.toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            } else { //字符串
                ret.push(this.toQueryPair(key, values));
            }
        }
        return ret.join('&');
    }

    private toQueryPair(key, value) {
        if (typeof value == 'undefined') {
            return key;
        }
        return key + '=' + encodeURIComponent(value === null ? '' : String(value));
    }

    presentToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 300,
            position: 'middle'
        });
        toast.present();
    }

    /**
     * 上传文件
     * @param filePath 本地文件路径
     * @param url 服务器网络地址
     * @param param 携带参数 eg:'{filekey:'file',……,headers:{}}'
     * @param listener 进度条回调函数
     */
    public uploadFile(filePath: string, url: string, param: any, listener: (event: ProgressEvent) => any) {
        // 增加headers头部信息
        const fileTransfer = new Transfer(); //新建传输对象
        fileTransfer.onProgress(listener);
        return fileTransfer.upload(filePath, url, param,true)
            .then((data) => {
                //this.handleUploadResult(data);
                return data;
            }, (error) => {
                return error;
            }).catch((error) => { return error});
    }

    public handleUploadResult(data:any) {
        if (data != null && data.responseCode == 200) {
            return data.response;
        } else {
            return null;
        }
    }

    /**
     * 下载文件
     * @param url 服务器地址
     * @param filePath 本地路径
     * @param param 下载所携带请求参数
     * @param listener 进度条回调函数
     */
    public downloadFile(url: string, filePath: string,listener: any) {
        let param = { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'  }};
        const fileTransfer = new Transfer(); //新建传输对象
        fileTransfer.onProgress(listener);
        return fileTransfer.download(url, filePath, true, param)
            .then((data) => {
                return data;
            }, (error) => {
                return error;
            }
            ).catch(error => this.handleError(error));
    }

}