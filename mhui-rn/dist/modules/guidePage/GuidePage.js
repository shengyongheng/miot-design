// @ts-nocheck

/* eslint-disable */
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, Text, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import Radio from "../../components/radio/Radio";
import PropTypes from 'prop-types';
import { ConfigContext } from "../../components/configProvider";
import DynamicColor from "../../styles/DynamicColor";
import { Locale } from "../../locale";

const returnBack = require("../../resources/images/navigation/light/back_n_light.png");
/* const firstStep = require('../../resources/images/firstStep.png');
const secondStep = require('../../resources/images/secondStep.png');
const traditionalPlugin = require('../../resources/images/traditionalPlugin.png');
const standardPlugin = require('../../resources/images/standardPlugin.png'); */


const backGroundColor = new DynamicColor('#ffffff', '#000000');
const normalTextColor = new DynamicColor('#000000', 'rgba(255,255,255,0.9)');
const tipTextColor = new DynamicColor('#999999', 'rgba(255,255,255,0.4)');
const btnTextColor = new DynamicColor('#ffffff', 'rgba(255,255,255,0.9)');
const btnUTextColor = new DynamicColor('rgba(76,76,76,0.3)', 'rgba(255,255,255,0.7)');
const btnUConColor = new DynamicColor('#F5F5F5', 'rgba(255,255,255,0.7)');
const bigCicleColor = new DynamicColor('#F5F5F5', 'rgba(255,255,255,0.3)');
const checkedColor = new DynamicColor('#32BAC0', '#25A9AF');
const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;
const paginationY = deviceH - 90;
export default class GuidePage extends Component {
  static contextType = ConfigContext;
  static propTypes = {
    topTitle: PropTypes.string,
    onPress: PropTypes.func,
    goBack: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      list: [{
        id: 0,
        isChecked: false,
        img: this.traditionalPlugin,
        title: Locale.of(this.context.language).traditionalPlugin,
        tip: ''
      }, {
        id: 1,
        isChecked: true,
        img: this.standardPlugin,
        title: Locale.of(this.context.language).standardPlugin,
        tip: Locale.of(this.context.language).recommended
      }],
      goNext: true,
      goOut: true
    };
  }

  ImgArr = {
    'en': {
      traditionalPlugin: require("../../resources/images/traditionalPlugin-en.png"),
      standardPlugin: require("../../resources/images/standardPlugin-en.png"),
      firstStep: require("../../resources/images/firstStep-en.png"),
      secondStep: require("../../resources/images/secondStep-en.png")
    },
    'zh': {
      traditionalPlugin: require("../../resources/images/traditionalPlugin-zh.png"),
      standardPlugin: require("../../resources/images/standardPlugin-zh.png"),
      firstStep: require("../../resources/images/firstStep-zh.png"),
      secondStep: require("../../resources/images/secondStep-zh.png")
    },
    'tc': {
      traditionalPlugin: require("../../resources/images/traditionalPlugin-tc.png"),
      standardPlugin: require("../../resources/images/standardPlugin-tc.png"),
      firstStep: require("../../resources/images/firstStep-tc.png"),
      secondStep: require("../../resources/images/secondStep-tc.png")
    }
  };
  /*   showImg(name) {
      const imgSrc = JSON.stringify(`../../resources/images/${name}-${this.context.language}.png`);
      return require(imgSrc)
    } */

  lang = this.context.language == 'zh' ? 'zh' : 'en';
  returnBackImg = this.context.colorScheme == 'light' ? require("../../resources/images/navigation/light/back_n_light.png") : require("../../resources/images/navigation/dark/back_n_dark.png");
  traditionalPlugin = this.ImgArr[this.lang].traditionalPlugin;
  standardPlugin = this.ImgArr[this.lang].standardPlugin;
  firstStep = this.ImgArr[this.lang].firstStep;
  secondStep = this.ImgArr[this.lang].secondStep;
  selectedId = 1;
  btnonPress = () => {
    //console.log('---下一步---', this.state.goNext)
    if (!this.state.goNext) {
      return;
    } else {
      this.swiper.scrollTo(1); //this.setState({ goOut: false }, () => { console.log('---点击下一步---', this.state.goOut) })

      this.setState({
        goOut: false
      }, () => {});
    }
  };
  backonPress = () => {
    //console.log('---返回键---', this.state.goOut)
    if (this.state.goNext) {
      this.swiper.scrollTo(0); //this.setState({ goOut: true }, () => { console.log('---点击下一步---', this.state.goOut) })

      this.setState({
        goOut: true
      }, () => {});
    }

    if (this.state.goOut) {
      //console.log('---点击返回键---', this.state.goOut)
      const {
        goBack
      } = this.props;

      if (goBack) {
        goBack();
      }
    }
  };
  onPress = () => {
    const {
      onPress
    } = this.props;

    if (onPress) {
      onPress(this.selectedId);
    }
  };
  renderPagination = (index, total) => {
    let ind = null;

    if (index + 1 >= total) {
      ind = total;
    } else if (index + 1 <= 0) {
      alert(index);
      ind = 1;
    } else {
      ind = index + 1;
    }

    return <View style={[styles.paginationStyle]}>
        <Text style={[styles.paginationText, {
        color: tipTextColor[this.context.colorScheme]
      }]}>
          <Text style={[styles.paginationText, {
          color: tipTextColor[this.context.colorScheme]
        }]}>{ind}</Text>/{total}
        </Text>
      </View>;
  }; // 插件版本选中

  optChecked = id => {
    this.selectedId = id;
    let opt = this.state.list.find(option => id === option.id);

    if (opt) {
      if (opt.isChecked) {
        // 若该项已选中，直接返回
        return;
      }

      this.state.list.forEach(option => {
        option.isChecked = false;
      });
      opt.isChecked = true;
      this.setState(state => {
        return {
          goNext: true,
          list: state.list
        };
      });
    }
  };

  renderOption(option) {
    return <TouchableWithoutFeedback key={option.id} onPress={() => this.optChecked(option.id)}>
        <View style={[styles.optionContainer]}>
          <Image style={[styles.optionImg, {
          borderColor: option.isChecked ? checkedColor[this.context.colorScheme] : 'transparent',
          borderRadius: 16
        }]} source={option.img}></Image>
          <View style={styles.radioContainer}>
            <Radio isChecked={option.isChecked} changeCheck={this.optChecked} id={option.id} accessible={false} bigCircleStyle={styles.bigCircleStyle} checkedBigCircleStyle={{
            borderColorChecked: checkedColor[this.context.colorScheme],
            backgroundColorChecked: checkedColor[this.context.colorScheme],
            borderColor: bigCicleColor[this.context.colorScheme],
            backgroundColor: bigCicleColor[this.context.colorScheme]
          }} />
            <View style={{
            marginLeft: 5
          }}>
              <Text style={[styles.radioText, {
              color: option.isChecked ? checkedColor[this.context.colorScheme] : normalTextColor[this.context.colorScheme]
            }]}>{option.title}</Text>
              <Text style={[styles.radioTipText, {
              color: option.isChecked ? checkedColor[this.context.colorScheme] : tipTextColor[this.context.colorScheme]
            }]}>{option.tip}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>;
  }

  renderTitle() {
    return <View style={[styles.titleContainer]}>
        <TouchableWithoutFeedback onPress={this.backonPress}>
          <Image style={[styles.returnBack]} resizeMode="contain" source={this.returnBackImg}></Image>
        </TouchableWithoutFeedback>
        <View style={[styles.topTitleContainer]}>
          <Text style={[styles.topTitle, {
          color: normalTextColor[this.context.colorScheme]
        }]}>{this.props.topTitle ? this.props.topTitle : ''}</Text>
        </View>
        {
        /* <View style={{ width: 45 }}></View> */
      }
      </View>;
  }

  render() {
    return <View style={[styles.container, {
      backgroundColor: backGroundColor[this.context.colorScheme]
    }]}>
        <Swiper containerStyle={{
        width: deviceW,
        height: deviceH
      }} renderPagination={this.renderPagination} scrollEnabled={false} ref={swiper => this.swiper = swiper} loop={false} removeClippedSubviews={true}>
          <View style={styles.test}>
            <View style={styles.upper}>
              {this.renderTitle()}
              <View style={styles.textContainer}><Text style={[styles.bigHeadText, {
                color: normalTextColor[this.context.colorScheme]
              }]}>{Locale.of(this.context.language).selectPlugin}</Text></View>
              <View style={styles.extraContainer}>
                {this.state.list.map(option => this.renderOption(option))}
              </View>
            </View>
            <TouchableOpacity disabled={!this.state.goNext} style={[styles.btn, {
            backgroundColor: this.state.goNext ? checkedColor[this.context.colorScheme] : btnUConColor[this.context.colorScheme]
          }]} onPress={this.btnonPress}>
              <View style={{
              flex: 1,
              justifyContent: "center"
            }}>
                <Text style={[styles.btnText, {
                color: this.state.goNext ? btnTextColor[this.context.colorScheme] : btnUTextColor[this.context.colorScheme]
              }]}>{Locale.of(this.context.language).next}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.test}>
            <View style={[styles.paginationContainer, styles.upper]}>
              {this.renderTitle()}
              <View style={styles.textContainer}><Text style={[styles.bigHeadText, {
                color: normalTextColor[this.context.colorScheme]
              }]}>{Locale.of(this.context.language).changeSteps}</Text></View>
              <View style={styles.textContainer}><Text style={[styles.tipText, {
                color: normalTextColor[this.context.colorScheme]
              }]}>{Locale.of(this.context.language).stepOne}</Text></View>
              <Image style={[styles.imgStyle]} source={this.firstStep} resizeMode="contain"></Image>
              <View style={styles.textContainer}><Text style={(styles.tipText, {
                color: normalTextColor[this.context.colorScheme]
              })}>{Locale.of(this.context.language).stepTwo}</Text></View>
              <Image style={[styles.imgStyle]} source={this.secondStep} resizeMode="contain"></Image>
            </View>
            <TouchableOpacity disabled={!this.state.goNext} style={[styles.btn, this.state.goNext ? styles.btnChecked : styles.btnUnChecked]} onPress={this.onPress}>
              <View style={{
              flex: 1,
              justifyContent: "center"
            }}>
                <Text style={[styles.btnText, this.state.goNext ? styles.textChecked : styles.textUnChecked]}>{Locale.of(this.context.language).starting}</Text>
              </View>
            </TouchableOpacity>
          </View>

        </Swiper>
        {
        /* <TouchableOpacity disabled={!this.state.goNext} style={[styles.btn, this.state.goNext ? styles.btnChecked : styles.btnUnChecked]} onPress={this.btnonPress}>
         <View style={{ flex: 1, justifyContent: "center" }}>
           <Text style={[styles.btnText, this.state.goNext ? styles.textChecked : styles.textUnChecked]}>下一步</Text>
         </View>
        </TouchableOpacity> */
      }
      </View>;
  }

}
const styles = StyleSheet.create({
  test: {
    flex: 1,
    justifyContent: "space-between"
  },
  container: {
    flex: 1
  },
  returnBack: {
    width: 40,
    height: 40
  },
  titleContainer: {
    width: deviceW,
    alignItems: 'center',
    height: 53,
    flexDirection: 'row'
  },
  topTitleContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginHorizontal: 5,
    marginRight: 45
  },
  topTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'D-DINCondensed-Bold',
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  textContainer: {
    width: 312,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  bigHeadText: {
    fontFamily: 'MILanPro_LIGHT--GB1-4',
    fontSize: 24,
    letterSpacing: 0.7,
    textAlign: "center"
  },
  tipText: {
    fontFamily: 'MILanPro_MEDIUM--GB1-4',
    fontSize: 14,
    letterSpacing: 0,
    textAlign: "center"
  },
  bigCircleStyle: {
    borderRadius: 11,
    width: 22,
    height: 22
  },
  extraContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  upper: {
    marginTop: 32,
    alignItems: "center"
  },
  optionContainer: {
    width: '50%',
    alignItems: "center"
  },
  optionImg: {
    height: 316,
    width: 150,
    borderWidth: 1.5,
    borderRadius: 16
  },
  radioContainer: {
    marginTop: 12,
    minHeight: 22,
    maxWidth: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  paginationContainer: {
    alignItems: "center"
  },
  paginationText: {
    fontFamily: 'MILanPro--GB1-4',
    fontSize: 13,
    letterSpacing: 0,
    textAlign: "center"
  },
  optionText: {
    marginTop: 4,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 12
  },
  paginationStyle: {
    position: 'absolute',
    width: '100%',
    top: paginationY
  },
  imgStyle: {
    //width: '92%',
    borderRadius: 16,
    maxHeight: 150,
    marginBottom: 10
  },
  btn: {
    height: 46,
    marginLeft: 27,
    marginRight: 27,
    marginBottom: 27,
    borderRadius: 23,
    alignItems: 'center'
  },
  btnText: {
    fontFamily: 'MILanPro_MEDIUM--GB1-4',
    fontSize: 16,
    letterSpacing: 0,
    textAlign: 'center'
  },
  btnUnChecked: {
    backgroundColor: '#F5F5F5'
  },
  btnChecked: {
    backgroundColor: '#32BAC0'
  },
  radioText: {
    fontFamily: 'MILanPro_MEDIUM--GB1-4',
    fontSize: 14,
    letterSpacing: 0,
    textAlign: "center"
    /* width: '50%', */

  },
  radioTipText: {
    fontFamily: 'MILanPro--GB1-4',
    fontSize: 12,
    letterSpacing: 0,
    textAlign: "center"
  },
  textUnChecked: {
    color: 'rgba(76,76,76,0.3)'
  },
  textChecked: {
    color: '#fff'
  }
});