import React, { useMemo, useState, useContext, useEffect } from 'react';
import { Text, TouchableOpacity, View, Modal, TouchableWithoutFeedback } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { InitAllDate, FormatDate, InitDates, GetRangeDate, ResortWeek, GiveArrayWeek } from "./utils";
import style from "./styles";
import { PanelType, AllWeeks, Colors, DefaultProp } from "./const";
import { ConfigContext } from "../configProvider";
import { Locale } from "../../locale";
const Key = [['1-0', '1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7'], ['2-0', '2-1', '2-2', '2-3', '2-4', '2-5', '2-6', '2-7'], ['3-0', '3-1', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7'], ['4-0', '4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7'], ['5-0', '5-1', '5-2', '5-3', '5-4', '5-5', '5-6', '5-7'], ['6-0', '6-1', '6-2', '6-3', '6-4', '6-5', '6-6', '6-7']];

const YMDDatePicker = props => {
  const {
    range = false,
    date = [],
    backgroundColor,
    button = {},
    fullscreen = false,
    buttonColor = {},
    visible = false,
    closeImmediately = false,
    onSelected,
    multiple = false,
    onChangePanelBefore,
    onChangePanelTypeBefore,
    showAdjacentMonths = false,
    showWeek = false,
    localeFirstDayOfYear = 4,
    allowDates,
    readonly = false,
    onCancel,
    hideOverlay = false,
    persistent = true,
    overlayOpacity = 0.4,
    overlayColor = '#000',
    firstDayOfWeek = 0
  } = props;
  const context = useContext(ConfigContext);
  const dates = useMemo(() => InitDates(date, range), [props.date]);
  const theme = context.colorScheme || 'light';
  const language = Locale.of(context.language);
  const [selected, Selected] = useState(dates);
  const [show, Show] = useState(dates[0] ? new Date(dates[0]) : new Date());
  const [rangeClick, RangeClick] = useState('');
  const [panel, Panel] = useState(props.panel);
  const year = show.getFullYear();
  const month = show.getMonth() + 1;
  const max = useMemo(() => FormatDate(new Date(props.max)), [props.max]);
  const min = useMemo(() => FormatDate(new Date(props.min)), [props.min]);
  useEffect(() => Panel(props.panel), [props.panel]);
  useEffect(() => {
    Selected(dates.map(v => props.panel === 'date' ? v : v.slice(0, 7)));
    Show(dates[0] ? new Date(dates[0]) : new Date());
  }, [props.date]);
  let title = props.title;
  title = typeof title === 'string' || title === false ? title : panel === 'date' ? language.selectDate : language.selectMonth;

  const onClose = (s = selected) => {
    if (range) s = [s[0], s[s.length - 1]];else if (!multiple) s = s[0];
    onSelected && onSelected(s);
    onCancel && onCancel();
  };

  const setShow = (y, m, step) => {
    onChangePanelBefore && onChangePanelBefore(y, m - 1);

    if (panel === PanelType.DATE) {
      Show(new Date(y, m - 1 + step, 1));
    } else if (panel === PanelType.MONTH) {
      Show(new Date(y + step, m - 1, 1));
    }
  };

  const changePanel = p => {
    onChangePanelTypeBefore && onChangePanelTypeBefore(p);
    Panel(p);
  };

  const setDate = current => {
    if (panel !== props.panel) changePanel(props.panel);else if (range) {
      if (rangeClick) {
        const s = GetRangeDate(rangeClick, current).map(v => FormatDate(v).slice(0, panel === PanelType.MONTH ? 7 : 10)).filter(v => allowDates(v));
        RangeClick('');
        Selected(s);
        closeImmediately && onClose(s);
      } else {
        RangeClick('');
        Selected([current]);
      }
    } else if (multiple) {
      const index = selected.indexOf(current);
      if (index <= -1) selected.push(current);else selected.splice(index, 1);
      Selected([...selected]);
      closeImmediately && onClose(selected);
    } else {
      Selected([current]);
      closeImmediately && onClose([current]);
    }
    Show(new Date(current));
  };

  const color = props.theme || Colors.Selected[theme];
  const {
    event,
    eventcolors
  } = useMemo(() => {
    const e = [];
    const ec = [];

    for (const v of props.event) {
      if (typeof v === 'string' || typeof v === 'number' || v instanceof Date) {
        e.push(FormatDate(new Date(v)));
        ec.push(color);
      } else {
        e.push(FormatDate(new Date(v.date)));
        ec.push(v.color || color);
      }
    }

    return {
      event: e,
      eventcolors: ec
    };
  }, [props.event]);

  const renderDate = () => {
    const first = AllWeeks.indexOf(firstDayOfWeek) % 7;
    const CONTENT = InitAllDate(year, month, first, showAdjacentMonths);
    const WEEKS = ResortWeek(language.weeks, first);

    if (showWeek) {
      GiveArrayWeek(CONTENT, WEEKS, first, localeFirstDayOfYear);
    }

    return <View>
        <View>
          <Text style={style.subtitle}>{month + language.monthUnit}</Text>
        </View>
        <View style={style.weeks}>
          {WEEKS.map(v => <Text key={v} style={style.linetitle}>
              {v}
            </Text>)}
        </View>
        <View>
          {CONTENT.map((value, index) => <View key={value.join('.')} style={style.weeks}>
              {value.map((v, i) => {
            if (typeof v === 'number' || !v) {
              return <View key={Key[index][showWeek ? i + 1 : i]}>
                      <Text style={[style.week, style.readonly]}>{v}</Text>
                    </View>;
            }

            const current = FormatDate(v);
            const currentStyle = [style.week];

            if (selected.includes(current)) {
              currentStyle.push({
                color: 'white',
                backgroundColor: color
              });
            }

            const tip = event.indexOf(current);
            const flag = month === v.getMonth() + 1 && (!parseInt(max, 10) || current <= max) && (!parseInt(min, 10) || current >= min) && allowDates(current);
            if (!flag) currentStyle.push(style.readonly);
            const showDate = v.getDate();
            return <TouchableOpacity onPress={() => flag && setDate(current)} key={Key[index][showWeek ? i + 1 : i]}>
                    <Text style={currentStyle}>{showDate}</Text>
                    {tip >= 0 && <Svg style={style.event} width="4" height="4">
                        <Circle cx="2" cy="2" r="2" fill={eventcolors[tip]} />
                      </Svg>}
                  </TouchableOpacity>;
          })}
            </View>)}
        </View>
      </View>;
  };

  const renderMonth = () => {
    const CONTENT = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]];
    return <View style={{
      marginBottom: 12,
      marginTop: 25
    }}>
        {CONTENT.map(value => <View key={value.join('.')} style={style.weeks}>
            {value.map(v => {
          const current = FormatDate(new Date(year, v - 1, 1)).slice(0, 7);
          const currentStyle = [style.month];

          if (selected.includes(current)) {
            currentStyle.push({
              color: 'white',
              backgroundColor: color
            });
          }

          const flag = (!parseInt(max, 10) || current <= max.slice(0, 7)) && (!parseInt(min, 10) || current >= min.slice(0, 7));
          if (!flag) currentStyle.push(style.readonly);
          return <TouchableOpacity onPress={() => flag && v && setDate(current)} key={v}>
                  <Text style={currentStyle}>{v + language.monthUnit}</Text>
                </TouchableOpacity>;
        })}
          </View>)}
      </View>;
  };

  return <Modal animationType="slide" visible={visible} transparent onRequestClose={() => onClose()}>
      {!hideOverlay && <TouchableWithoutFeedback disabled={!persistent} onPress={() => onCancel && onCancel()}>
          <View style={{
        height: '100%',
        backgroundColor: overlayColor,
        opacity: overlayOpacity
      }} />
        </TouchableWithoutFeedback>}
      <View style={[style.main, {
      backgroundColor,
      height: fullscreen ? '100%' : 'auto'
    }]}>
        {title && <View>
            <Text style={style.title}>{title}</Text>
          </View>}
        <View style={style.switch}>
          <TouchableOpacity style={style.arrow} onPress={() => setShow(year, month, -1)}>
            <Svg width="6" height="12" viewBox="0 0 6 12" fill="none">
              <Path d="M5.06109 11.2686C5.27588 11.4834 5.62412 11.4834 5.83891 11.2686C6.0537 11.0538 6.0537 10.7056 5.83891 10.4908L1.34878 6.00065L5.83891 1.51052C6.0537 1.29573 6.0537 0.947494 5.83891 0.732705C5.62412 0.517917 5.27588 0.517917 5.06109 0.732705L0.182055 5.61174C-0.0327339 5.82653 -0.0327339 6.17477 0.182055 6.38956L5.06109 11.2686Z" fill={Colors[theme].Arrow} />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changePanel('month')}>
            <Text style={style.center}>
              {year}
              {panel === PanelType.DATE ? `-${month.toString().padStart(2, '0')}` : language.yearUnit}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.arrow} onPress={() => setShow(year, month, 1)}>
            <Svg width="6" height="12" viewBox="0 0 6 12" fill="none">
              <Path d="M0.937932 0.731404C0.723144 0.516615 0.374903 0.516615 0.160115 0.731404C-0.0546737 0.946192 -0.0546737 1.29443 0.160115 1.50922L4.65024 5.99935L0.160115 10.4895C-0.0546735 10.7043 -0.0546735 11.0525 0.160115 11.2673C0.374903 11.4821 0.723144 11.4821 0.937932 11.2673L5.81697 6.38826C6.03176 6.17347 6.03176 5.82523 5.81697 5.61044L0.937932 0.731404Z" fill={Colors[theme].Arrow} />
            </Svg>
          </TouchableOpacity>
        </View>
        {panel === PanelType.DATE ? renderDate() : renderMonth()}
        <View style={style.buttons}>
          <TouchableOpacity style={[style.button, {
          backgroundColor: buttonColor.cancel || 'rgba(0, 0, 0, 0.06)'
        }]} disabled={readonly} onPress={() => onCancel && onCancel()}>
            <Text style={style.text}>{button.cancel || language.cancel}</Text>
          </TouchableOpacity>
          {!closeImmediately && <TouchableOpacity style={[style.button, {
          backgroundColor: buttonColor.confirm || '#32BAC0'
        }]} disabled={readonly} onPress={() => onClose()}>
              <Text style={[style.text, {
            color: 'white'
          }]}>
                {button.confirm || language.confirm}
              </Text>
            </TouchableOpacity>}
        </View>
      </View>
    </Modal>;
};

YMDDatePicker.defaultProps = DefaultProp;
export default YMDDatePicker;