import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import ThemedText from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Page Not Found' }} />
      <ThemedView style={styles.container}>
        {/* Visual Element: Represents a "Search" or "Missing" indicator */}
        <View style={styles.iconCircle}>
           <ThemedText style={{ fontSize: 40 }}>🎓</ThemedText>
        </View>

        <ThemedText type="title" style={styles.title}>
          Content Not Found
        </ThemedText>
        
        <ThemedText style={styles.message}>
          The page you are looking for might have been moved or no longer exists in the school portal.
        </ThemedText>

        <Link href="/" style={styles.button}>
          <ThemedText style={styles.buttonText}>Return to Dashboard</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#F5F7FA', // Light, academic neutral background
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E1E8ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#58667E',
    lineHeight: 22,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#003366', // Traditional school blue
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
