import { View, Text } from "react-native";
import React from "react";
import { InitialProps } from "../../utilities/Props";
import { AppText, Wrapper } from "../../utilities/Helpers";

const Favourites: React.FC<InitialProps> = (props) => {
  return (
    <Wrapper>
      <AppText>Favourites</AppText>
    </Wrapper>
  );
};

export default Favourites;
