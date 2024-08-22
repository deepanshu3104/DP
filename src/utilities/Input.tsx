import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { ImageComponent, TouchableComponent } from './Helpers';
import { CommonInputBtnProps, CommonInputProps } from './Props';
import { colors, width } from './constants';
import Icon from 'react-native-vector-icons/FontAwesome'; 

export const CommonInput: React.FC<CommonInputProps> = ({
  label,
  focus,
  secureTextEntry,
  onChangeText,
  value,
  error,
  showlabel,
  errorspacing,
  placeholder,
  lefticon,
  keyboardType,
  maxLength,
  returnKeyType,
  editable,
  multiline,
  blurOnSubmit,
  onFocus,
  onBlur,
  multi,
  textAlignVertical,
  eye,
  eyename,
  eyestyle,
  onPress,
}) => {
  return (
    <View>
      {showlabel === 'yes' && <Text style={styles.label}>{label}</Text>}
      <View style={{ ...styles.textBoxBtnHolder, borderWidth: focus ? 1.5 : 1 }}>
        {focus && <Text style={{ position: 'absolute', top: -12, left: 20, backgroundColor: colors.main1, color: colors.main2, paddingHorizontal: 5, fontWeight: '500' }}>{placeholder}</Text>}
        <TextInput
          underlineColorAndroid="transparent"
          secureTextEntry={secureTextEntry}
          style={[
            styles.textBox,
            {
              paddingRight: lefticon === 'no' ? 10 : 10,
              // paddingLeft: lefticon === 'no' ? 58 : 10,
              minHeight: multi === 'yes' ? 120 : 49,
              paddingVertical: multi === 'yes' ? 10 : 0,
            },
          ]}
          onChangeText={onChangeText}
          value={value}
          placeholder={focus ? '' : placeholder}
          keyboardType={keyboardType}
          maxLength={maxLength}
          returnKeyType={returnKeyType}
          editable={editable}
          multiline={multiline}
          blurOnSubmit={blurOnSubmit}
          onFocus={onFocus}
          onBlur={onBlur}
          textAlignVertical={textAlignVertical}
          placeholderTextColor={colors.main2}
        />
        {eye === 'yes' ? (
          <TouchableComponent
            activeOpacity={0.8}
            style={styles.visibilityBtn}
            onPress={onPress}>
              <Icon name={eyename} size={25} color={colors.main2} />
            {/* <ImageComponent source={eyename} style={eyestyle} /> */}
          </TouchableComponent>
        ) : null}
      </View>
      <Text
        style={{
          fontSize: 12,
          color: colors.red,
          marginVertical: errorspacing === 'yes' ? 12 : 5,
          width:width/1.15,
          alignSelf:'center',
          fontWeight:'600'
        }}>
        {error}
      </Text>
    </View>
  );
};

export const CommonInputBtn: React.FC<CommonInputBtnProps> = ({
  onPress,
  value,
  error,
  color,
  iconSource,
  iconstyle,
  errorspacing,
  isdropdown,
  dropSource,
  dropstyle,
}) => {
  return (
    <View>
      <TouchableComponent onPress={onPress} style={styles.textBoxBtnHolder}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            resizeMode={'contain'}
            style={iconstyle}
            source={iconSource}
            tintColor={colors.main2}
          />
          <Text
            style={{
              // fontFamily: Fonts.Regular,
              color: color,
              fontSize: 14,
              marginLeft: 8,
            }}>
            {value}
          </Text>
        </View>
        {isdropdown === 'no' ? null : (
          <Image style={dropstyle} source={dropSource} />
        )}
      </TouchableComponent>
      <Text
        style={{
          fontSize: 12,
          color: colors.red,
          marginVertical: errorspacing === 'yes' ? 10 : 2,
          left: 15,
        }}>
        {error}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 5,
    fontWeight: '500',
  },
  textBoxBtnHolder: {
    position: 'relative',
    alignSelf: 'center',
    // justifyContent: 'center',
    shadowColor: colors.main2,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    borderColor: colors.main2,
    shadowOffset: { width: 0, height: 0 },
    borderWidth: 1,
    height: 55,
    backgroundColor: colors.main1,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 1.15,
    elevation: 5,
    paddingLeft: 15,
  },
  textBox: {
    fontSize: 14,
    height: 45,
    width: width / 1.35,
    left: 5,
    color: colors.main2
  },
  visibilityBtn: {
    position: 'absolute',
    right: 0,
    height: 55,
    width: 55,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
