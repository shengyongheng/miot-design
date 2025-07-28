/**
 * @export public
 * @doc_name 原生模块
 * @doc_index 1
 * @doc_directory host
 * @module miot/Host
 * @description
 * 扩展程序运行时的宿主环境
 * 所有由宿主APP直接提供给扩展程序的接口均列在这里. 主要包括原生业务页面、本地数据访问、系统提供的能力等
 * 系统的能力主要包括：
 * 音频(audio.js)
 * 文件存储(file.js)
 * 本地KV存储(storage.js)
 * 编解码(crypto.js)
 * 系统基本信息(locale.js)
 * 米家APP提供的能力主要包括：
 * 米家APP提供的UI能力(ui.js)
 *
 * @example
 *
 *  import {Host} from 'miot'
 *
 *  Host.type // ios/ android/ tv
 *  Host.isIOS
 *  Host.isAndroid
 *
 *  Host.version
 *  Host.apiLevel
 *  Host.isDebug
 *
 *
 *  Host.ui.openDeviceListPage()
 *  Host.ui.openShopPage(100)
 *
 *  Host.locale.language
 *  Host.locale.timezone
 *  Host.locale.currentTimeMillis.then(time=>{})
 *  Host.locale.getCurrentCountry().then(country=>{})
 *  Host.locale.getPlaceMark().then(place=>{})
 *  Host.locale.getGPS().then(gps=>{})
 *
 *
 *  Host.file.readFile(path).then(file=>{})
 *  Host.file.writeFile(path, file).then(ok=>{})
 *
 *  Host.storage.get(key)
 *  Host.storage.set(key, value)
 *
 */
import HostAudio from './host/audio';
import HostCrypto from './host/crypto';
import HostFile from './host/file';
import HostLocale from './host/locale';
import HostStorage from './host/storage';
import HostMiTvInstance from './host/mitv';
// import HostUI from './host/ui';
 const IOS="ios", ANDROID="android";
import { Buffer } from "buffer";
import merge from "merge";
import { Platform } from 'react-native';
import Storage from "./service/storage";
const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');
export const HOST_TYPE_IOS = IOS;
export const HOST_TYPE_ANDROID = ANDROID;
export const LocationAuthStatus = {
  LocationAuthStatus_NotDetermined: 0,
  LocationAuthStatus_Restricted: 1,
  LocationAuthStatus_Denied: 2,
  LocationAuthStatus_AuthorizedAlways: 3,
  LocationAuthStatus_AuthorizedWhenInUse: 4,
  LocationAuthStatus_Authorized: 5
};
Object.freeze(LocationAuthStatus);
export default {
  /**
     * @const
     * @type {string}
     * @description 返回本地环境的类型, ios|android
     *
     *
     */
  get type() {
     return  "..."
  },
  /**
     * @const
     * @type {object}
     * @description 系统信息。包含sysVersion，mobileModel，hostApiLevel，isXiaomiPhone(红米手机不算)，以及miuiVersion（非MIUI系统不会有这个值）
     */
  get systemInfo() {
     return  {}
  },
  /**
     * @const
     * @type {boolean}
     * @description 判断是否是 android
     */
  get isAndroid() {
     return  false
  },
  /**
     * @const
     * @type {boolean}
     * @description 判断是否 iOS，和上面那个方法二选一即可
     */
  get isIOS() {
     return  false
  },
  /**
   * @const
   * @type {boolean}
   * @description 判断是否 Pad大屏设备
   */
  get isPad() {
     return  false
  },
  /**
   * @deprecated  此接口sdk 10090版本废弃，从10090(包括10090)开始请使用Package.entryInfo.mobileType进行判断，默认为'phone',车机端确保有值且为'car',手机端不一定有值
   * @const
   * @type {String}
   * @description 设备类型，用在车机插件上，米家app的插件开发者无需关心
   * 在米家app上返回值为 'phone'，车机框架上返回值为 'car'
   * @return { ('phone'|'car') }
   */
  get mobileType() {
     return  "..."
      console.warn("mobileType deprecated 此接口sdk 10090版本废弃，从10090(包括10090)开始请使用Package.entryInfo.mobileType进行判断，默认为'phone',车机端确保有值且为'car',手机端不一定有值");
    }
    if (isIOS) {
      return 'phone';
    }
    return native.MIOTHost.mobileType;
  },
  /**
     * @const
     * @type {number}
     * @since  10081  获取iphone手机顶部状态栏距离
     * @description 判断是否 iOS 手机状态栏的高度
     *                Android 请使用 RN 官方api import {StatusBar} from 'react-native';  StatusBar.currentHeight;
     *                iPad上，无论是否是刘海屏或者灵动岛屏幕，都返回20
     *                iPhone上，非刘海屏返回20，刘海屏返回44，灵动岛屏幕返回59
     *                需要注意的是，该方法仅能获取状态栏高度，需要和导航栏高度概念区别开
     *                正确的导航栏高度需要 在该api的值的基础上偏移指定距离（通常是44）
     */
  get iPhoneXSeriesTopAreaInsets() {
     return  0
  },
  /**
     * @const
     * @type {boolean}
     * @since  10044  目前已支持iPhone全系列
     * @description 判断是否 iOS 刘海屏  Android返回false
     */
  get isIphoneXSeries() {
     return  false
      return native.MIOTHost.isIphoneXSeries;
    }
    return false;
  },
  /**
     * @const
     * @type string
     * @description APP 的版本, 例如"1.0.0"
     */
  get version() {
     return  ""
  },
  /**
     * @const
     * @type int
     * @description APP 的 apiLevel
     */
  get apiLevel() {
     return  0
  },
  /**
     * 判断是否是调试版本
     * @const
     * @type {boolean}
     * @readonly
     *
     */
  get isDebug() {
     return  true
  },
  /**
     * 是否是国际版APP 国内版1 国际版2 欧洲版3
     * @const
     * @type {int}
     * @readonly
     * @deprecated 10033
     */
  get applicationEdition() {
  },
  /**
     * 获取 米家APP中 我的-->开发者设置-->其他设置，  AppConfig接口拉取preview版数据 是否选中的状态
     * 1:表示选中, preview ； 0：表示未选中, release
     * 如果选中，Service.smarthome.getAppConfig 获取的数据为preview版数据， 反之为release版数据
     * @since 10024
     * @const
     * @type {int}
     * @readonly
     */
  get appConfigEnv() {
     return  true
  },
  /**
  * 获取Android 官方提供的打孔屏api提供的打孔屏高度。 ios手机一律返回0.
  *
  * @since 10042
  * @type {int}
  * @readonly
  */
  get displayCutoutTop() {
     return  0
  },
  /**
  * 获取设备物理尺寸信息，即物理设备的长宽信息，包含长宽属性 返回值中包含 width 和 height 在设备旋转后需要重新读取
  *
  * @since 10061
  * @type {object}
  */
  getPhysicsDimension() {
     return Promise.resolve(null);
  },
  /**
     * @const
     * @see {@link module:miot/host/ui}
     * @description 可调起的host业务页面
     *
     */
  get ui() {
    let ui = require('./host/ui').default;
    return ui;
  },
  /**
     * @const
     * @see {@link module:miot/host/locale}
     * @description host 的本地化设置, 包括语言,地区,城市等等
     */
  get locale() {
    return HostLocale;
  },
  /**
     * 本地数据存储服务模块
     * @const
     * @see {@link module:miot/host/storage}
     *
     */
  get storage() {
    return HostStorage;
  },
  /**
     * 本地文件服务模块
     * @const
     * @see {@link module:miot/host/file}
     */
  get file() {
    return HostFile;
  },
  /**
     * 音频 播放，录制，转码相关模块
     * @const
     * @see {@link module:miot/host/audio}
     */
  get audio() {
    return HostAudio;
  },
  /**
     * 加密解密模块
     * @const
     * @see {@link module:miot/host/crypto}
     */
  get crypto() {
    return HostCrypto;
  },
  /**
   * 获取小米电视模块
   * */
  get MiTv() {
    return HostMiTvInstance;
  },
  /**
     * 获取手机wifi信息;
     * 在Android上，从Android 9开始，获取WiFi信息需要申请定位权限，因此插件在调用该接口需要先判断是否有定位权限，没有就提示用户授权；否则就拿不到WiFi信息
     * @return {Promise<object>}
     * 成功时：{BSSID:xxx, SSID:xxx}
     * 失败时：返回的是错误信息，字符串格式
     * @example
     * Host.getWifiInfo()
     * .then(res => console.log("ssid and bssid = ", res.SSID, res.BSSID))
     * .catch((error)=>{
     *   console.log(error)
     * });
     */
  getWifiInfo() {
     return Promise.resolve(null);
  },
  /**
     * 获取APP名称
     * @return {Promise<string>}
     *
     */
  getAppName() {
     return Promise.resolve(null);
  },
  /**
     * 获取Android手机屏幕相关信息(包括状态栏高度)
     * @since 10012
     * @returns {Promise<object>} 手机屏幕相关信息 {'viewWidth':xxx, 'viewHeight':xxx, 'viewWidthPixel':xxx, 'viewHeightPixel':xxx}
     * viewWidth和viewHeight返回的都是dp值，若想使用px值还得使用PixelRatio.getPixelSizeForLayoutSize方法转化为px值
     * 但是在Pad小窗上时由于修改了scale值，所以转换出来的px值会偏小
     * 所以10056新增两个返回值viewWidthPixel和viewHeightPixel表示当前ReactView的宽高像素值，若想使用px值建议直接使用这两个值，不必再转换dp值
     */
  getPhoneScreenInfo() {
     return Promise.resolve(null);
  },
  /**
     * 获取当前登陆用户的服务器国家
     * @since 10010
     * @deprecated 10011 改用 Service.getServerName
     * @returns Promise<string> 返回国家编码，如:‘CN’
     */
  getCurrentCountry() {
     return Promise.resolve(null);
  },
  /**
     * 获取手机运营商信息
     * 返回值中：
     * name 运营商名称-与手机语言一致
     * simOperator 运营商 国家编码(三位)+网络编码 参考 https://en.wikipedia.org/wiki/Mobile_country_code
     * countryCode 运营商国家码，ISO 3166-1 country code
     * @since 10021
     * @returns {Promise} 运营商信息 {'1':{name:'',simOperator:'',,countryCode:''},'2':{...}}
     */
  getOperatorsInfo() {
     return Promise.resolve(null);
  },
  /**
     * jx执行器
     * @typedef IExecutor
     * @since 10002
     * @property {boolean} isReady  - 是否可用
     * @property {boolean} isRunning - 是否运行中
     * @property {*} execute(method, ...args) - 执行某个函数
     * @property {} remove() - 删除
     *
     */
  /**
     * 后台执行文件, 后台最多同时运行三个线程, 超过将销毁最早创建的 executor
     * @since 10002
     * @param {*} jx - 可执行的纯 js 文件, 不使用任何高级语法, 如要使用 es6, 请自行编译通过.
     * @param {json} initialProps - 用于脚本初始化的数据, 在jx文件中为 'initialProps' 对象，使用方法参考样例 或者sampleProject中 ‘com.xiaomi.demo/Main/tutorial/JSExecutor.js’
     * @returns {Promise<IExecutor>}
     * @example
     *
     * var myexecutor = null;
     * Host.createBackgroundExecutor(require('./test.jx'), {name1:"testName"})
     *      .then(executor=>{
     *          myexecutor = executor;
     *          executor.execute("myFunc", 1,2,'a')
     *                  .then(result=>{
     *                      console.log(result);
     *                  })
     *          //支持使用initialProps或者在jx中直接使用
     *          executor.execute("myFunc2", "initialProps.name1").then(res =>{...})
     *          //支持使用obj与arr
     *          executor.execute("SomeObject.myFunc3", {"name":"hello"}, ["a1","a2"]).then(res =>{...})
     * })
     * .then(err=>{...})
     * ....
     * myexecutor&&myexecutor.remove();
     */
  createBackgroundExecutor(jx, initialProps = {}) {
     return Promise.resolve({execute(method, ...args){}, remove(){}});
  },
  /**
     * android 手机是否有NFC功能
     * @deprecated 从10051开始废弃，可以使用System.nfc.getNfcInfo代替
     * @since 10021
     * @return {Promise<json>}  {hasNfc:true/false}
     * @example
     * Host.phoneHasNfcForAndroid().then((result)=>{
     *   console.log(result.hasNfc);
     * }))
     */
  phoneHasNfcForAndroid() {
     return Promise.resolve(null);
  },
  /**
     * android 连接指定ssid得wifi，要求该wifi之前已经连接过 使用此api不需要特别权限
     * @param   ssid 需要去掉字串两端的引号。在native层会自己增加""
     * @since 10036
     * @return {Promise<JSON>}
     * @example
     * Host.connectWifiWithSsid().then((result)=>{
     *   console.log(result);
     * }))
     */
  connectWifiWithSsid(ssid) {
     return Promise.resolve(null);
  },
  /**
   * @since 10037
   * @param type 0 for mobile  1 for wifi 2 for null
   * equal to android's bindProcessToNetwork
   */
  bindProcessToNetwork(type) {
     return Promise.resolve(null);
  },
  /**
     * 页面有输入框，需要打开软键盘，页面适配软键盘
     * @since 10027  (10050 后开始支持iOS)
     * @param {boolean} shouldAdapter
     *      Android: true: 表示进行适配,建议UI用ScrollView包裹起来，当输入框在屏幕的下半部分时，只会触发ScrollView滚动; false： 整个页面滚动, demo可参考SoftKeyboardAdapterTestDemo.js
     *      iOS :  true 表示进行适配，整个页面会跟随滑动，false: 表示不进行适配，整个页面不会跟随键盘滑动，默认true   (10050 后开始支持iOS)
     * @returns {Promise<boolean>} 设置成功返回true(iOS没有实现这个接口,直接返回true)
     */
  pageShouldAdapterSoftKeyboard(shouldAdapter) {
     return Promise.resolve(null);
  },
  /**
     * 检测Android系统位置服务(不同于权限)是否打开  only Android
     *  @since 10038
     * @returns {Promise<Object>}
     * 成功时：{"code":0, "data":{locationServerIsOpen: true/false}}
     * 失败时：{"code":-1, "message":"xxx" }
     */
  checkAndroidLocationServerIsOpen() {
     return Promise.resolve(null);
  },
  /**
     * 获取iOS定位授权的权限状态 only iOS
     *  @since 10038
     * @returns {Promise<Object>}
     * 成功时：{LocationAuthStatus}
     * 失败时：{"message":"xxx" }
     */
  getIOSLocationAuthorizationStatus() {
     return Promise.resolve(null);
  },
  /**
   * 跳转到其他App
   * @since 10039
   * @returns {Promise<Object>}
   * @param {string} scheme 其他App的Scheme 如 mihome://plugin
   * @param {Object} params 传给其他App的参数
   * @param {Object} passThrough 从其他App回来时原封不动带回来的参数（部分App支持）
   * 成功时：{"code":0, "data":{// 第三方app返回的数据}}
   * 失败时：{"code":-1, "message":"xxx" }
   */
  jumpToThirdpartyApplication(scheme, params, passThrough) {
     return Promise.resolve(null);
  },
  /**
   * 判断是否可以跳到其他App
   * @since 10039
   * @returns {Promise<bool>}
   * @param {string/Object} param
   * 10074扩展了此API，参数param接受两种类型，string或Object
   * 若为string，那么param就是scheme，用法和原来不变
   * 若为object，其格式为:{
   *   android:'xxxxxxx', //packageName
   *   ios:'xxxxxx' //scheme
   * }
   * 这是为了解决在Android上某些APP的scheme与其他app支持的scheme格式相同的从而导致这个方法返回了true，而实际上目标APP却不存在的问题
   * 所以在Android上改为使用应用包名的方式判断APP是否存在，Object中android Key传的是packageName，而iOS依旧传scheme即可
   * @result {"code":0, "data":true/false}
   */
  checkAbilityOfJumpToThirdpartyApplication(param) {
     return Promise.resolve(null);
  },
  /**
    * @since 10059
    * 多键开关状态发生变化--设备被拆分或者合并
    * @param{object}  接收到的数据 {did: xxx, splitFlag: xxx}
     *              splitFlag可取值如下：
     *              1 ：设备已拆分
     *              0 ：设备已合并
    * @example
    * Host.notifyMultikeyStateChanged(param);
  */
  notifyMultikeyStateChanged(param = {}) {
  },
  /**
   * @since 10072
   * 设置Pad上的滑动策略（only Android）
   * 这个api是为了解决某些插件使用的组件总是选择消耗滑动事件但是却又不做任何事，导致出现滑动无响应的问题
   * @param params
   * params.strategy {@link PAD_SCROLL_STRATEGY}
   * AUTO：表示默认策略，SDK会根据用户滑动位置做出相应的响应。
   * 当用户滑动的位置不会消耗滑动事件时，该事件会被SDK消耗掉。
   * ALWAYS_SDK_DEAL：滑动事件总是交给SDK处理，插件将无法接受到任何滑动事件。
   * ALWAYS_PLUGIN_DEAL：滑动事件全部交给插件处理。（Scroll组件剩余的滑动距离依旧可以被SDK消费掉，因为SDK支持滑动嵌套）
   * 这个方法一经调用所有插件页面都会应用设置的策略，所以如果只是某个页面需要适配滑动策略的话，请记得在退出该页面时将滑动策略设置回进入页面时的样子
   * @example
   *  componentWillUnmount() {
   *      Host.setPadScrollDealStrategy({ strategy: PAD_SCROLL_STRATEGY.AUTO });
   *    }
   *
   * 效果可参考com.xiaomi.demo中的PadScrollDemo
   */
  setPadScrollDealStrategy(params) {
  }
};
export const PAD_SCROLL_STRATEGY = {
  AUTO: 0, ALWAYS_SDK_DEAL: 1, ALWAYS_PLUGIN_DEAL: 2
};
/**
 * Host事件集合
 * @namespace HostEvent
 * @example
 *    import { HostEvent } from 'miot/host';
 *    const subscription = HostEvent.cellPhoneNetworkStateChanged.addListener(
 *       (event)=>{
 *          ...
 *       }
 *     )
 *    ...
 *    subscription.remove()
 *    ...
 *
 */
export const HostEvent = {
  /**
     * 手机网络状态变更事件
     * @since 10031
     * @event
     * @param{object}  接收到的数据 {networkState: xxx}
     *              networkState可取值如下：
     *             -1 ：DefaultState
     *              0 ：网络不可用
     *              1 ：蜂窝网络 2G 3G 4G
     *              2 ：WiFi网络
     *
     * @example
     * 可查看HostEventDemo.js
     *
     */
  cellPhoneNetworkStateChanged: {
  }
};
buildEvents(HostEvent);