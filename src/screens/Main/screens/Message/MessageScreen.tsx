import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import { db } from "../../../../config/firebaseConfig";

const MessageScreen = ({ navigation }) => {
  const [threads, setThreads] = useState([]);

  /**
   * Fetch threads from Firestore
   */
  useEffect(() => {
    const unsubscribe = db
      .collection("threads")
      .orderBy("latestMessage.createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: "",

            latestMessage: {
              text: "",
            },
            ...documentSnapshot.data(),
          };
        });

        setThreads(threads);
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={(item) => item._id}
        //ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ChatRoom", { thread: item._id })
            }
          >
            <Text>{item.latestMessage.text}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    backgroundColor: "#f5f5f5",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
});
