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
  ViewStyle,
  Pressable,
  Keyboard,
  TextStyle,
} from 'react-native';

export interface MultipleSelectListProps {
  /**
   * Fn to set Selected option value which will be stored in your local state
   */
  setSelected: Function;

  setAmountValue?: Function;

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
   * set text of label which appears soon after multiple values are selected
   */
  label?: string;

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
   * Additional styles for disabled checkbox
   */
  disabledCheckBoxStyles?: ViewStyle;

  /**
   * Additional styles for checkbox
   */
  checkBoxStyles?: ViewStyle;

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

  /**
   * Additional styles for multiselect badge
   */
  badgeStyles?: ViewStyle;

  /**
   * Additional styles for multiselect badge text
   */
  badgeTextStyles?: ViewStyle;

  /**
   * Additional styles for label
   */
  labelStyles?: TextStyle;

  splitEqualy?: boolean;

  selectedValues;

  amountValue?;
}

type L1Keys = { key?: any; value?: any; disabled?: boolean | undefined; amount?: number };

const MultipleSelect: React.FC<MultipleSelectListProps> = ({
  fontFamily,
  setSelected,
  placeholder,
  boxStyles,
  inputStyles,
  dropdownStyles,
  dropdownItemStyles,
  dropdownTextStyles,
  maxHeight,
  data,
  searchicon = false,
  arrowicon = false,
  closeicon = false,
  search = true,
  searchPlaceholder = 'Search User',
  onSelect = () => {},
  label,
  notFoundText = 'No data found',
  disabledItemStyles,
  disabledTextStyles,
  disabledCheckBoxStyles,
  labelStyles,
  badgeStyles,
  badgeTextStyles,
  checkBoxStyles,
  save = 'key',
  dropdownShown = false,
  setAmountValue,
  splitEqualy = true,
  selectedValues,
  amountValue,
}) => {
  const oldOption = React.useRef(null);
  const [_firstRender, _setFirstRender] = React.useState<boolean>(true);
  const [dropdown, setDropdown] = React.useState<boolean>(dropdownShown);
  const [selectedval, setSelectedVal] = React.useState<any>([]);
  const [height, setHeight] = React.useState<number>(350);
  const animatedvalue = React.useRef(new Animated.Value(0)).current;
  const [filtereddata, setFilteredData] = React.useState(data);
  const [amount, setAmount] = React.useState([]);

  useEffect(() => {
    setSelectedVal(selectedValues);
  }, [selectedValues]);

  useEffect(() => {
    setAmount(amountValue || []);
  }, [amountValue]);

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
            <TouchableOpacity
              onPress={() => {
                slideup();
                setFilteredData(data);
              }}
            >
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
      ) : selectedval?.length > 0 ? (
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
          <View>
            <Text style={[{ fontWeight: '600', fontFamily }, labelStyles]}>{label}</Text>
            <View style={{ flexDirection: 'row', marginBottom: 8, flexWrap: 'wrap' }}>
              {selectedval?.map((item, index) => {
                const amountValue = amount?.find((value) => value?.key === item.key)?.amount;
                const displayValue = `${item.value}${!splitEqualy && amountValue ? `(${amountValue})` : ''}`;
                return (
                  <View
                    key={index}
                    style={[
                      {
                        backgroundColor: 'gray',
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        borderRadius: 50,
                        marginRight: 10,
                        marginTop: 10,
                      },
                      badgeStyles,
                    ]}
                  >
                    <Text style={[{ color: 'white', fontSize: 12, fontFamily }, badgeTextStyles]}>
                      {/* {item.value}
                      {!splitEqualy && {`${amountValue}`}} */}
                      {displayValue}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </TouchableOpacity>
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
            {selectedval == '' ? (placeholder ? placeholder : 'Select option') : selectedval}
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
          <View style={[{ maxHeight: height }]}>
            <ScrollView contentContainerStyle={{ paddingVertical: 10 }} nestedScrollEnabled={true}>
              {filtereddata.length >= 1 ? (
                filtereddata.map((item: L1Keys, index: number) => {
                  let key = item.key ?? item.value ?? item;
                  let value = item.value ?? item;
                  let disabled = item.disabled ?? false;
                  const amountValue = amount.find((value) => value?.key === key)?.amount || null;

                  const isSelected = selectedval.some((selected) => selected.key === item.key);

                  if (disabled) {
                    return (
                      <TouchableOpacity style={[styles.disabledoption, disabledItemStyles]} key={index}>
                        <View
                          style={[
                            {
                              width: 15,
                              height: 15,
                              marginRight: 10,
                              borderRadius: 3,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#c4c5c6',
                            },
                            disabledCheckBoxStyles,
                          ]}
                        >
                          {isSelected ? (
                            <Image
                              key={index}
                              source={require('../assets/images/dropdowncheck.png')}
                              resizeMode="contain"
                              style={[{ width: 8, height: 8, paddingLeft: 7 }]}
                            />
                          ) : null}
                        </View>
                        <Text style={[{ fontFamily, color: '#c4c5c6' }, disabledTextStyles]}>{value}</Text>
                      </TouchableOpacity>
                    );
                  } else {
                    return (
                      <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <TouchableOpacity
                          style={[styles.option, dropdownItemStyles]}
                          key={index}
                          onPress={() => {
                            let existing = selectedval?.indexOf(item);

                            if (existing != -1 && existing != undefined) {
                              let sv = [...selectedval];
                              sv.splice(existing, 1);
                              setSelectedVal(sv);

                              setSelected((val: any) => {
                                let temp = [...val];
                                temp.splice(existing, 1);
                                return temp;
                              });

                              // onSelect()
                            } else {
                              setSelected((val: any) => {
                                let temp = [...new Set([...val, item])];
                                return temp;
                              });
                              setSelectedVal((val: any) => {
                                let temp = [...new Set([...val, item])];
                                return temp;
                              });

                              // onSelect()
                            }
                          }}
                        >
                          <View
                            style={[
                              {
                                width: 15,
                                height: 15,
                                borderWidth: 1,
                                marginRight: 10,
                                borderColor: 'gray',
                                borderRadius: 3,
                                justifyContent: 'center',
                                alignItems: 'center',
                              },
                              checkBoxStyles,
                            ]}
                          >
                            {isSelected ? (
                              <Image
                                key={index}
                                source={require('../assets/images/dropdowncheck.png')}
                                resizeMode="contain"
                                style={{ width: 8, height: 8, paddingLeft: 7 }}
                              />
                            ) : null}
                          </View>
                          <Text style={[{ fontFamily }, dropdownTextStyles]}>{value}</Text>
                        </TouchableOpacity>
                        {isSelected && !splitEqualy && (
                          <TextInput
                            focusable={false}
                            style={styles.input}
                            onChangeText={(value) => {
                              const amountData = [...amount];
                              amountData[index] = { key: key, amount: parseInt(value, 10) };
                              setAmount(amountData);
                              setAmountValue(amountData);
                            }}
                            value={amountValue}
                            // placeholder="Enter Group Name"
                          />
                        )}
                      </View>
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
                  <Text style={dropdownTextStyles}>{notFoundText}</Text>
                </TouchableOpacity>
              )}
            </ScrollView>

            {selectedval?.length > 0 ? (
              <Pressable>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: 20,
                  }}
                >
                  <Text style={{ marginRight: 20, fontWeight: '600', fontFamily }}>Selected</Text>
                  <View style={{ height: 1, flex: 1, backgroundColor: 'gray' }} />
                </View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20, flexWrap: 'wrap' }}>
                  {selectedval?.map((item, index) => {
                    const amountValue = amount?.find((value) => value?.key === item.key)?.amount;
                    const displayValue = `${item.value}${!splitEqualy && amountValue ? `(${amountValue})` : ''}`;

                    return (
                      <View
                        key={index}
                        style={[
                          {
                            backgroundColor: 'gray',
                            paddingHorizontal: 20,
                            paddingVertical: 5,
                            borderRadius: 50,
                            marginRight: 10,
                            marginTop: 10,
                          },
                          badgeStyles,
                        ]}
                      >
                        <Text style={[{ color: 'white', fontSize: 12, fontFamily }, badgeTextStyles]}>
                          {displayValue}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </Pressable>
            ) : null}
          </View>
        </Animated.View>
      ) : null}
    </View>
  );
};

export default MultipleSelect;

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dropdown: { borderWidth: 1, borderRadius: 10, borderColor: 'gray', overflow: 'hidden' },
  option: { paddingHorizontal: 20, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', width: '37%' },
  disabledoption: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  input: {
    borderBottomWidth: 1,
    padding: 4,
    right: 11,
    position: 'absolute',
    width: 90,
  },
});
