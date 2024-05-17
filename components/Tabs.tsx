import React from 'react';
import { Animated, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationState, Route, SceneRendererProps, TabView } from 'react-native-tab-view';
import { COLORS } from '../constants/Colors';
import { View, Text } from './Themed';

interface ITabViewComponent {
  setIsTabState: React.Dispatch<
    React.SetStateAction<{
      index: number;
      routes: {
        key: string;
        title: string;
      }[];
    }>
  >;
  tabState: {
    index: number;
    routes: {
      key: string;
      title: string;
    }[];
  };
  renderScene: ({ route, jumpTo, position }) => JSX.Element;
  renderHeader?: () => JSX.Element;
}

const TabViewComponent = (props: ITabViewComponent) => {
  const { setIsTabState, tabState, renderScene, renderHeader } = props;
  const handleChange = (index: number) => {
    setIsTabState({ ...tabState, index: index });
  };

  const renderTabs = (renderTabsProps: SceneRendererProps & { navigationState: NavigationState<Route> }) => {
    const inputRange = renderTabsProps.navigationState.routes.map((x, i) => i);

    return (
      <View>
        {renderHeader && renderHeader()}
        <View style={styles.tabBar}>
          {renderTabsProps.navigationState.routes.map((route, i) => {
            const opacity = renderTabsProps.position.interpolate({
              inputRange,
              outputRange: inputRange.map((inputIndex) => (inputIndex === i ? 1 : 0.5)),
            });

            return (
              <TouchableOpacity key={i} style={styles.tabItem} onPress={() => setIsTabState({ ...tabState, index: i })}>
                <Animated.Text style={{ fontSize: 14, fontWeight: '500' }}>{route?.title}</Animated.Text>
                {tabState.index === i && <View style={styles.tabIndicator}></View>}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <TabView
        navigationState={tabState}
        renderScene={renderScene}
        renderTabBar={renderTabs}
        onIndexChange={handleChange}
      />
    </View>
  );
};

export default TabViewComponent;

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    position: 'relative',
    borderBottomColor: COLORS.lightGrey,
    borderBottomWidth: 1,
    marginTop: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -1,
    backgroundColor: '#EB2549',
    width: '100%',
    height: 3,
  },
});
