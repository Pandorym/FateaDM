# 非官方的斐斐打码 SDK
Unofficial SDK for FateaDM. for CAPTCHA Recognition, require payment. 🦊

## Install
```
> npm i fateadm
```

## Example
```
let pd_id = 'XXXXXX';
let pd_key = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

let fateaDM = new FateaDM(pd_id, pd_key);

let base64_IMG = '****...****';
let result = await fateaDM.recognize(base64_IMG, '30400');

console.log(result.Result); // 'ab2e'

if (IS_NOT_CORRECT)
    result.reportError()

```

## Precondition
需要自行前往斐斐打码的官方网站（[http://www.fateadm.com]()）注册帐号，获取 `pd_id` 和 `pd_key`。

## API
### `Class FateaFM`
#### `constructor(pdId:string, pdKey:string)`
* `pdId` 和 `pdKey` 可在[官网](http://www.fateadm.com)中的用户中心查看。

#### `recognize(img: string, type: string, flag?: string): Promise<FateaResult>`
> 识别图像。

* `img` base64编码的图片数据，允许忽略编码头部（e.g. `data:image/png;base64,`）。
* `type` 识别结果的类型，查看 [类型说明
](http://docs.fateadm.com/web/#/1?page_id=36)。
* `flag` 用于区分同一识别结果类型下的不同子类型。
* `Promise<FateaResult>` [`FateaResult`](#class-fatearesult)。

#### `refund(request_id: string): Promise<void>`
> [`FateaFM.reportError()`](#reporterrorrequest_id-string-promisevoid) 的别名。

#### `reportError(request_id: string): Promise<void>`
> 发起退款请求。

* `request_id` 即 [`FateaResult.ResultId`](#resultid-string)。

#### `balance(): Promise<number>`
> 查询剩余可用积分。

* `Promise<number>` 剩余可用的积分。

#### `topUp(cardId: string, cardKey: string): Promise<void>`
> 使用充值卡充值积分。

* `cardId` 充值卡 Id。
* `cardKey` 充值卡 Key。

---
### Class FateaResult
由 [`Fatea.recognize()`](#recognizeimg-string-type-string-flag-string-promisefatearesult) 返回。

#### Result: string
> 识别的结果。

#### ResultId: string
> 识别请求对应的 Id，用于退款请求。

#### reportError(): Promise\<void\>
> 发起退款请求（当识别结果错误时调用）。
