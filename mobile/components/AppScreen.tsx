import {
  SafeAreaView,
} from 'react-native-safe-area-context';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  StatusBar,
  ViewStyle,
} from 'react-native';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';

type AppScreenProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
};

export default function AppScreen({ children, style, backgroundColor = '#fff' }: AppScreenProps) {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(backgroundColor);
  }, [backgroundColor]);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor }, style]}
        edges={['top', 'left', 'right']}
      >
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {children}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
});
