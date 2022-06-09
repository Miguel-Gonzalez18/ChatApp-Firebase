import React,{useState, useEffect, useLayoutEffect, useCallback} from 'react'
import { GiftedChat, Send, InputToolbar } from 'react-native-gifted-chat'
import { TouchableOpacity, Text } from 'react-native'
import { collection, addDoc, orderBy, query, onSnapshot} from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { auth, database } from '../config/firebase'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';
import colors from '../colors'
import { View, StyleSheet } from 'react-native'

const Chat = () => {
  const [messages, setMessages] = useState([])
  const navigation = useNavigation()

  const onSignOut = () => {
    signOut(auth).catch(error => console.log(error))
  }
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10
          }}
          onPress={onSignOut}
        >
          <AntDesign name="logout" size={24} color={colors.gray} style={{marginRight: 10}}/>
        </TouchableOpacity>
      )
    });
  },[navigation])

  useLayoutEffect(()=>{
    const collectionRef = collection(database, 'chats')
    const q = query(collectionRef, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(
        snapshot.docs.map(doc => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      )
    })
    return unsubscribe
  },[])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
    // setMessages([...messages, ...messages]);
    const { _id, createdAt, text, user } = messages[0];    
    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user
    });
  }, []);

  const renderInputToolbar = (props) => {
    return <InputToolbar {...props} containerStyle={styles.inputToolbar} />
  }

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <Ionicons name="send" size={24} color="#1A3C84" style={{marginBottom: 5, marginRight: 8}} />
        </View>
      </Send>
    )
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        avatar:  'https://i.pravatar.cc/300'
      }}
      alwaysShowSend
      renderSend={renderSend}
      renderInputToolbar={renderInputToolbar}
      placeholder="Escribe tu mensaje"
    />
  )
}
const styles = StyleSheet.create({
    inputToolbar: {
      marginBottom: 5,
      marginLeft: 5,
      marginRight: 5,
      borderRadius: 25,
      padding: 0
  }
})
export default Chat