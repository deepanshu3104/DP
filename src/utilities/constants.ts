import { Dimensions } from "react-native";

export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;

export const colors = {
  white: "white",
  black: "black",
  red: "red",
  main1: "#191716",
  main2:   'black' //"#DADFF7",
};

export const fonts = {
  playregular: "PlaywriteCU-Regular",
};

export const Gender = [
  {key:1,label:'Male'},
  {key:2,label:'Female'},
  {key:3,label:'Transgender'}
]
