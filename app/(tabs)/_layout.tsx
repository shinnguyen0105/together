import { Tabs } from 'expo-router';
import React from 'react';

import { CommonIcon } from '@/components/navigation/CommonIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <CommonIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <CommonIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
        <Tabs.Screen
            name="reminder"
            options={{
                title: 'Reminder',
                tabBarIcon: ({ color, focused }) => (
                    <CommonIcon name={focused ? 'alert-circle-sharp' : 'alert-circle-outline'} color={color} />
                ),
            }}
        />
    </Tabs>
  );
}
