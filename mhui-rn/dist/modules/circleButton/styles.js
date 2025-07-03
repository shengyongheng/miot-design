import { StyleSheet } from 'react-native';
import { adjustSize } from "../utils/sizes";
import { FontDefault } from "../utils/fonts";
export const Styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  container0: {
    width: adjustSize(120)
  },
  container1: {
    width: adjustSize(168)
  },
  container2: {
    width: adjustSize(150)
  },
  container3: {
    width: adjustSize(138)
  },
  containerHorizontal: {
    width: 'auto',
    flex: 1,
    flexDirection: 'row'
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer0: {
    width: adjustSize(120),
    height: adjustSize(120),
    borderRadius: adjustSize(120) / 2
  },
  iconContainer1: {
    width: adjustSize(168),
    height: adjustSize(168),
    borderRadius: adjustSize(168) / 2
  },
  iconContainer2: {
    width: adjustSize(150),
    height: adjustSize(150),
    borderRadius: adjustSize(150) / 2
  },
  iconContainer3: {
    width: adjustSize(138),
    height: adjustSize(138),
    borderRadius: adjustSize(138) / 2
  },
  iconContainerDisabled: {
    backgroundColor: 'rgba(197, 201, 203, 0.3)'
  },
  iconContainerDisabledSelected: {
    backgroundColor: 'rgba(197, 201, 203, 0.3)'
  },
  icon: {
    resizeMode: 'contain',
    width: adjustSize(72),
    height: adjustSize(72)
  },
  iconText: {
    fontFamily: FontDefault,
    fontSize: adjustSize(36),
    color: '#000'
  },
  iconTextSelected: {
    color: '#FFF'
  },
  title: {
    marginTop: adjustSize(27),
    textAlign: 'center',
    fontSize: adjustSize(42),
    fontFamily: FontDefault,
    color: '#999999'
  },
  title3: {
    display: 'none'
  },
  titleDisabled: {
    color: '#999999'
  },
  titleHorizontal: {
    marginTop: 0,
    flex: 1,
    textAlign: 'left',
    marginLeft: adjustSize(39)
  },
  listContainer: {
    alignItems: 'center'
  }
});