import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return <View><Text>Carregando fontes...</Text></View>;
  }

  return <Stack screenOptions={{ headerTitleStyle: { fontFamily: 'Poppins_400Regular' } }} />;
}
