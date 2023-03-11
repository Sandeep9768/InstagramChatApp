import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import VisibilitySensor from '@svanboxel/visibility-sensor-react-native'
const Post = (props) => {
  const { post, toggleLike, toggleFollow, onItemClicked, isFollowHidden } = props;
  const navigation = useNavigation();
  const onHeartClicked = () => {
    toggleLike(post);
  };

  const onFollowClicked = () => {
    toggleFollow(post);
  };

  const clickItem = () => {
    onItemClicked(post);
  };

  const PostLikes = ({ post }) => (
    <View style={{ flexDirection: 'row', marginTop: 5 }}>
      <Text style={{ color: 'white'}}>
        {post?.nLikes ? post.nLikes : 0} likes
      </Text>
    </View>
  )
  
  console.log(post.author.caption,'ppppppppppppp');
  const PostCaption = ({ post }) => (
    <View style={{ marginTop: 5 }}>
      <Text style={{ color: 'white' }}>
        {/* <Text >{post.author.fullname}</Text> */}
        <Text> {post.author.caption}</Text>
      </Text>
    </View>
  )
  
  const PostCommentSection = ({ post }) => (
    <View style={{ marginTop: 5 }}>
      {!!post.comments.length && (
        <Text style={{ color: 'gray' }}>
          View{post.comments.length > 1 ? 'all' : ''} {post.comments.length}{' '}
          {post.comments.length > 1 ? 'comments' : 'comment'}
        </Text>
      )}
    </View>
  )
  
  const PostComments = ({ post }) => (
    <>
      {POSTS?.comments?.map((comment, index) => (
        <View key={index} style={{ flexDirection: 'row', marginTop: 5 }}>
          <Text style={{ color: 'white' }}>
            <Text >{comment?.user}</Text>{' '}
            {comment?.comment}
          </Text>
        </View>
      ))}
    </>
  )

  const renderPostContent = () => {
    
    const [status,setStatus]=useState(true)
    const handleImageVisibility = visible => {
      
      setStatus(visible ? false : true)
    }
    console.log(status,'vvvvvvvvvvvvv');
    if (post.postCategory === 1) {
      return (
        <View style={styles.listItemBody}>
          <Image style={styles.listItemImage} source={{ uri: post.content }} />
          <PostCaption post={post}></PostCaption>
          <PostLikes post={post} /> 
          {/* <PostLikes post={post} /> 
        <PostCaption post={post} /> */}
        {/* <PostCommentSection post={post} />
        <PostComments post={post} /> */}
        </View>
      );
    }
    if (post.postCategory === 2) {
      if (Platform.OS === 'ios') {
        return (
          <View style={styles.listItemBody}>
            <Video
              style={styles.videoElement}
              shouldPlay
              muted={true}
              source={{ uri: post.content }}
              allowsExternalPlayback={false} />
          </View>
        );
      } else {
        return (
          <VisibilitySensor onChange={handleImageVisibility}>
          <View style={styles.listItemBody}>
            <VideoPlayer
              autoplay
              repeat
              paused={status}
              showOnStart={false}
              style={styles.videoElement}
              source={{ uri: post.content }}
            />
            <TouchableOpacity style={styles.videoOverlay} onPress={clickItem} 
            />
          </View>
          </VisibilitySensor>
        );
      }
    }
    
    return <></>;
  }


  return (
    <TouchableOpacity style={styles.listItem} onPress={clickItem}>
      <View style={styles.listItemHeader}>
        <View style={styles.listItemAuthorAvatarContainer}>
          <Image style={styles.listItemAuthorAvatar} source={{ uri: post.author.avatar }} />
        </View>
        <Text style={styles.listItemAuthorName}>{post.author.fullname}</Text>
        {!isFollowHidden && <>
          <View style={styles.listItemDot}></View>
          <TouchableOpacity onPress={onFollowClicked}>
            <Text style={styles.listItemFollow}>{post.hasFollowed ? 'Followed' : 'Follow'}</Text>
          </TouchableOpacity>
        </>}
      </View>
      {renderPostContent()}
      <View style={styles.listItemFooter}>
        <TouchableOpacity onPress={onHeartClicked}>
          <Image style={[styles.listItemFooterImage, styles.gap]} source={post.hasLiked ? require('../../images/heart-active.png') :  {uri:"https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png"}} />
          
         
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
           navigation.navigate('comment',{ post });
        }}>
        <Image style={[styles.listItemFooterImage, styles.gap2]} source={{uri:"https://img.icons8.com/fluency-systems-regular/60/ffffff/speech-bubble--v1.png"}} />
        </TouchableOpacity>
        
        <Image style={styles.listItemFooterImage} source={{uri:'https://img.icons8.com/fluency-systems-regular/60/ffffff/paper-plane.png'}} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {},
  listItemHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8
  },
  listItemAuthorAvatarContainer: {
    alignItems: 'center',
    borderRadius: 48 / 2,
    borderWidth: 2,
    borderColor: 'red',
    display: 'flex',
    height: 48,
    justifyContent: 'center',
    marginRight: 12,
    width: 48,
  },
  listItemAuthorAvatar: {
    borderRadius: 42 / 2,
    height: 38,
    width: 38,
  },
  listItemAuthorName: {
    fontSize: 16,
    color:'white',
    fontWeight: 'bold',
    marginRight: 12
  },
  listItemDot: {
    backgroundColor: '#000',
    borderRadius: 4 / 2,
    height: 4,
    marginRight: 12,
    marginTop: 2,
    width: 4,
  },
  listItemFollow: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B82F6'
  },
  listItemBody: {
    flex: 1,
    minHeight: 320
  },
  listItemImage: {
    aspectRatio: 1,
    flex: 1,
  },
  videoElement: {
    flex: 1
  },
  videoOverlay: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 0,
    top: 0,
  },
  listItemFooter: {
    padding: 8,
    paddingLeft: 16,
    flexDirection: 'row'
  },
  listItemFooterImage: {
    width: 28,
    height: 28,
  },
  gap: {
    marginRight: 12
  },
  gap2: {
    marginRight: 8
  }
});

export default Post;