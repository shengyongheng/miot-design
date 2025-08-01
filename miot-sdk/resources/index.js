/**
 * @export public
 * @doc_name 系统资源
 * @doc_index 9
 * @doc_directory sdk
 * @module miot/resources
 * @description 系统提供的静态资源, 包括图片, 文字, 基础 styleSheet css 等等
 *
 * @example
 * import res, {Language} from "miot/resources"
 *
 * res.logo
 * ...
 *
 * console.log(res.systemStrings.mijia)
 * console.log(res.getSystemString('mijia'))
 *
 * res.registerStrings({
 *   zh:{t1:"测试"},
 *   en:{t1:"test"}
 * })
 *
 * console.log(res.strings.t1)
 * console.log(res.getString('t1'))
 *
 * res.setLanguage(Language.zh_hk)
 *
 * console.log(res.getLanaguage())
 *
 * function createI18n(langStrings, defaultLanguage){}
 *
 */
import native, { createI18n } from '../native';
import Images from "./Images";
import logo from './images/logo.png';
import strings from "./Strings";
import de from "./strings/de";
import en from './strings/en';
import es from "./strings/es";
import fr from "./strings/fr";
import id from "./strings/id";
import it from "./strings/it";
import ja from "./strings/ja";
import ko from "./strings/ko";
import pl from "./strings/pl";
import ru from "./strings/ru";
import th from "./strings/th";
import vi from "./strings/vi";
import zh from './strings/zh';
import zh_bo from "./strings/zh_bo";
import zh_hk from "./strings/zh_hk";
import zh_tw from "./strings/zh_tw";
import tr from "./strings/tr";
import nl from "./strings/nl";
import pt from "./strings/pt";
import he from "./strings/he";
import el from "./strings/el";
import cs from "./strings/cs";
import uk from "./strings/uk";
import hu from "./strings/hu";
import ro from "./strings/ro";
import sv from "./strings/sv";
import es_us from "./strings/es_us";
import pt_pt from "./strings/pt_pt";
import sk from "./strings/sk";
import nb from "./strings/nb";
import fi from "./strings/fi";
import Styles from './Styles';
export { Images, Styles, strings };
/**
 * 常用语言类型
 * @namespace Language
 */
export const Language = {
  /**
     * 中文
     * @const
     */
  zh: "zh",
  /**
     * 繁体中文(台湾)
     * @const
     */
  zh_tw: "zh_tw",
  /**
     * 繁体中文(香港)
     * @const
     */
  zh_hk: "zh_hk",
  /**
     * 藏语
     * @const
     */
  zh_bo: "zh_bo",
  /**
     * 英语
     * @const
     */
  en: "en",
  /**
     * 西班牙语
     * @const
     */
  es: "es",
  /**
     * 朝鲜语
     * @const
     */
  ko: "ko",
  /**
     * 俄语
     * @const
     */
  ru: "ru",
  /**
     * 意大利
     * @const
     */
  it: "it",
  /**
     * 法语
     * @const
     */
  fr: "fr",
  /**
     * 德语
     * @const
     */
  de: "de",
  /**
     * 印尼
     * @const
     */
  id: "id",
  /**
     * 波兰
     * @const
     */
  pl: "pl",
  /**
     * 越南
     * @const
     */
  vi: "vi",
  /**
     * 日语
     * @const
     */
  ja: "ja",
  /**
     * 傣语
     * @const
     */
  th: "th",
  /**
     * 葡萄牙语
     * @const
     */
  pt: "pt",
  /**
     * 荷兰语
     * @const
     */
  nl: "nl",
  /**
     * 阿拉伯语
     * @const
     */
  ar: "ar",
  /**
     * 土耳其语
     * @const
     */
  tr: "tr",
  /**
   * 希伯来语
   * @const
   */
  he: "he",
  /**
   * 希腊语
   * @const
   */
  el: "el",
  /**
    * 捷克语
    * @constc
    */
  cs: "cs",
  /**
    * 乌克兰语
    * @const
    */
  uk: "uk",
  /**
    * 匈牙利语
    * @const
    */
  hu: "hu",
  /**
    * 罗马尼亚语
     * @const
    */
  ro: "ro",
  /**
    * 瑞典语
    * @const
    */
  sv: "sv",
  /**
    * 拉美西班牙语
    * @const
    */
  es_us: "es_us",
  /**
    * 欧洲葡萄牙语
    * @const
    */
  pt_pt: "pt_pt",
  /**
    * 斯洛伐克语
    * @const
    */
  sk: "sk",
  /**
    * 挪威语
    * @const
    */
  nb: "nb",
  /**
    * 芬兰语
    * @const
    */
  fi: "fi"
};
Object.freeze(Language);
 const i18n={system:createI18n({zh,en,zh_tw,zh_hk,zh_bo,es,ko,ru,it,fr,de,id,pl,vi,ja,th}, Language.zh), custom:{}, lang:false}
export default {
  /**
     * 米家标志
     * @member
     */
  logo,
  /**
     * 注册多语言
     * @method
     * @param {json} langStrings
     * @example
     *
     import res from 'miot/resources'
     res.registerStrings({
        zh:{
            t1:"测试字符串",
            t2:"数值为{1}",
            t3:["从{1}到{2}", [0, "非法数据"], [1, "错误数据"], [2, "从 二 到 {2}"], [(v1,v2)=>v1>100, "太多了"]],
            t4:{
                t5:()=>"好的",
                t6:["最多{1}"],
                t7:(a,b,c)=>`${a}|${b}|${c}`,
                t8:"你好"
            }
        },
        en:{
            t1:"test strigns",
            t2:"value is {1}",
            t3:["from {1} to {2}", [0, "invalid data"], [1, "wrong value"], [3, "from three to {2}"], [v1=>v1>100, "too more"]],
            t4:{
                t5:[()=>"good"],
                t6:"{1} at most",
                t7:(a,b,c)=>`${a}/${b}/${c}`
            }
        }
     });
    //style recommend
    console.log(res.strings.t1);
    console.log(res.strings.t2(123));
    console.log(res.strings.t3(0, 1));
    console.log(res.strings.t3(1, 2));
    console.log(res.strings.t3(2, 200));
    console.log(res.strings.t3(100, 3000));
    console.log(res.strings.t3(101, 500));
    console.log(res.strings.t4.t5());
    console.log(res.strings.t4.t6(20));
    console.log(res.strings.t4.t7(5,6,7));
    console.log(res.strings.t4.t8);
    //style traditional
    console.log(res.getString('t1');
    console.log(res.getString('t2',123));
    console.log(res.getString('t3', 0, 1));
    console.log(res.getString('t3', 1, 2));
    console.log(res.getString('t3', 2, 200));
    console.log(res.getString('t3', 100, 3000));
    console.log(res.getString('t3', 101, 500));
    console.log(res.getString('t4.t5');
    console.log(res.getString('t4.t6', 20));
    console.log(res.getString('t4.t7', 5,6,7));
    console.log(res.getString('t4.t8');
     *
     */
  registerStrings(langStrings) {
    if (!langStrings) return;
    if (i18n.lang) {
      i18n.language = i18n.lang;
    }
  },
  /**
     * 获取当前使用中的语言, 缺省为Host.locale.language
     * @method
     */
  getLanguage() {
    return i18n.system.language;
  },
  /**
     * 设置当前语言, 如果 lang 为 false 或 null, 则恢复为Host.locale.language
     * @param {Language} lang
     */
  setLanguage(lang) {
    i18n.lang = lang;
    i18n.system.language = lang;
    (i18n.custom || {}).language = lang;
  },
  /**
     * 获取系统字符串
     * @member
     * @example
     *
     * console.log(res.systemStrings.mijia)
     *
     */
  get systemStrings() {
    return i18n.system.strings;
  },
  /**
     * 根据主键名获取系统的国际化字符串
     * @param {string} key -主键名
     * @param  {...any} params -参数
     * @returns {string}
     * @example
     *    res.getSystemString('mijia')
     */
  getSystemString(key, ...params) {
    return i18n.system.getString(key, ...params);
  },
  /**
     * 获取用户自定义字符串
     * @member
     *
     */
  get strings() {
    return i18n.custom.strings;
  },
  /**
     * 根据主键名获取用户自定义的国际化字符串
     * @param {string} key -主键名
     * @param  {...any} params -参数
     * @returns {string}
     * @example
     *    res.getString('t1.tx', 1)
     *    res.getString('t2')
     */
  getString(key, ...params) {
    return i18n.custom.getString(key, ...params);
  },
  /**
     * 创建本地化字符串
     * @method
     * @param {json} langStrings  多语言字符串
     * @param {Language} defaultLanguage 默认语言
     * @example
     *
     * const i18n = res.createI18n({
     *     zh:{test:"测试"},
     *     en:{test:"test"}
     * }, Language.zh)
     *
     * ...
     * console.log(i18n.strings.test) //> 测试
     * i18n.language = Language.en;
     * console.log(i18n.strings.test) //> test
     * i18n.language = null;
     * console.log(i18n.strings.test) //> 测试
     *
     */
  createI18n
};