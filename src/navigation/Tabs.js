import React, { useContext } from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import Profile from '../screens/profile/Profile';
import { TABS } from '../constant/tabs';
import { RealScreen } from '../screens/reals/reals';
import SearchScreen from '../screens/search/search';
import Notifications from '../screens/notification/Notifications';
import Context from '../../context';
const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { user } = useContext(Context);
  console.log(user,"useruser");
  return (
    <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#fff',
      inactiveTintColor: 'lightgray',
      activeBackgroundColor: 'black',
      inactiveBackgroundColor: 'black',
          style: {
                backgroundColor: 'black',
                paddingBottom: 3
          },
        showLabel: false 
   }}
     screenOptions={({ route }) => ({
      tabBarContentContainerStyle: {backgroundColor : 'red'},
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'Feed') {
          const homeIcon =focused ? TABS[0].active : TABS[0].inactive;
          return <Image style={styles.tabBarIconStyle} source={{uri:homeIcon}} />
        }else if (route.name === 'Search') {
          const profileIcon = focused ? TABS[1].active : TABS[1].inactive;
          return <Image style={styles.tabBarIconStyle} source={{uri:profileIcon}} />
        }
         else if (route.name === 'Notifications') {
          const notificationIcon = focused ? TABS[5].active : TABS[5].inactive;
          return <Image style={styles.tabBarIconStyle} source={{uri:notificationIcon}} />
        } else if (route.name === 'Profile') {
          const profileIcon = focused ? user.avatar : user.avatar ;
          return <Image style={styles.profilePic} source={{uri:profileIcon}} />
        }else if (route.name === 'Reals') {
          const profileIcon = focused ? TABS[2].active : TABS[2].inactive;
          return <Image style={styles.tabBarIconStyle} source={{uri:profileIcon}} />
        }
        return null;
      },
      tabBarLabelStyle: styles.tabBarLabelStyle,
      tabBarActiveTintColor: 'white',
      
      tabBarInactiveTintColor: 'white',
      headerShown: false,
      unmountOnBlur: true,
      
    })}>
      <Tab.Screen name="Feed" component={Home} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Reals" component={RealScreen} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Profile" component={Profile} />
      
      
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarIconStyle: {
    width: 24,
    height: 24,
    borderColor: '#fff',
  },  
  tabBarLabelStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  profilePic: {
    borderRadius: 50,
    borderWidth: 2,
    height:28,
    width:28,
    borderColor: '#fff',
  },
});

export default Tabs;