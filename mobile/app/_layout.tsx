import { Slot } from 'expo-router';
import { AuthProvider } from '@cont/AuthContext';
import { DataProvider } from '../contexts/DataContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <DataProvider>
        <Slot />
      </DataProvider>
    </AuthProvider>
  );
}
