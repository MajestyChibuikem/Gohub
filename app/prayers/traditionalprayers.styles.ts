import { StyleSheet } from 'react-native';

export const createTraditionalPrayerStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    padding: 20
  },
  contentContainer: {
    paddingBottom: 40
  },
  pickerContainer: {
    marginBottom: 20
  },
  pickerLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: theme.text
  },
  pickerWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: theme.card
  },
  picker: {
    color: theme.text,
    backgroundColor: theme.card
  },
  pickerItem: {
    fontSize: 16
  },
  prayerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.text
  },
  prayerContent: {
    marginBottom: 30
  },
  prayerText: {
    marginVertical: 5,
    color: theme.text
  }
});