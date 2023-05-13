import * as React from 'react';
import {
  Text,
  View,
  Image,
  Animated,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
  Pressable,
  ImageSourcePropType,
  TouchableWithoutFeedbackProps,
  ImageStyle,
} from 'react-native';

type BaseTouchableProps = Pick<TouchableWithoutFeedbackProps, Exclude<keyof TouchableWithoutFeedbackProps, 'onPress'>>;

export interface IBouncyCheckboxProps extends BaseTouchableProps {
  value?: string;
  size?: number;
  text?: string;
  fillColor?: string;
  isChecked?: boolean;
  isPartial?: boolean;
  unfillColor?: string;
  disableText?: boolean;
  bounceEffect?: number;
  bounceFriction?: number;
  useNativeDriver?: boolean;
  disableBuiltInState?: boolean;
  ImageComponent?: any;
  TouchableComponent?: any;
  bounceEffectIn?: number;
  bounceEffectOut?: number;
  bounceVelocityIn?: number;
  bounceVelocityOut?: number;
  bouncinessIn?: number;
  bouncinessOut?: number;
  iconComponent?: React.ReactNode;
  textComponent?: React.ReactNode;
  iconStyle?: StyleProp<ViewStyle>;
  innerIconStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconImageStyle?: StyleProp<ImageStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;
  checkIconImageSource?: ImageSourcePropType;
  onPress?: (checked: boolean, value: string) => void;
}

interface IState {
  checked: boolean;
  springValue: Animated.Value;
  bounceValue: Animated.Value;
}

class BouncyCheckbox extends React.Component<IBouncyCheckboxProps, IState> {
  constructor(props: IBouncyCheckboxProps) {
    super(props);
    this.state = {
      checked: false,
      springValue: new Animated.Value(1),
      bounceValue: new Animated.Value(1),
    };
  }

  componentDidMount() {
    this.setState({ checked: this.props.isChecked || false });
  }

  componentDidUpdate(prevProps: Readonly<IBouncyCheckboxProps>): void {
    if (prevProps.isChecked !== this.props.isChecked) {
      this.setState({
        checked: this.props.isChecked,
      });
    }
  }

  bounceEffect = (value: number, velocity: number, bounciness: number) => {
    const { useNativeDriver = true } = this.props;
    Animated.spring(this.state.bounceValue, {
      toValue: value,
      velocity,
      bounciness,
      useNativeDriver,
    }).start();
  };

  renderCheckIcon = () => {
    const { checked } = this.state;
    const {
      size = 25,
      iconStyle,
      iconComponent,
      iconImageStyle,
      fillColor = '#ffc484',
      ImageComponent = Image,
      unfillColor = 'transparent',
      disableBuiltInState,
      isChecked,
      innerIconStyle,
      // checkIconImageSource = defaultCheckImage,
      isPartial = false,
    } = this.props;

    const checkStatus = disableBuiltInState ? isChecked! : checked;

    return (
      <Animated.View
        style={[
          { transform: [{ scale: this.state.bounceValue }] },
          styles.iconContainer(size, checkStatus, fillColor, unfillColor),
          iconStyle,
        ]}
      >
        <View style={[styles.innerIconContainer(size, fillColor), innerIconStyle]}>
          {iconComponent ||
            (checkStatus && (
              <ImageComponent
                source={require('../assets/images/check.png')}
                style={[styles.iconImageStyle, iconImageStyle]}
              />
            ))}
          {isPartial && !isChecked && <View style={styles.partialCheckInnerContainer}></View>}
        </View>
      </Animated.View>
    );
  };

  renderCheckboxText = () => {
    const {
      text,
      textComponent,
      isChecked,
      textStyle,
      textContainerStyle,
      disableBuiltInState,
      disableText = false,
    } = this.props;
    const { checked } = this.state;
    const checkDisableTextType = typeof disableText === 'undefined';
    return (
      (!disableText || checkDisableTextType) &&
      (textComponent || (
        <View style={[styles.textContainer, textContainerStyle]}>
          <Text style={[_textStyle(disableBuiltInState ? isChecked! : checked), textStyle]}>{text}</Text>
        </View>
      ))
    );
  };

  onPress = () => {
    const { disableBuiltInState = false } = this.props;
    const { checked } = this.state;
    if (!disableBuiltInState) {
      this.setState({ checked: !checked }, () => {
        this.props.onPress && this.props.onPress(this.state.checked, this.props.value);
      });
    } else {
      this.props.onPress && this.props.onPress(this.state.checked, this.props.value);
    }
  };

  render() {
    const {
      style,
      bounceEffectIn = 0.9,
      bounceEffectOut = 1,
      bounceVelocityIn = 0.1,
      bounceVelocityOut = 0.4,
      bouncinessIn = 20,
      bouncinessOut = 20,
      TouchableComponent = Pressable,
    } = this.props;
    return (
      <TouchableComponent
        {...this.props}
        style={[styles.container, style]}
        onPressIn={() => {
          this.bounceEffect(bounceEffectIn, bounceVelocityIn, bouncinessIn);
        }}
        onPressOut={() => {
          this.bounceEffect(bounceEffectOut, bounceVelocityOut, bouncinessOut);
        }}
        onPress={this.onPress}
      >
        {this.renderCheckIcon()}
        {this.renderCheckboxText()}
      </TouchableComponent>
    );
  }
}

export const _iconContainer = (size: number, checked: boolean, fillColor: string, unfillColor: string): ViewStyle => {
  return {
    width: size,
    height: size,
    borderRadius: size / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: checked ? fillColor : unfillColor,
  };
};

export const _textStyle = (checked: boolean): TextStyle => {
  return {
    fontSize: 16,
    color: '#757575',
    // textDecorationLine: checked ? 'line-through' : 'none',
  };
};

const styles = StyleSheet.create<any>({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconImageStyle: {
    width: 10,
    height: 10,
  },
  textContainer: {
    marginLeft: 16,
  },
  partialCheckInnerContainer: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: '#ffc484',
  },
  iconContainer: (size: number, checked: boolean, fillColor: string, unfillColor: string) => ({
    width: size,
    height: size,
    // borderRadius: size / 2,
    backgroundColor: checked ? fillColor : unfillColor,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  innerIconContainer: (size: number, fillColor: string) => ({
    width: size,
    height: size,
    borderWidth: 1,
    borderColor: fillColor,
    // borderRadius: size / 2,
    alignItems: 'center',
    justifyContent: 'center',
  }),
});

export default BouncyCheckbox;
