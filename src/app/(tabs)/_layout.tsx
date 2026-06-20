import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue',
        tabBarStyle: { 
            backgroundColor: 'lightgray',
            height: 90,
            paddingBottom: 30,
            paddingTop: 10,
         },
         tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
         },
         headerShown: false
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'ToDos',
          tabBarIcon: ({ color, size }) => <Ionicons name="flash-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
