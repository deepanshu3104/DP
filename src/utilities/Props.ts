import {
  TextInputProps,
  TextProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { ImageStyle, ResizeMode, Source } from "react-native-fast-image";

export interface InitialProps {
  route?:any
  navigation?:any
}
export interface WrapperProps {
  children?: React.ReactNode;
  value?:string;
  onPress?: () => void;

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
  title?: string;
  opacity?: number;
}

export interface TouchableTextProps extends TouchableOpacityProps {
  vstyle?: ViewStyle;
  text?: string;
  style?: TextStyle;
}

export interface TouchableImageProps extends TouchableOpacityProps {
  vstyle?: ViewStyle;
  style?: ImageStyle;
  source?: Source;
  resizeMode?: ResizeMode;
  tintColor?: string;
}

export interface CommonInputProps extends TextInputProps {
  label?: string;
  focus?: any;
  iconSource?: any;
  isicon?: 'yes' | 'no';
  iconstyle?: ImageStyle;
  error?: string | any;
  showlabel?: 'yes' | 'no';
  errorspacing?: 'yes' | 'no';
  lefticon?: 'yes' | 'no';
  multi?: 'yes' | 'no';
  width?: number;
  placeholderTextColor?: string;
  eye?: 'yes' | 'no';
  eyename?: any;
  onPress?: () => void;
  eyestyle?: ImageStyle;
}

export interface CommonInputBtnProps {
  onPress?: () => void;
  value?: string;
  error?: any;
  color?: string;
  iconSource?: any;
  iconstyle?: any;
  errorspacing?: 'yes' | 'no';
  isdropdown?: 'yes' | 'no';
  dropSource?: any;
  dropstyle?: any;
}

export interface HeaderProps{
  onPress?: () => void;
  title?:string
}
export interface CommonExploreProps {
  onPress?: () => void;
  title?: string;
  opacity?: number;
  source?: Source;
  onLongPress?: () => void;
}
