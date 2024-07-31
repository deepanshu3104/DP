import {Dropdown} from 'react-native-element-dropdown';
import {colors, Colors, width} from './constants';
import {Text, View} from 'react-native';
import {ImageComponent} from './Helpers';

export const DropInput = ({
  data,
  placeholder,
  label,
  imgsrc,
  value,
  onChange,
  error,
  errorspacing,
}) => {
  return (
    <View>
      <Dropdown
    containerStyle={{
      backgroundColor:colors.main1,
      borderColor: colors.main2,
    }}
    
        style={{
          position: 'relative',
          alignSelf: 'center',
          shadowColor: colors.main2,
          shadowOpacity: 0.5,
          shadowRadius: 2,
          borderColor: colors.main2,
          shadowOffset: {width: 0, height: 0},
          borderWidth: 1,
          height: 50,
          backgroundColor:colors.main1,
          borderRadius:8,
          alignItems: 'center',
          width: width / 1.1,
          elevation: 5,
          paddingLeft: 15,
        }}
        data={data}
        placeholderStyle={{
          fontSize: 14,
          color: colors.red,
        }}
        selectedTextStyle={{
          color: colors.main2,
          fontSize: 14,
        }}
        iconColor={colors.main2}
        iconStyle={{right: 10}}
        maxHeight={300}
        labelField={label}
        valueField={label}
        placeholder={placeholder}
        searchPlaceholder="Search..."
        renderLeftIcon={() => (
          <ImageComponent
            tintColor={colors.main2}
            source={imgsrc}
            style={{width: 25, height: 25, marginRight: 10}}
          />
        )}
        value={value}
        onChange={onChange}
      />
      <Text
        style={{
          fontSize: 12,
          color: 'red',
          marginVertical: errorspacing === 'yes' ? 10 : 2,
          left: 15,
        }}>
        {error}
      </Text>
    </View>
  );
};
