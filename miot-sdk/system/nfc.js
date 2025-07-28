/**
 * @export public
 * @doc_name nfc
 * @doc_index 14
 * @doc_directory system
 * @module miot/system
 * @description
 * NFC相关
 *
 * @example
 * import {System} from "miot"
 * ...
 * System.nfc.getNfcStatus().then(res => {//return result})
 * ...
 */
import native, { isAndroid } from "../native";
/**
 * NFC
 * @interface
 *
 */
class INfc {
  /**
   * 获取NFC的状态信息
   * since 10051
   * @returns {Promise<json>} 成功时返回：{code:0,data:{status:xxx}}，
   * status可能得取值:
   *  forAndroid： -1（手机不支持NFC）
   *               0（NFC关闭）
   *               1（NFC已打开）
   *
   *  foriOS：  -1  （米家app仅对iPhoneXS 及以上的机型支持NFC读写服务，并可以被远程开启和关闭。当其中一项不成立时，返回-1 代表米家NFC功能不可用）
   *            101   米家nfc读写可用，经测试发现，在手机设置关闭了nfc开关了之后，CoreNFC框架api返回的仍然是可用状态，所以，在iOS平台上，nfc为101并不代表nfc处于开启状态
   *            100   理论上不会出现此情况，如果出现，可以提工单咨询。
   *  iOS 目前无法准确的得到手机设置中的nfc开关的具体值，如果开发者有更好的方案，可以提工单交流。
   * 失败时：{code:-1,message:'internal error'}
   * @example
   * System.nfc.getNfcInfo()
   */
  @report
  getNfcInfo() {
     return Promise.resolve([]);
  }
  /**
   * 写入NFC数据 注意：调用该接口之前最好先调用getNfcInfo接口判断下NFC是否可用
   * @since 10072
   * @param {jsonObject} params 传递的jsonObject对象参数
   * @example
   * let params={
   *  extraString: xx   //写入的字符串内容
   * }
   * System.nfc.writeNFCData(params)
   *  * @returns {Promise}
   * 成功时，返回：
   * { code: 0, data: true }
   * 失败时，返回：(根据两端的nfc接口透传错误信息)
   * { code: xx, message: 'xx' }
   */
     @report
  writeNFCData(params) {
     return Promise.resolve(null);
  }
     /**
   * 判断miui是否支持投屏
   * @param param{Object} 预留
   * @returns {Promise}
   * 这个方法不会走reject，resolve中直接返回true/false表示支持与否, iOS恒返回false
   */
     isMiConnectSupportNFC(param = undefined) {
       return new Promise((resolve) => {
         if (isAndroid) {
           native.MIOTSystem.isMiConnectSupportNFC(param, (ok, res) => {
             resolve(res);
           });
         } else {
           resolve(false);
         }
       });
     }
}
const NfcInstance = new INfc();
export default NfcInstance;