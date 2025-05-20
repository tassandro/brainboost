// // app/(tabs)/_layout.tsx
import { Redirect, Tabs } from 'expo-router';
import { useAuth, AuthProvider } from '@cont/AuthContext';
import { DataProvider } from '@cont/DataContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function ProtectedLayout() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <>
      <SafeAreaProvider>
        <AuthProvider>
          <DataProvider>
            <Tabs screenOptions={({route}) => ({
              headerShown: false,
              tabBarStyle: (
                route.name === 'profile' ||
                route.name === 'questions') ?
                { display: 'none' } : {},
              })}>
              <Tabs.Screen name="profile" />
            </Tabs>
          </DataProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </>
  );
}

