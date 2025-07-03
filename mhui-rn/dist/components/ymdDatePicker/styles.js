import { StyleSheet } from 'react-native';
import { FontPrimary, FontSecondary } from "../../constants/font";
export default StyleSheet.create({
  main: {
    padding: 27,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    position: 'absolute',
    width: '100%'
  },
  title: { ...FontPrimary,
    height: 22,
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    color: '#000000'
  },
  switch: {
    marginTop: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.15)',
    borderStyle: 'solid'
  },
  center: { ...FontPrimary,
    height: 21,
    fontSize: 16,
    lineHeight: 21,
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.8)',
    textAlign: 'center'
  },
  arrow: {
    height: 32,
    width: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subtitle: { ...FontPrimary,
    marginTop: 35.75,
    height: 22,
    fontSize: 20,
    lineHeight: 22,
    fontStyle: 'normal',
    color: '#000000',
    marginBottom: 21
  },
  linetitle: { ...FontSecondary,
    fontSize: 12,
    lineHeight: 22,
    width: 42,
    height: 22,
    color: 'rgba(0, 0, 0, 0.4)',
    textAlign: 'center',
    marginBottom: 13
  },
  weeks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: -11,
    marginRight: -11
  },
  week: {
    fontSize: 18,
    textAlign: 'center',
    width: 42,
    height: 42,
    lineHeight: 42,
    marginTop: 8,
    color: '#000000',
    fontStyle: 'normal',
    ...FontSecondary,
    borderRadius: 21,
    overflow: 'hidden'
  },
  month: {
    fontSize: 16,
    textAlign: 'center',
    width: 50,
    height: 50,
    lineHeight: 50,
    marginTop: 20,
    fontStyle: 'normal',
    ...FontPrimary,
    color: '#000000',
    borderRadius: 25,
    overflow: 'hidden'
  },
  event: {
    position: 'absolute',
    bottom: 2,
    left: 19
  },
  readonly: {
    color: 'rgba(0, 0, 0, 0.2)'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginTop: 19,
    borderRadius: 86,
    height: 45,
    flex: 1,
    marginHorizontal: 12
  },
  text: {
    lineHeight: 45,
    fontSize: 16,
    fontStyle: 'normal',
    ...FontSecondary,
    textAlign: 'center'
  }
});