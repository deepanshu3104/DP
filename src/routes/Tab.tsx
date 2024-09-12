import React from "react";
import { TabView, SceneMap } from "react-native-tab-view";
import Home from "../screens/Home";
import { width } from "../utilities/constants";
import Inbox from "../screens/Inbox";
import { Text, View } from "react-native";
import { TouchableComponent } from "../utilities/Helpers";
import Profile from "../screens/Profile";

const routes = [
  { key: "first", title: "Home" },
  { key: "second", title: "Inbox" },
  { key: "third", title: "Profile" },
];

const Tab = () => {
  const [index, setIndex] = React.useState(0);
  return (
    <TabView
      tabBarPosition="bottom"
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: width }}
    />
  );
};

export default Tab;

const renderScene = SceneMap({
  first: Home,
  second: Inbox,
  third: Profile,
});

function renderTabBar(props: any) {
  console.log(JSON.stringify(props.navigationState.routes));
  
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "red",
        height: 45,
        alignItems: "center",
      }}
    >
      {props.navigationState.routes.map((route: any, i: any) => {

        return (
          <TouchableComponent
            style={{
              backgroundColor: "yellow",
            }}
            onPress={() => {}}
          >
            <Text style={{}}>{route.title}</Text>
          </TouchableComponent>
        );
      })}
    </View>
  );
}
