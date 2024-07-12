import { ImageStyle, ResizeMode, Source } from "react-native-fast-image";

export interface ImageComponentProps {
    style?: ImageStyle;
    source?: Source;
    resizeMode?: ResizeMode;
    tintColor?: string;
  }