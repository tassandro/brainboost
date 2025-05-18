import  FloatingMenu from '@comp/menu';
import UrlForm from '@comp/urlForm';
import Wating from '@comp/waiting';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {

  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
      <FloatingMenu/>
      <Wating isLoading={isLoading}/>
      <UrlForm setIsLoading={setIsLoading}/>
    </SafeAreaView>
  );
}
