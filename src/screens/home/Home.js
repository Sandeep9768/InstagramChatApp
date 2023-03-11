import React from 'react';
import Stories from '../../components/Stories';
import { TABS } from '../../constant/tabs';
import Posts from '../posts/Posts';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import Header from '../../components/Header';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {/* {POSTS?.map((post, index) => (
          <Post post={post} key={index} />
        ))} */}
        <Posts authorId={null} postCategory={null} isGrid={false} />
      </ScrollView>
    </SafeAreaView>

  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
})