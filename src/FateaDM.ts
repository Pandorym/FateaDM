/*
 * ©2019 Pandorym. All Rights Reserved.
 */

import *as md5 from 'md5';
import axios from 'axios';

export class FateaDM {

    static readonly _ = axios.create({
        baseURL: 'http://pred.fateadm.com/api/',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    });

    readonly appId: string = '315036';
    readonly appKey: string = 'SQ7SUIJlo8XgILtQRyx2vzweJhOH6UAo';
    readonly pdId: string;
    readonly pdKey: string;

    private static get timestamp() {
        return Math.floor(Date.now() / 1000).toString();
    }

    private sign(timestamp: string) {
        return md5(this.pdId + timestamp + md5(timestamp + this.pdKey));
    }

    private asign(timestamp: string) {
        return md5(this.appId + timestamp + md5(timestamp + this.appKey));
    }

    constructor(pdId: string,
                pdKey: string,
                appId: string = '315036',
                appKey: string = 'SQ7SUIJlo8XgILtQRyx2vzweJhOH6UAo') {
        this.pdId = pdId;
        this.pdKey = pdKey;
        this.appId = appId;
        this.appKey = appKey;
    }

    public recognize(img: string, type: string, flag?: string): Promise<{ RequestId: string, Result: string }> {

        if (typeof img === 'string' && img.startsWith('data:image')) {
            img = img.split(',').pop();
        }

        let timestamp = FateaDM.timestamp;

        return FateaDM
            ._.post('capreg', {}, {
                params: {
                    user_id: this.pdId,
                    timestamp: timestamp,
                    sign: this.sign(timestamp),
                    app_id: this.appId,
                    asign: this.asign(timestamp),
                    predict_type: type,
                    src_url: flag,
                    img_data: img,
                },
            })
            .then((res) => {
                if (res.status !== 200) return Promise.reject('network error.');
                if (res.data.RetCode !== '0') return Promise.reject(res.data.ErrMsg);

                return {
                    RequestId: res.data.RequestId,
                    Result: JSON.parse(res.data.RspData).result,
                };
            });
    }

    public refund(request_id: string): Promise<void> {
        return this.reportError(request_id)
    }

    public reportError(request_id: string): Promise<void> {
        let timestamp = FateaDM.timestamp;
        return FateaDM
            ._.post('capjust', {}, {
                params: {
                    user_id: this.pdId,
                    timestamp: timestamp,
                    sign: this.sign(timestamp),
                    request_id,
                },
            })
            .then((res) => {
                if (res.status !== 200) return Promise.reject('network error.');

                if (res.data.RetCode === '0') return;

                return Promise.reject(res.data.ErrMsg);
            });
    }

    public balance(): Promise<number> {
        let timestamp = FateaDM.timestamp;
        return FateaDM
            ._.post('custval', {}, {
                params: {
                    user_id: this.pdId,
                    timestamp: timestamp,
                    sign: this.sign(timestamp),
                },
            })
            .then((res) => {
                if (res.status !== 200) return Promise.reject('network error.');

                if (res.data.RetCode === '0') return JSON.parse(res.data.RspData).cust_val;

                return Promise.reject(res.data.ErrMsg);
            });
    }
}