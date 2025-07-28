import DynamicColor from "../../styles/DynamicColor";
export const PanelType = Object.freeze({
  DATE: 'date',
  MONTH: 'month'
});
export const AllWeeks = [0, 1, 2, 3, 4, 5, 6, '0', '1', '2', '3', '4', '5', '6', '日', '一', '二', '三', '四', '五', '六'];
export const DefaultProp = {
  date: [],
  multiple: false,
  range: false,
  panel: PanelType.DATE,
  event: [],
  firstDayOfWeek: 0,
  allowDates: () => true,
  readonly: false,
  showAdjacentMonths: false,
  showWeek: false,
  localeFirstDayOfYear: 4,
  backgroundColor: '#FFFFFF',
  fullscreen: false,
  clearImmediate: false,
  visible: false,
  title: true
};
export const Colors = {
  light: {
    Arrow: 'rgba(0, 0, 0, 0.3)',
    Dot: '#32BAC0'
  },
  dark: {
    Arrow: 'rgba(255, 255, 255, 0.4)',
    Dot: '#25A9AF'
  },
  Selected: new DynamicColor('#32BAC0', '#25A9AF')
};