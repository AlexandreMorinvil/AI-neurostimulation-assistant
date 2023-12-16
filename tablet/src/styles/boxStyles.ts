import { StyleSheet } from 'react-native';
import { COLOR_BACKGROUND, COLOR_TEXT } from './colorStyles.js';

const HEADER_HEIGHT = 80;
const HEADER_FONT_SIZE = 20;
const BOX_BORDER_RADIUS = 20;

export const boxStyles = StyleSheet.create({
  container: {
    padding: 10,
  },
  shadow: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    borderRadius: BOX_BORDER_RADIUS,
  },
  headerContainer: {
    backgroundColor: COLOR_BACKGROUND.AccordionItemHeader,
    flexDirection: "row",
    alignItems: "center",
    height: HEADER_HEIGHT,
    width: "100%",
    borderTopRightRadius: BOX_BORDER_RADIUS,
    borderTopLeftRadius: BOX_BORDER_RADIUS,
  },
  closedHeaderContainer: {
    borderBottomRightRadius: BOX_BORDER_RADIUS,
    borderBottomLeftRadius: BOX_BORDER_RADIUS,
  },
  headerSummaryText: {
    color: 'white',
    fontSize: 20,
  },
  contentContainer: {
    backgroundColor: COLOR_BACKGROUND.AccordionItemContent,
    padding: 25,
    borderBottomLeftRadius: BOX_BORDER_RADIUS,
    borderBottomRightRadius: BOX_BORDER_RADIUS,
  },
  contentContainerBottomRow: {
    backgroundColor: COLOR_BACKGROUND.AccordionItemContent,
    borderBottomLeftRadius: BOX_BORDER_RADIUS,
    borderBottomRightRadius: BOX_BORDER_RADIUS,
  },
  contentContainerRow: {
    backgroundColor: COLOR_BACKGROUND.AccordionItemContent,
  },
  expandIconArea: {
    height: HEADER_HEIGHT,
    width: HEADER_HEIGHT,
  },
  expandIcon: {
    fontSize: 50,
    alignItems: "center",
    textAlign: "center",
    height: HEADER_HEIGHT,
    width: HEADER_HEIGHT,
  },
  title: {
    color: COLOR_TEXT.AccordionItemHeader,
    fontSize: HEADER_FONT_SIZE,
    fontWeight: "bold",
  },
  invisible: {
    display: 'none'
  }
});