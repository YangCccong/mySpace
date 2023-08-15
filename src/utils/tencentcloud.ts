import * as tencentcloud from "tencentcloud-sdk-nodejs"
import { ClientConfig } from "tencentcloud-sdk-nodejs/tencentcloud/common/interface"

const FtClient = tencentcloud.ft.v20200304.Client

const clientConfig: ClientConfig = {
    // 腾讯云认证信息
    // 为了保护密钥安全，建议将密钥设置在环境变量中或者配置文件中，请参考本文凭证管理章节。
    // 硬编码密钥到代码中有可能随代码泄露而暴露，有安全隐患，并不推荐。
    credential: {
        secretId: 'AKIDLXWHn5A8sRmuAD7uWw97xc5LOOErHXcU',
        //   secretId: process.env.TENCENTCLOUD_SECRET_ID,
        secretKey: 'jFZeUChy0oW1JOI0VnskPr68wWs5rTwn',
        //   secretKey: process.env.TENCENTCLOUD_SECRET_KEY,
    },
    // 产品地域
    region: "ap-beijing",
    // 可选配置实例
    profile: {
        //   signMethod: "HmacSHA256", // 签名方法
        httpProfile: {
            reqMethod: "POST", // 请求方法
            endpoint: "ft.tencentcloudapi.com",
            reqTimeout: 30, // 请求超时时间，默认60s
        },
    },
}
// 实例化要请求产品(以cvm为例)的client对象
export const client = new FtClient(clientConfig)


