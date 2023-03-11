import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Reels from 'react-native-instagram-reels';
export const RealScreen = (props) => {
   const videos = [
        {
          _id: '1',
          uri: {
            uri: 'https://raw.githubusercontent.com/kartikeyvaish/React-Native-UI-Components/main/src/Reels/config/videos/sample.mp4',
          },
        },
        {
          _id: '2',
          uri: {
            uri: 'https://raw.githubusercontent.com/kartikeyvaish/React-Native-UI-Components/main/src/Reels/config/videos/sampleLandscape.mp4',
          },
        },
        {
          _id: '3',
          uri: {
            uri: 'https://raw.githubusercontent.com/kartikeyvaish/React-Native-UI-Components/main/src/Reels/config/videos/samplePortrait.mp4',
          },
        },
      ];

  return (
    <Reels videos={videos} />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    padding: 12,
  },
  headerImageContainer: {
    width: 96,
    height: 96,
    borderRadius: 96 / 2,
    borderWidth: 2,
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerImage: {
    width: 86,
    height: 86,
    borderRadius: 86 / 2
  },
  headerRight: {
    flex: 1,
    flexDirection: 'column',
  },
  headerInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 12
  },
  headerNumberOfPostsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center'
  },
  headerNumberOfFollowersContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center'
  },
  headerNumberOfFollowingContainer: {
    flex: 1
  },
  headerLabel: {
    fontSize: 16,
    color: 'black',
    marginTop: 5
  },
  headerLabelBold: {
    fontWeight: 'bold'
  },
  followBtn: {
    backgroundColor: '#3B82F6',
    borderRadius: 4,
    marginLeft: 32,
    paddingVertical: 8,
    width: 128,
  },
  followTxt: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
