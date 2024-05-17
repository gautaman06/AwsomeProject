import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  TextInput,
  Keyboard,
  ViewStyle,
  TextStyle,
} from 'react-native';

type L1Keys = { key?: any; value?: any; disabled?: boolean | undefined };

export interface SelectListProps {
  selectedValue: any;

  /**
   * Fn to set Selected option value which will be stored in your local state
   */
  setSelected: Function;

  /**
   * Placeholder text that will be displayed in the select box
   */
  placeholder?: string;

  /**
   * Additional styles for select box
   */
  boxStyles?: ViewStyle;

  /**
   *  	Additional styles for text of select box
   */
  inputStyles?: TextStyle;

  /**
   *  	Additional styles for dropdown scrollview
   */
  dropdownStyles?: ViewStyle;

  /**
   *  Additional styles for dropdown list item
   */
  dropdownItemStyles?: ViewStyle;

  /**
   * Additional styles for list items text
   */
  dropdownTextStyles?: TextStyle;

  /**
   * Maximum height of the dropdown wrapper to occupy
   */
  maxHeight?: number;

  /**
   * Data which will be iterated as options of select list
   */
  data: Array<{}>;

  /**
   * The default option of the select list
   */
  defaultOption?: { key: any; value: any };

  /**
   * Pass any JSX to this prop like Text, Image or Icon to show instead of search icon
   */
  searchicon?: JSX.Element;

  /**
   *  Pass any JSX to this prop like Text, Image or Icon to show instead of chevron icon
   */
  arrowicon?: JSX.Element;

  /**
   * set to false if you dont want to use search functionality
   */
  search?: boolean;

  /**
   * set to false if you dont want to use search functionality
   */
  searchPlaceholder?: string;

  /**
   * Trigger an action when option is selected
   */
  onSelect?: () => void;

  /**
   * set fontFamily of whole component Text
   */
  fontFamily?: string;

  /**
   * set this to change the default search failure text
   */
  notFoundText?: string;

  /**
   * Additional styles for disabled list item
   */
  disabledItemStyles?: ViewStyle;

  /**
   * Additional styles for disabled list items text
   */
  disabledTextStyles?: TextStyle;

  /**
   * What to store inside your local state (key or value)
   */
  save?: 'key' | 'value';

  /**
   * Control the dropdown with this prop
   */
  dropdownShown?: boolean;

  /**
   *  Pass any JSX to this prop like Text, Image or Icon to show instead of close icon
   */
  closeicon?: JSX.Element;
}

const SingleSelect: React.FC<SelectListProps> = ({
  setSelected,
  placeholder,
  boxStyles,
  inputStyles,
  dropdownStyles,
  dropdownItemStyles,
  dropdownTextStyles,
  maxHeight,
  data,
  defaultOption,
  searchicon = false,
  arrowicon = false,
  closeicon = false,
  search = true,
  searchPlaceholder = 'Search',
  notFoundText = 'No data found',
  disabledItemStyles,
  disabledTextStyles,
  onSelect = () => {},
  save = 'key',
  dropdownShown = false,
  fontFamily,
  selectedValue,
}) => {
  const oldOption = React.useRef(null);
  const [_firstRender, _setFirstRender] = React.useState<boolean>(true);
  const [dropdown, setDropdown] = React.useState<boolean>(dropdownShown);
  const [selectedval, setSelectedVal] = React.useState<any>(null);
  const [height, setHeight] = React.useState<number>(200);
  const animatedvalue = React.useRef(new Animated.Value(0)).current;
  const [filtereddata, setFilteredData] = React.useState(data);

  useEffect(() => {
    setSelectedVal(selectedValue);
  }, [selectedValue]);

  const slidedown = () => {
    setDropdown(true);
    Animated.timing(animatedvalue, {
      toValue: height,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const slideup = () => {
    Animated.timing(animatedvalue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setDropdown(false));
  };

  React.useEffect(() => {
    if (maxHeight) setHeight(maxHeight);
  }, [maxHeight]);

  React.useEffect(() => {
    setFilteredData(data);
  }, [data]);

  React.useEffect(() => {
    if (_firstRender) {
      _setFirstRender(false);
      return;
    }
    onSelect();
  }, [selectedval]);

  React.useEffect(() => {
    if (!_firstRender && defaultOption && oldOption.current != defaultOption.key) {
      // oldOption.current != null
      oldOption.current = defaultOption.key;
      setSelected(defaultOption.key);
      setSelectedVal(defaultOption.value);
    }
    if (defaultOption && _firstRender && defaultOption.key != undefined) {
      oldOption.current = defaultOption.key;
      setSelected(defaultOption.key);
      setSelectedVal(defaultOption.value);
    }
  }, [defaultOption]);

  React.useEffect(() => {
    if (!_firstRender) {
      if (dropdownShown) slidedown();
      else slideup();
    }
  }, [dropdownShown]);

  return (
    <View>
      {dropdown && search ? (
        <View style={[styles.wrapper, boxStyles]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            {!searchicon ? (
              <Image
                source={require('../assets/images/search.png')}
                resizeMode="contain"
                style={{ width: 20, height: 20, marginRight: 7 }}
              />
            ) : (
              searchicon
            )}

            <TextInput
              placeholder={searchPlaceholder}
              onChangeText={(val) => {
                let result = data.filter((item: L1Keys) => {
                  val.toLowerCase();
                  let row = item.value.toLowerCase();
                  return row.search(val.toLowerCase()) > -1;
                });
                setFilteredData(result);
              }}
              style={[{ padding: 0, height: 20, flex: 1, fontFamily }, inputStyles]}
            />
            <TouchableOpacity onPress={() => slideup()}>
              {!closeicon ? (
                <Image
                  source={require('../assets/images/close.png')}
                  resizeMode="contain"
                  style={{ width: 17, height: 17 }}
                />
              ) : (
                closeicon
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.wrapper, boxStyles]}
          onPress={() => {
            if (!dropdown) {
              Keyboard.dismiss();
              slidedown();
            } else {
              slideup();
            }
          }}
        >
          <Text style={[{ fontFamily }, inputStyles]}>
            {selectedval ? selectedval?.value : placeholder ? placeholder : 'Select option'}
          </Text>
          {!arrowicon ? (
            <Image
              source={require('../assets/images/chevron.png')}
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
            />
          ) : (
            arrowicon
          )}
        </TouchableOpacity>
      )}

      {dropdown ? (
        <Animated.View style={[{ maxHeight: animatedvalue }, styles.dropdown, dropdownStyles]}>
          <ScrollView contentContainerStyle={{ paddingVertical: 10, overflow: 'hidden' }} nestedScrollEnabled={true}>
            {filtereddata.length >= 1 ? (
              filtereddata.map((item: L1Keys, index: number) => {
                let key = item.key ?? item.value ?? item;
                let value = item.value ?? item;
                let disabled = item.disabled ?? false;
                if (disabled) {
                  return (
                    <TouchableOpacity
                      style={[styles.disabledoption, disabledItemStyles]}
                      key={index}
                      onPress={() => {}}
                    >
                      <View style={{ position: 'relative', justifyContent: 'center' }}>
                        <Text style={[{ color: '#c4c5c6', fontFamily }, disabledTextStyles]}>{value}</Text>
                        {selectedval?.value === item.value && (
                          <Image
                            key={index}
                            source={require('../assets/images/dropdowncheck.png')}
                            resizeMode="contain"
                            style={[{ width: 8, height: 8, paddingLeft: 7 }]}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      style={[styles.option, dropdownItemStyles]}
                      key={index}
                      onPress={() => {
                        // if (save === 'value') {
                        //   setSelected(value);
                        // } else {
                        //   setSelected(key);
                        // }
                        setSelected(item);

                        setSelectedVal(item);
                        slideup();
                        setTimeout(() => {
                          setFilteredData(data);
                        }, 800);
                      }}
                    >
                      <View style={{ position: 'relative', justifyContent: 'center' }}>
                        <Text style={[{ fontFamily }, dropdownTextStyles]}>{value}</Text>
                        {selectedval?.value === item.value && (
                          <Image
                            key={index}
                            source={require('../assets/images/dropdowncheck.png')}
                            resizeMode="contain"
                            style={[{ width: 12, height: 12, paddingLeft: 7, position: 'absolute', right: 0 }]}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                }
              })
            ) : (
              <TouchableOpacity
                style={[styles.option, dropdownItemStyles]}
                onPress={() => {
                  setSelected(undefined);
                  setSelectedVal('');
                  slideup();
                  setTimeout(() => setFilteredData(data), 800);
                }}
              >
                <Text style={[{ fontFamily }, dropdownTextStyles]}>{notFoundText}</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </Animated.View>
      ) : null}
    </View>
  );
};

export default SingleSelect;

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdown: { borderWidth: 1, borderRadius: 10, borderColor: 'gray', marginTop: 10, overflow: 'hidden' },
  option: { paddingHorizontal: 20, paddingVertical: 8, overflow: 'hidden' },
  disabledoption: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    opacity: 0.9,
  },
});
