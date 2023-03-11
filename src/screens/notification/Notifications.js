import React, { useEffect, useState, useContext } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Notification from './Notification';
import Context from '../../../context';
import { database, databaseRef, databaseOnValue, databaseOff } from "../../../firebase";
import { Text } from "react-native-elements";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const { user } = useContext(Context);

  useEffect(() => {
    loadNotifications();
    return () => {
      setNotifications([]);
      const notificationsRef = databaseRef(database, 'notifications');
      databaseOff(notificationsRef);
    }
  }, []);

  const transformNotifications = (notifications) => {
    if (!notifications || !notifications.length) {
      return;
    }
    const transformedNotifications = [];
    for (const notification of notifications) {
      if (notification && notification.receiverId === user.id) {
        transformedNotifications.push(notification);
      }
    }
    return transformedNotifications;
  }

  const loadNotifications = async () => {
    const notificationsRef = databaseRef(database, 'notifications');
    databaseOnValue(notificationsRef, async (snapshot) => {
      const values = snapshot.val();
      if (values) {
        const keys = Object.keys(values);
        const notifications = keys.map(key => values[key]);
        const transformedNotifications = await transformNotifications(notifications);
        setNotifications(() => transformedNotifications);
      } else {
        setNotifications(() => []);
      }
    });
  };

  const renderItems = (item) => {
    const notification = item.item;
    return <Notification notification={notification} />
  };

  const getKey = (item) => {
    return item.id;
  };

  return (
    <View style={styles.list}>
      {/* {
        notifications.length == 0 ? <Text style={{
          width: "100%",
          marginTop: 100,
          fontSize: 25,
          fontWeight: "bold",
          marginLeft: "10%",
        }}>Emapty notification</Text> : <FlatList
          data={notifications}
          renderItem={renderItems}
          keyExtractor={(item, index) => getKey(item)}
        /> 
      } */}
  <FlatList
          data={notifications}
          renderItem={renderItems}
          keyExtractor={(item, index) => getKey(item)}
        /> 
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff',
    flex: 1,
  }
});

export default Notifications;