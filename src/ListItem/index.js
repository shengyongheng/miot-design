// @ts-ignore
import NavigationBar from 'miot/ui/NavigationBar';
import React from 'react';

const Index = () => {
  return (
    <NavigationBar
      backgroundColor="black"
      type={NavigationBar.TYPE.DARK}
      left={[
        {
          key: NavigationBar.ICON.BACK,
          // onPress: (_) => this.props.navigation.goBack(),
        },
        {
          key: NavigationBar.ICON.CLOSE,
          onPress: (_) => console.log('onPress'),
        },
      ]}
      right={[
        {
          key: NavigationBar.ICON.COLLECT,
          disable: true,
          onPress: (_) => console.log('onPress'),
        },
        {
          key: NavigationBar.ICON.MORE,
          showDot: true,
          onPress: (_) => console.log('onPress'),
        },
      ]}
      title="标题"
      subtitle="副标题"
      onPressTitle={(_) => console.log('onPressTitle')}
    />
  );
};

export default Index;
