/**
 * @since 20190402
 * @author Geeook
 * @description Images 统一管理
 * @example <Image source={Images.common.right_arrow}>
 */
export default {
  /**
   * 通用
   */
  common: {
    right_arrow: require('./images/right_arrow.png'),
    close: require('./images/close.png'),
    mihome: require('./images/mihome.png'),
    selectIcon: require('./images/select_icon.png'),
    right: require('./images/right.png'),
    manualScene: require('./images/manual_scene.png'),
    defaultLight: require('./images/default_light.png'),
    defaultSwitch: require('./images/switch_default.png'),
    ota_auto_light: require('./images/ota_auto_light.png'),
    ota_auto_light_fail: require('./images/ota_auto_light_fail.png'),
    ota_auto_light_success: require('./images/ota_auto_light_success.png'),
    ota_auto_light_progress: require('./images/ota_auto_light_progress.png'),
    list_empty: require('./images/list-empty.png'),
    list_empty_dark: require('./images/list-empty-dark.png'),
    light: {
      std_dialog_guide_common_zh: require('./images/std_dialog_guide/common/std_dialog_guide_white_zh.png'),
      std_dialog_guide_common_en: require('./images/std_dialog_guide/common/std_dialog_guide_white_en.png'),
      cloudstorage: require("./images/cloudstorage-light.png")
    },
    dark: {
      std_dialog_guide_common_zh: require('./images/std_dialog_guide/common/std_dialog_guide_black_zh.png'),
      std_dialog_guide_common_en: require('./images/std_dialog_guide/common/std_dialog_guide_black_en.png'),
      cloudstorage: require("./images/cloudstorage-dark.png")
    }
  },
  /**
   * 导航栏
   */
  navigation: {
    /**
     * 小红点
     */
    dot: require('./images/navigation/dot.png'),
    /**
     * 黑底白色图标
     */
    dark: {
      /**
       * 添加
       */
      add: {
        normal: require('./images/navigation/dark/add_n_dark.png'),
        press: require('./images/navigation/dark/add_p_dark.png'),
        disable: require('./images/navigation/dark/add_d_dark.png')
      },
      /**
       * 返回
       */
      back: {
        normal: require('./images/navigation/dark/back_n_dark.png'),
        press: require('./images/navigation/dark/back_p_dark.png'),
        disable: require('./images/navigation/dark/back_d_dark.png')
      },
      /**
       * 关闭
       */
      close: {
        normal: require('./images/navigation/dark/close_n_dark.png'),
        press: require('./images/navigation/dark/close_p_dark.png'),
        disable: require('./images/navigation/dark/close_d_dark.png')
      },
      /**
       * 收藏
       */
      collect: {
        normal: require('./images/navigation/dark/collect_n_dark.png'),
        press: require('./images/navigation/dark/collect_p_dark.png'),
        disable: require('./images/navigation/dark/collect_d_dark.png')
      },
      /**
       * 完成
       */
      complete: {
        normal: require('./images/navigation/dark/complete_n_dark.png'),
        press: require('./images/navigation/dark/complete_p_dark.png'),
        disable: require('./images/navigation/dark/complete_d_dark.png')
      },
      /**
       * 删除
       */
      delete: {
        normal: require('./images/navigation/dark/delete_n_dark.png'),
        press: require('./images/navigation/dark/delete_p_dark.png'),
        disable: require('./images/navigation/dark/delete_d_dark.png')
      },
      /**
       * 详情
       */
      detail: {
        normal: require('./images/navigation/dark/detail_n_dark.png'),
        press: require('./images/navigation/dark/detail_p_dark.png'),
        disable: require('./images/navigation/dark/detail_d_dark.png')
      },
      /**
       * 更多
       */
      more: {
        normal: require('./images/navigation/dark/more_n_dark.png'),
        press: require('./images/navigation/dark/more_p_dark.png'),
        disable: require('./images/navigation/dark/more_d_dark.png')
      },
      /**
       * 下一步
       */
      next: {
        normal: require('./images/navigation/dark/next_n_dark.png'),
        press: require('./images/navigation/dark/next_p_dark.png'),
        disable: require('./images/navigation/dark/next_d_dark.png')
      },
      /**
       * 个人中心
       */
      profile: {
        normal: require('./images/navigation/dark/profile_n_dark.png'),
        press: require('./images/navigation/dark/profile_p_dark.png'),
        disable: require('./images/navigation/dark/profile_d_dark.png')
      },
      /**
       * 二维码
       */
      qr: {
        normal: require('./images/navigation/dark/qr_n_dark.png'),
        press: require('./images/navigation/dark/qr_p_dark.png'),
        disable: require('./images/navigation/dark/qr_d_dark.png')
      },
      /**
       * 搜索
       */
      search: {
        normal: require('./images/navigation/dark/search_n_dark.png'),
        press: require('./images/navigation/dark/search_p_dark.png'),
        disable: require('./images/navigation/dark/search_d_dark.png')
      },
      /**
       * 全选
       */
      select_all: {
        normal: require('./images/navigation/dark/select_all_n_dark.png'),
        press: require('./images/navigation/dark/select_all_p_dark.png'),
        disable: require('./images/navigation/dark/select_all_d_dark.png')
      },
      /**
       * 全部选中
       */
      selected_all: {
        normal: require('./images/navigation/dark/selected_all_n_dark.png'),
        press: require('./images/navigation/dark/selected_all_p_dark.png'),
        disable: require('./images/navigation/dark/selected_all_d_dark.png')
      },
      /**
       * 设置
       */
      setting: {
        normal: require('./images/navigation/dark/setting_n_dark.png'),
        press: require('./images/navigation/dark/setting_p_dark.png'),
        disable: require('./images/navigation/dark/setting_d_dark.png')
      },
      /**
       * 分享
       */
      share: {
        normal: require('./images/navigation/dark/share_n_dark.png'),
        press: require('./images/navigation/dark/share_p_dark.png'),
        disable: require('./images/navigation/dark/share_d_dark.png')
      },
      /**
       * 编辑
       */
      edit: {
        normal: require('./images/navigation/dark/edit_n_dark.png'),
        press: require('./images/navigation/dark/edit_p_dark.png'),
        disable: require('./images/navigation/dark/edit_d_dark.png')
      }
    },
    /**
     * 白底黑色图标
     */
    light: {
      /**
       * 添加
       */
      add: {
        normal: require('./images/navigation/light/add_n_light.png'),
        press: require('./images/navigation/light/add_p_light.png'),
        disable: require('./images/navigation/light/add_d_light.png')
      },
      /**
       * 返回
       */
      back: {
        normal: require('./images/navigation/light/back_n_light.png'),
        press: require('./images/navigation/light/back_p_light.png'),
        disable: require('./images/navigation/light/back_d_light.png')
      },
      /**
       * 关闭
       */
      close: {
        normal: require('./images/navigation/light/close_n_light.png'),
        press: require('./images/navigation/light/close_p_light.png'),
        disable: require('./images/navigation/light/close_d_light.png')
      },
      /**
       * 收藏
       */
      collect: {
        normal: require('./images/navigation/light/collect_n_light.png'),
        press: require('./images/navigation/light/collect_p_light.png'),
        disable: require('./images/navigation/light/collect_d_light.png')
      },
      /**
       * 完成
       */
      complete: {
        normal: require('./images/navigation/light/complete_n_light.png'),
        press: require('./images/navigation/light/complete_p_light.png'),
        disable: require('./images/navigation/light/complete_d_light.png')
      },
      /**
       * 删除
       */
      delete: {
        normal: require('./images/navigation/light/delete_n_light.png'),
        press: require('./images/navigation/light/delete_p_light.png'),
        disable: require('./images/navigation/light/delete_d_light.png')
      },
      /**
       * 详情
       */
      detail: {
        normal: require('./images/navigation/light/detail_n_light.png'),
        press: require('./images/navigation/light/detail_p_light.png'),
        disable: require('./images/navigation/light/detail_d_light.png')
      },
      /**
       * 更多
       */
      more: {
        normal: require('./images/navigation/light/more_n_light.png'),
        press: require('./images/navigation/light/more_p_light.png'),
        disable: require('./images/navigation/light/more_d_light.png')
      },
      /**
       * 下一步
       */
      next: {
        normal: require('./images/navigation/light/next_n_light.png'),
        press: require('./images/navigation/light/next_p_light.png'),
        disable: require('./images/navigation/light/next_d_light.png')
      },
      /**
       * 个人中心
       */
      profile: {
        normal: require('./images/navigation/light/profile_n_light.png'),
        press: require('./images/navigation/light/profile_p_light.png'),
        disable: require('./images/navigation/light/profile_d_light.png')
      },
      /**
       * 二维码
       */
      qr: {
        normal: require('./images/navigation/light/qr_n_light.png'),
        press: require('./images/navigation/light/qr_p_light.png'),
        disable: require('./images/navigation/light/qr_d_light.png')
      },
      /**
       * 搜索
       */
      search: {
        normal: require('./images/navigation/light/search_n_light.png'),
        press: require('./images/navigation/light/search_p_light.png'),
        disable: require('./images/navigation/light/search_d_light.png')
      },
      /**
       * 全选
       */
      select_all: {
        normal: require('./images/navigation/light/select_all_n_light.png'),
        press: require('./images/navigation/light/select_all_p_light.png'),
        disable: require('./images/navigation/light/select_all_d_light.png')
      },
      /**
       * 全部选中
       */
      selected_all: {
        normal: require('./images/navigation/light/selected_all_n_light.png'),
        press: require('./images/navigation/light/selected_all_p_light.png'),
        disable: require('./images/navigation/light/selected_all_d_light.png')
      },
      /**
       * 设置
       */
      setting: {
        normal: require('./images/navigation/light/setting_n_light.png'),
        press: require('./images/navigation/light/setting_p_light.png'),
        disable: require('./images/navigation/light/setting_d_light.png')
      },
      /**
       * 分享
       */
      share: {
        normal: require('./images/navigation/light/share_n_light.png'),
        press: require('./images/navigation/light/share_p_light.png'),
        disable: require('./images/navigation/light/share_d_light.png')
      },
      /**
       * 编辑
       */
      edit: {
        normal: require('./images/navigation/light/edit_n_light.png'),
        press: require('./images/navigation/light/edit_p_light.png'),
        disable: require('./images/navigation/light/edit_d_light.png')
      }
    }
  }
};