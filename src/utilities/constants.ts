import { Dimensions } from "react-native";

export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;

export const colors = {
  white: "white",
  black: "black",
  red: "red",
  main1: "white",
  main2:   "#6A5ACD",
  // main1:"#454545",
  // main2: "black"  
};

export const fonts = {
  playregular: "PlaywriteCU-Regular",
};

export const Gender = [
  {key:1,label:'Male'},
  {key:2,label:'Female'},
  {key:3,label:'Other'}
]

export const Realtion = [
  {key:1,label:'Casual Dating'},
  {key:2,label:'Long-Term Relationship'},
  {key:3,label:'Marriage'},
  {key:4,label:'Friendship'},
  {key:5,label:'Short-Term Fun'},
  {key:6,label:'Travel Buddy'}
]
