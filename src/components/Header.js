import { CometChat } from '@cometchat-pro/react-native-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View,Alert } from 'react-native'
import context from '../../context';
// import { getAuth, signOut } from '../firebase'

const Header = ({ navigation }) => {
  const { user, setUser, setHasNewPost } = useContext(context);
  // const auth = getAuth()
  const signOutUser = async () => {
    console.log("lllllll");
    // try {
    //   await signOut(auth)
    //   console.log('Signed out successfully')
    // } catch (error) {
    //   console.log(error)
    // }
  }
  const handleLogout = (navigation) => {
    console.log("lllllllll");
    CometChat.logout().then(
      () => {
        AsyncStorage.removeItem('auth');
        setUser(null)
        navigation.reset({
          index: 0,
          routeName: [{ name: 'Login' }]
        });
      }, error => {
        console.log("Logout failed with exception:", { error });
      }
    );
  };
  const logout = () => () => {
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

  

  const createPost = () => () => {

    navigation.navigate('Create');
  };

  const chat = ()  => {
    navigation.navigate('Chat');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={signOutUser}>
        <Image
          style={styles.logo}
          source={require('../assets/header-logo.png')}
        />
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => {
          console.log("###########3");
          navigation.navigate('Create');
          }}>
          <Image
            style={styles.icon}
            source={{
              uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>{
          chat()
        }}
        >
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>12</Text>
          </View>
          <Image
            style={styles.icon}
            source={{
              uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
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
        }}>
          <Image
            style={styles.icon}
            source={{
              uri: 'https://cdn2.vectorstock.com/i/1000x1000/92/31/power-icon-on-black-background-black-flat-style-vector-26849231.jpg',
            }}
          />
        </TouchableOpacity>
      
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  unreadBadge: {
    backgroundColor: '#ff3250',
    position: 'absolute',
    left: 20,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  unreadBadgeText: {
    color: 'white',
    // fontWeight: 600,
  },
})
