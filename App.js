import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Alert, StyleSheet, Text, Platform } from 'react-native';
// import { CometChat } from '@cometchat-pro/react-native-chat's;
import { CometChat } from '@cometchat-pro/react-native-chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './src/screens/login/Login';
import SignUp from './src/screens/register/SignUp';
import Tabs from './src/navigation/Tabs';
import Create from './src/screens/create/Create';
import Detail from './src/screens/posts/Detail';
import Chat from './src/screens/chat/Chat';
import CommentScreen from './src/screens/comment/comment';


import Context from './context';

import { cometChatConfig } from './env';

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const [hasNewPost, setHasNewPost] = useState(false);

  useEffect(() => {
    initCometChat();
    initAuthenticatedUser();
  }, []);

  useEffect(() => {
    if (user) {
      listenCustomMessages();
    }
    return () => {
      if (user) {
        CometChat.removeMessageListener(user.id);
      }
    }
  }, [user]);

  const initCometChat = async () => {
    const appID = `${cometChatConfig.cometChatAppId}`;
    const region = `${cometChatConfig.cometChatRegion}`;
    const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
    CometChat.init(appID, appSetting).then(
      () => {
        console.log('CometChat was initialized successfully');
      },
      error => {
      }
    );
  };

  const initAuthenticatedUser = async () => {
    setLoader(true)
    const authenticatedUser = await AsyncStorage.getItem('auth');
    setUser(() => authenticatedUser ? JSON.parse(authenticatedUser) : null);
    setLoader(false)
  };

  const showMessage = (title, message) => {
    Alert.alert(
      title,
      message
    );
  };

  const listenCustomMessages = () => {
    CometChat.addMessageListener(
      user.id,
      new CometChat.MessageListener({
        onCustomMessageReceived: customMessage => {
          if (customMessage && customMessage.sender && customMessage.sender.uid && customMessage.sender.uid !== user.id && customMessage.data && customMessage.data.customData && customMessage.data.customData.message) {
            if (customMessage && customMessage.type && customMessage.type === 'notification') {
              showMessage('Info', customMessage.data.customData.message);
            }
          }
        }
      })
    );
  };

  const handleLogout = (navigation) => {
    CometChat.logout().then(
      () => {
        AsyncStorage.removeItem('auth');
        setUser(null);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }]
        });
      }, error => {
        console.log("Logout failed with exception:", { error });
      }
    );
  };

  const logout = (navigation) => () => {
    console.log(navigation, 'nnnnnnnnnn');
    Alert.alert(
      "Confirm",
      "Do you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => handleLogout(navigation) }
      ]
    );
  };

  const createPost = (navigation) => () => {
    console.log("create");
    navigation.navigate('Create');
  };

  const chat = (navigation) => () => {
    navigation.navigate('Chat');
  };

  if(loader){
    return<></>
  }
  if (user) {
    return (
      <Context.Provider value={{ user, setUser, hasNewPost, setHasNewPost }}>

        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: true,

            }}
          >
            <Stack.Screen name="Home" component={Tabs}
              options={{
                headerShown:false
              }}
            />
            <Stack.Screen name="Create" component={Create} options={({ navigation }) => ({
              title: 'Create Post',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
            />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="comment" component={CommentScreen} 
              options={({ navigation }) => ({
                title: 'Comment',
                headerStyle: {
                  backgroundColor: 'black',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              })}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </Context.Provider>
    );
  }

  return (
    <Context.Provider value={{ user, setUser }}>
      {/* <Profile></Profile> */}
      {/* <Login></Login> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
          options={{headerShown:false}}
            name="Login"
            component={Login}
          />
          <Stack.Screen name="SignUp" component={SignUp} />
          {/* <Stack.Screen name="Home" component={Tabs} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
};

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    height: 48,
    resizeMode: 'contain',
    width: 96,
  },
  logoMargin: {
    marginTop: 8
  },
  createPostTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default App;