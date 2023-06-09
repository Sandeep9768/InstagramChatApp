import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from './Header';
import Actions from './Actions';
import Posts from '../posts/Posts';
import Context from '../../../context';
import { database, databaseSet, databaseRef, databaseGet, databaseChild } from "../../../firebase";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../../components/icon';
import Stories from '../../components/Stories';

const Profile = () => {

  const [profile, setProfile] = useState(null);
  const [postCategory, setPostCategory] = useState(null);

  const { user, hasNewPost, setHasNewPost } = useContext(Context);

  useEffect(() => {
    if (user && user.id) {
      loadProfile(user.id);
      return () => {
        setProfile(null);
      };
    }
  }, [user]);

  useEffect(() => {
    if (hasNewPost) {
      loadProfile(user.id);
      setHasNewPost(false);
      return () => {
        setProfile(null);
      };
    }
  }, [hasNewPost]);

  const getUser = async (id) => {
    if (!id) {
      return null;
    }
    const ref = databaseRef(database);
    const snapshot = await databaseGet(databaseChild(ref, `users/${id}`));
    if (!snapshot || !snapshot.exists()) {
      return null
    }
    return snapshot.val();
  };

  const loadProfile = async (id) => {
    const profile = await getUser(id);
    setProfile(() => profile);
  };

  const onCategorySelected = (category) => {
    if (!category) {
      return;
    }
    setPostCategory(() => category);
  }

  const updateFolowers = (hasFollowed, profile) => {
    if (!profile) {
      return;
    }
    if (hasFollowed) {
      return profile.followers && profile.followers.length ? profile.followers.filter(follower => follower !== user.id) : [];
    }
    return profile.followers && profile.followers.length ? [...profile.followers, user.id] : [user.id];
  };

  const onFollowToggled = async (profile, hasFollowed) => {
    if (!profile) {
      return;
    }
    const latestProfile = await getUser(profile.id);
    if (!latestProfile) {
      return;
    }
    const followers = updateFolowers(hasFollowed, profile);
    const nFollowers = followers.length;
    latestProfile.followers = followers;
    latestProfile.nFollowers = nFollowers;
    await databaseSet(databaseRef(database, 'users/' + latestProfile.id), latestProfile);
    await loadProfile(latestProfile.id);
  }

  const hasFollowed = () => {
    if (!profile || !user) {
      return false;
    }
    if (!profile.followers || !profile.followers.length) {
      return false;
    }
    return profile.followers.includes(user.id);
  };

  if (!user) {
    return <></>;
  }

  const followed = hasFollowed();

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <Header profile={profile} hasFollowed={followed} onFollowToggled={onFollowToggled} isFollowHidden={user && profile && user.id === profile.id} />
      <View style={styles.mydayContainer}>
          <View style={styles.subContainer3}>
            <TouchableOpacity
              style={styles.mydayCircle}
              onPress={() => alert("This feature will be added soon")}
            >
              <Icon name={"add"} size={25} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.mydayText}>New</Text>
          </View>
          <Stories></Stories>
        </View>
      <Actions onCategorySelected={onCategorySelected} />
      <Posts authorId={user.id} postCategory={postCategory} isGrid />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: '#fff'
  },
  mydayContainer: {
    flexDirection:'row',
    paddingVertical: 10,
    // justifyContent: "center",
    alignItems: "flex-start"
  },
  subContainer3: {
    alignItems: "center"
  },
  mydayCircle: {
    height: 60,
    width: 60,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#666",
    marginVertical: 10,
    marginHorizontal: 10
  },

  icon: {
    paddingHorizontal: 10
  },
  mydayText: {
    fontSize: 12,
    color: "#222"
  }
});

export default Profile;