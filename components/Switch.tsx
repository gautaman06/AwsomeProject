import { StyleProp, ViewStyle } from 'react-native';
import { Switch as SwitchComponent } from 'react-native-switch';
import { View } from './Themed';

interface ISwitchProps {
  value: boolean;
  onChangeValue: () => void;
  styles: StyleProp<ViewStyle>;
}

const Switch = (props: ISwitchProps) => {
  const { value, onChangeValue, styles } = props;

  return (
    <View style={styles}>
      <SwitchComponent
        value={value}
        onValueChange={onChangeValue}
        activeText={'On'}
        inActiveText={'Off'}
        circleSize={20}
        barHeight={25}
        circleBorderWidth={1}
        circleBorderActiveColor={'#FFFFFF'}
        circleBorderInactiveColor={'#FFFFFF'}
        backgroundActive={'#22C53C'}
        backgroundInactive={'#CDC9C9'}
        circleActiveColor={'#FFFFFF'}
        circleInActiveColor={'#FFFFFF'}
        // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
        changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
        innerCircleStyle={{ alignItems: 'center', justifyContent: 'center' }} // style for inner animated circle for what you (may) be rendering inside the circle
        outerCircleStyle={{}} // style for outer animated circle
        renderActiveText={false}
        renderInActiveText={false}
        switchLeftPx={3} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
        switchRightPx={3} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
        switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
        switchBorderRadius={30}
      />

      {/* <SwitchComponent
        value={value}
        onValueChange={onChangeValue}
        activeText={'On'}
        inActiveText={'Off'}
        circleSize={20}
        barHeight={25}
        circleBorderWidth={1}
        circleBorderActiveColor={'#FFFFFF'}
        circleBorderInactiveColor={'#FFFFFF'}
        backgroundActive={'#22C53C'}
        backgroundInactive={'#CDC9C9'}
        circleActiveColor={'#FFFFFF'}
        circleInActiveColor={'#FFFFFF'}
        // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
        changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
        innerCircleStyle={{ alignItems: 'center', justifyContent: 'center' }} // style for inner animated circle for what you (may) be rendering inside the circle
        outerCircleStyle={{}} // style for outer animated circle
        renderActiveText={false}
        renderInActiveText={false}
        switchLeftPx={3} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
        switchRightPx={3} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
        switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
        switchBorderRadius={30}
      /> */}
    </View>
  );
};

export default Switch;
