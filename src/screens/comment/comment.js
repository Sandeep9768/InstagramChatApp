import { async } from '@firebase/util';
import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    FlatList,
    Dimensions,
    KeyboardAvoidingView,
} from 'react-native'
import Context from '../../../context';
import { database, databaseRef, databaseOnValue, databaseSet, databaseGet, databaseChild, databaseOff } from "../../../firebase";
import { POSTS } from '../../constant/posts'
// import CommentList from './commentList';
import { notificationId } from '../../helper/helper';
const { width, height } = Dimensions.get('window')
export default CommentScreen = (props) => {
    const { route,navigation } = props;
    const { post } = route.params;
    const { user } = useContext(Context);
    //   post.commentList=[]
    const [commentList, setCommentList] = useState(null)
    //   post.commentList=[{name:'dgdg'}]
    const getData = async () => {
        var data=post
        const ref = databaseRef(database);
        var snapshot = await databaseGet(databaseChild(ref, `posts/${post.id}`));
        if(post?.commentList==undefined){
            data={
                ...data,commentList:[]
            }
        }

        setCommentList(data)
    }


    useEffect(() => {
        getData()
        // if(commentList?.commentList?.length>0){
        //     console.log(commentList,'uuuuuuuuuuuu');
        //     databaseSet(databaseRef(database, 'posts/' + updatedPost.id), commentList);
        // }else{
        //     setCommentList(post)
        // }
        // post.commentList=[]
        // setCommentList(post)
    }, [])



    const [newMessage, setNewMessage] = useState('')

    const createNotification = async ({ id, notificationImage, notificationMessage, receiverId }) => {
        if (!id || !notificationImage || !notificationMessage) {
          return;
        }
        await databaseSet(databaseRef(database, 'notifications/' + id), { id, notificationImage, notificationMessage, receiverId });
      };
    console.log("&&&&&&&&&&&&&7", commentList);
    const send = async() => {
        var messagesList = {
            ...commentList, commentList: [...commentList?.commentList, {
                id: Math.floor(Math.random() * 99999999999999999 + 1),
                message: newMessage,
                image: user.avatar,
                name:post.author.fullname
            }]
        }
        setNewMessage('')
        setCommentList(messagesList)
        console.log(messagesList);
        const customMessage = { message: `${user.fullname} has comment on your post`, type: 'notification', receiverId: post.author.id};
        await databaseSet(databaseRef(database, 'posts/' + messagesList.id), messagesList);
        await createNotification({ id: notificationId, notificationImage: user.avatar, notificationMessage: customMessage.message, receiverId: customMessage.receiverId});
        // setTimeout(() => {
        //     reply()
        // }, 1000)
    }

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

    const renderItem = ({ item }) =>
    (
        <View style={styles.eachMsg}>
            <Image source={{ uri: item.image }} style={styles.userPic} />
            <View style={styles.msgBlock}>
            <Text style={styles.msgTxt}>{item.name}</Text>
                <Text style={styles.msgTxt}>{item.message}</Text>
            </View>
        </View>
    )


    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            {/* <KeyboardAvoidingView behavior="padding" style={styles.keyboard}> */}
            {/* <CommentList rowData={commentList==null ? [] : commentList}></CommentList> */}
            <FlatList
                style={styles.list}
                extraData={commentList?.commentList}
                data={commentList?.commentList}
                keyExtractor={item => {
                    return item.id
                }}
                renderItem={renderItem}
            />
            {/* <View style={styles.input}> */}
            <TextInput
                style={{ color: "white" ,borderColor:'white',borderWidth:1}}
                value={newMessage}
                placeholderTextColor="black"
                onChangeText={msg => setNewMessage(msg)}
                blurOnSubmit={false}
                onSubmitEditing={() => send()}
                placeholder="Type a message"
                returnKeyType="send"
            />
            {/* </View> */}
            {/* </KeyboardAvoidingView> */}
        </View>
    )
}

const styles = StyleSheet.create({
    userName:{
        fontSize: 18,
        color: 'white',
        fontWeight: '600',
    },
    keyboard: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    image: {
        width,
        height,
    },
    header: {
        height: 65,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#075e54',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    right: {
        flexDirection: 'row',
    },
    chatTitle: {
        color: '#fff',
        fontWeight: '600',
        margin: 10,
        fontSize: 15,
    },
    chatImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        margin: 5,
    },
    input: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        padding: 10,
        height: 40,
        width: width - 20,
        backgroundColor: 'black',
        margin: 10,
        shadowColor: '#3d3d3d',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
        },
        borderColor: '#696969',
        borderWidth: 1,
    },
    eachMsg: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black',
        margin: 5,
    },
    rightMsg: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        margin: 5,
        alignSelf: 'flex-end',
    },
    userPic: {
        height: 40,
        width: 40,
        margin: 5,
        borderRadius: 20,
        backgroundColor: '#f8f8f8',
    },
    msgBlock: {
        width: 220,
        borderRadius: 5,
        backgroundColor: 'black',
        padding: 10,
        shadowColor: '#3d3d3d',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
        },
    },
    rightBlock: {
        width: 220,
        borderRadius: 5,
        backgroundColor: '#97c163',
        padding: 10,
        shadowColor: '#3d3d3d',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
        },
    },
    msgTxt: {
        fontSize: 15,
        color: 'white',
        // fontWeight: '600',
    },
    rightTxt: {
        fontSize: 15,
        color: '#202020',
        fontWeight: '600',
    },
})
