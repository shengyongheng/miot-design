export const MIOT_SWITCH_DEVICE_TYPE_KEY = 30006;
export const MIOT_SWITCH_SCENE_TAGS = 'plugin-intelligent-switch';
export const SWITCH_DEVICE_TYPE = {
  /** 普通设备 */
  COMMON_DEVICE: 'COMMON_DEVICE',
  /** 智能灯 */
  SMART_LIGHT: 'SMART_LIGHT',
  /** 其他智能开关(开关双控) */
  SMART_SWITCH: 'SMART_SWITCH',
  /** 批量控制 */
  MANUAL_SCENE: 'MANUAL_SCENE',
  /** 其他智能设备 */
  OTHER_SMART_DEVICE: 'OTHER_SMART_DEVICE'
};
Object.freeze(SWITCH_DEVICE_TYPE);
export const EMITTER_MIOT_SWITCH_DEVICE_TYPE_KEY = 'EMITTER_MIOT_SWITCH_DEVICE_TYPE_KEY';