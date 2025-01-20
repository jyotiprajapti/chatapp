import { StyleSheet } from "react-native";
import { colors } from "../config/constants";
import { moderateScale, verticalScale } from "./Metrics";

const styles =StyleSheet.create({
  container: {
    backgroundColor: 'green',
    height:verticalScale(790)
  },
  title: {
    fontSize: moderateScale(36),
    fontWeight: 'bold',
    color: colors.maroon,
    alignSelf: 'center',
    paddingTop: moderateScale(45),
  },
  title2: {
    fontSize: moderateScale(30),
    color: colors.teal,
    alignSelf: 'center',
    fontWeight:'bold',
  },
  input: {
    backgroundColor: '#F6F7FB',
    height: moderateScale(58),
    marginBottom: moderateScale(20),
    fontSize: moderateScale(16),
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
  },
  backImage: {
    width: '100%',
    height: verticalScale(340),
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '85%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'pink',
    borderTopLeftRadius: moderateScale(60),
    borderTopRightRadius: moderateScale(60),
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: moderateScale(30),
  },
  button: {
    backgroundColor: colors.primary,
    height: moderateScale(58),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(30),
  },
});

export default styles