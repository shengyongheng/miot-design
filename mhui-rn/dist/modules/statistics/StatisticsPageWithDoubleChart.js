import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { BarChart } from "../../components/chart/barChart";
import { LineChart } from "../../components/chart/lineChart";
import { Select } from "../../components/select";
import Gap from "../gap/Gap";
import Images from "../../resources/Images";
import { ConfigContext } from "../../components/configProvider";
import { FontPrimary, FontSecondary } from "../../constants/font";
const DEFAULT_X_AXIS_SELECTED_DATA_STYLE = {
  fill: '#3CB3F7'
};
const DEFAULT_BAR_CHART_CONFIG = {
  xAxisSelectedDataStyle: DEFAULT_X_AXIS_SELECTED_DATA_STYLE
};
const DEFAULT_LINE_CHART_CONFIG = {
  curveLineColor: '#3CB3F7',
  toolTipWidth: 50,
  toolTipHeight: 20,
  toolTipTextColor: '#666666',
  toolTipFill: '#F7F7F7',
  xAxisSelectedDataStyle: DEFAULT_X_AXIS_SELECTED_DATA_STYLE
};
const emptyDataImages = Images.chart;
const StatisticsPageWithDoubleChart = React.memo(props => {
  const {
    emptyDataTitle = '',
    barChartDataset = [],
    lineChartDataset = [],
    topicTitle = '',
    selectConfig,
    barTitleConfig,
    barChartConfig = DEFAULT_BAR_CHART_CONFIG,
    lineChartTitle = '',
    lineChartConfig = DEFAULT_LINE_CHART_CONFIG,
    showLineChart = false
  } = props;
  const {
    onChangeIndex
  } = barChartConfig;
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    setSelectedIndex(barChartDataset.length - 1);
  }, [barChartDataset]);
  const handleChangeIndex = useCallback(newIndex => {
    setSelectedIndex(newIndex);

    if (typeof onChangeIndex === 'function') {
      onChangeIndex(newIndex);
    }
  }, [onChangeIndex]);
  const context = useContext(ConfigContext);
  /** 适配黑暗模式 */

  const imgOfEmptyData = context.colorScheme === 'dark' ? emptyDataImages.dark.empty : emptyDataImages.light.empty;

  const renderLineChart = () => {
    if (showLineChart) {
      return <>
          <SeparatorGap />
          <Text style={styles.lineChartTitle}>{lineChartTitle}</Text>
          <View style={styles.cardChartContainer}>
            {lineChartDataset.length > 0 ? <LineChart {...lineChartConfig} showTooltip showDot smoothing={false} dotRawRadius={0} showXAxisLine showHorizontalSplitLine showYAxisLabels dataset={lineChartDataset} itemAlign="middle" initialSelectedIndex={0} xAxisMaxSplitNumber={8} paddingHorizontal={20} paddingBottom={21.5} scrollHeaderOrFooterWidth={31} overflow="sample" /> : <EmptyContent imgOfEmptyData={imgOfEmptyData} emptyDataTitle={emptyDataTitle} />}
          </View>
        </>;
    }

    return null;
  };

  return <View>
      <Gap height={10} />
      <SeparatorGap />
      <View style={styles.headerContainer}>
        <Text style={styles.topic}>{topicTitle}</Text>
        <Select {...selectConfig} width={94} height={30} borderRadius={15} titleFontSize={13} titleColor="#666666" themeColor="#F7F7F7" />
      </View>
      <StatisticsInfo {...barTitleConfig} />
      <View style={styles.cardChartContainer}>
        {barChartDataset.length === 0 ? <EmptyContent imgOfEmptyData={imgOfEmptyData} emptyDataTitle={emptyDataTitle} /> : <BarChart {...barChartConfig} onChangeIndex={handleChangeIndex} showXAxisLine={barChartDataset.length === 0} showHorizontalSplitLine={barChartDataset.length === 0} showYAxisLabels={false} dataset={barChartDataset} itemAlign="middle" initialSelectedIndex={selectedIndex} xAxisMaxSplitNumber={7} barWidth={30} paddingHorizontal={0} paddingBottom={21.5} barBorderTopRadius={5} />}
      </View>
      {renderLineChart()}

      <Gap height={89} />
    </View>;
});
export default StatisticsPageWithDoubleChart;

const SeparatorGap = () => <View style={styles.separatorContainer}>
    <View style={styles.separator} />
  </View>;

const EmptyContent = props => {
  const {
    imgOfEmptyData,
    emptyDataTitle
  } = props;
  return <View>
      <Image style={styles.emptyDataImg} source={imgOfEmptyData} />
      <Text style={styles.emptyDataTitle}>{emptyDataTitle}</Text>
    </View>;
};
/**
 * 柱形图标题数据信息
 * @param props
 * @returns
 */


const StatisticsInfo = props => {
  const {
    leftTitle,
    rightTitle,
    leftUnits = '',
    rightUnits = '',
    leftSubtitle = '',
    rightSubtitle = ''
  } = props;

  const renderTitle = (titles, units, subtitle = '', isEnd) => {
    const newBarChartSubtitleInfo = isEnd ? styles.rightBarChartSubtitleInfo : styles.barChartSubtitleInfo;

    if (Array.isArray(titles)) {
      const newTitles = Array(titles.length).fill(0).map((v, idx) => // eslint-disable-next-line react/no-array-index-key
      <Fragment key={idx}>
            <Text style={styles.barChartTitleInfo}>{titles[idx]}</Text>
            <Text style={styles.barChartTitleUnit}>
              {Array.isArray(units) ? units[idx] : units}
            </Text>
          </Fragment>);
      return <View style={styles.barChartInfoItem}>
          <View style={styles.barChartTitleInfoContainer}>{newTitles}</View>
          <Text style={newBarChartSubtitleInfo}>{subtitle}</Text>
        </View>;
    }

    const newUnits = Array.isArray(units) && units.length > 0 ? units[0] : units;
    return <View style={styles.barChartInfoItem}>
        <View style={styles.barChartTitleInfoContainer}>
          <Text style={styles.barChartTitleInfo}>{titles}</Text>
          <Text style={styles.barChartTitleUnit}>{newUnits}</Text>
        </View>
        <Text style={newBarChartSubtitleInfo}>{subtitle}</Text>
      </View>;
  };

  return <View style={styles.barChartInfoContainer}>
      {renderTitle(leftTitle, leftUnits, leftSubtitle)}
      {renderTitle(rightTitle, rightUnits, rightSubtitle, true)}
    </View>;
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  panelTitle: {
    paddingTop: 15,
    paddingBottom: 22,
    fontSize: 13,
    color: '#000000',
    letterSpacing: 0,
    ...FontPrimary
  },
  topic: {
    fontSize: 13,
    color: '#000000',
    letterSpacing: 0,
    ...FontPrimary
  },
  select: {
    backgroundColor: '#F7F7F7'
  },
  cardChartContainer: {
    width: '100%',
    height: 248,
    justifyContent: 'center',
    alignItems: 'center'
  },
  barChartInfoContainer: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  barChartInfoItem: {},
  barChartTitleInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 34
  },
  barChartTitleInfo: {
    fontSize: 26,
    color: '#000000',
    letterSpacing: 0,
    lineHeight: 26,
    ...FontSecondary
  },
  barChartTitleUnit: {
    fontSize: 13,
    color: '#000000',
    letterSpacing: 0,
    lineHeight: 26,
    ...FontSecondary
  },
  barChartSubtitleInfo: {
    fontSize: 12,
    color: '#999999',
    letterSpacing: 0,
    ...FontSecondary
  },
  rightBarChartSubtitleInfo: {
    fontSize: 12,
    color: '#999999',
    letterSpacing: 0,
    textAlign: 'right',
    ...FontSecondary
  },
  separatorContainer: {
    height: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingHorizontal: 23.33
  },
  separator: {
    height: 0.5,
    opacity: 0.1,
    backgroundColor: '#000000'
  },
  lineChartTitle: {
    paddingTop: 6,
    paddingBottom: 26,
    fontSize: 13,
    color: '#000000',
    letterSpacing: 0,
    ...FontPrimary
  },
  emptyDataImg: {
    height: 40,
    width: 36
  },
  emptyDataTitle: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 10,
    color: '#B2B2B2',
    ...FontSecondary
  }
});