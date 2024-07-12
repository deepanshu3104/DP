import {
  TextProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { ImageStyle, ResizeMode, Source } from "react-native-fast-image";

export interface WrapperProps {
  children?: React.ReactNode;
}
export interface ImageComponentProps {
  style?: ImageStyle;
  source?: Source;
  resizeMode?: ResizeMode;
  tintColor?: string;
}

export interface TouchableComponentProps extends TouchableOpacityProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

export interface AppTextProps extends TextProps {
  style?: TextStyle;
  children: React.ReactNode;
  numberOfLines?: number;
}
export interface CommonbtnProps {
  onPress: () => void;
  title: string;
  opacity?: number;
}
