import { GearCard } from 'mhui-rn-fixed';
import React, { useState } from 'react';

const Index = () => {
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <GearCard
        title="最简单最弹窗asd"
        subtitle="as输输入输输入dqwe"
        cardType={GearCard.CARD_TYPE.SLIDER}
        onSliderValueChange={(value) => console.log(value)}
        showSwitch={true}
        sliderProps={{ value: 10, showDots: 0.25 }}
        sliderStyle={{ minimumTrackTintColor: 'red', thumbTintColor: 'white' }}
        options={Array.from({ length: 40 }, (_, i) => i * 5)}
      />
      <GearCard
        title="最简单最弹窗asd"
        subtitle="as输输入输输入dqwe"
        showSwitch={true}
        currentIndex={0}
        unlimitedHeightEnable
        switchValue={!disabled}
        disabledGear={disabled}
        onSwitchValueChange={(value) => {
          setDisabled(!value);
        }}
        cardType={GearCard.CARD_TYPE.TAB}
        titleNumberOfLines={2}
        allowFontScaling={false}
        options={Array.from({ length: 5 }, (_, i) => i + 1 + '挡')}
        subtitleStyle={{}}
        titleStyle={{}}
        gearTextStyle={{}}
        cardStyle={{ marginBottom: 10 }}
      />
      <GearCard
        title="最简单简单输入弹窗"
        subtitle="as输输输入输输dqwe"
        showSwitch={true}
        allowFontScaling={false}
        currentIndex={2}
        cardType={GearCard.CARD_TYPE.DOT}
        titleNumberOfLines={2}
        subtitleNumberOfLines={2}
        options={Array.from({ length: 9 }, (_, i) => i + 1)}
        onPress={(index) => {
          console.log('点击', index);
        }}
      />
    </>
  );
};

export default Index;
