import React from "react";
import { TabView, SceneMap } from "react-native-tab-view";
import { colors, width } from "../utilities/constants";
import Inbox from "../screens/Inbox";
import { Text, View } from "react-native";
import { TouchableComponent } from "../utilities/Helpers";
import Profile from "../screens/Profile";
import Fontisto from "react-native-vector-icons/Fontisto";
import Home from "../screens/Home";

const routes = [
  { key: "first", title: "Home", icon: "home" },
  { key: "second", title: "Inbox", icon: "hipchat" },
  { key: "third", title: "Profile", icon: "home" },
];

const Tab: React.FC<any>= (props) => {
  const [index, setIndex] = React.useState(0);

  function renderTabBar(props: any) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          backgroundColor: colors.main2,
          height: 45,
          alignItems: "center",
        }}
      >
        {props.navigationState.routes.map((route: any, i: any) => {
          return (
            <TouchableComponent
              style={{}}
              onPress={() => {
                setIndex(i);
              }}
            >
              <Fontisto
                name={route.icon}
                size={25}
                color={index == i ? "white" : "grey"}
              />
            </TouchableComponent>
          );
        })}
      </View>
    );
  }

  const renderScene:any = SceneMap({
    first:()=> Home(props),
    second:() =>Inbox(props),
    third: ()=>Profile(props),
  });
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
