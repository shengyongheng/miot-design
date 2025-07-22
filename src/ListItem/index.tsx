// @ts-ignore
import NavigationBar from 'miot/ui/NavigationBar';
import React from 'react';

const Index: React.FC<any> = () => {
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
          onPress: (_: any) => console.log('onPress'),
        },
      ]}
      right={[
        {
          key: NavigationBar.ICON.COLLECT,
          disable: true,
          onPress: (_: any) => console.log('onPress'),
        },
        {
          key: NavigationBar.ICON.MORE,
          showDot: true,
          onPress: (_: any) => console.log('onPress'),
        },
      ]}
      title="标题"
      subtitle="副标题"
      onPressTitle={(_: any) => console.log('onPressTitle')}
    />
  );
};

export default Index;
