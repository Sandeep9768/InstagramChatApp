import React from 'react';
// import { CometChat } from '@cometchat-pro/react-native-chat';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { CometChatUserListWithMessages, CometChatMessages } from '../../../cometchat-pro-react-native-ui-kit/src';

const Chat = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
    id={1}
      screenOptions={{ headerShown: false }}
      initialRouteName={"UserListWithMessages"}
      >
        <Stack.Screen name="UserListWithMessages" component={CometChatUserListWithMessages} />
        <Stack.Screen name="CometChatMessages" component={CometChatMessages} />
    </Stack.Navigator>
  );
};

export default Chat;