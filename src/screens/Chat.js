import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Text,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GiftedChat, Bubble, Send, InputToolbar} from 'react-native-gifted-chat';
import {auth, database} from '../config/firebase';
import {doc, onSnapshot, setDoc, getDoc} from 'firebase/firestore';
import {colors} from '../config/constants';

function Chat({route}) {
  const [messages, setMessages] = useState([]);
  const [modal, setModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(database, 'chats', route.params.id),
      doc => {
        setMessages(
          doc.data().messages.map(message => ({
            ...message,
            createdAt: message.createdAt.toDate(),
            image: message.image ?? '',
          })),
        );
      },
    );

    return () => unsubscribe();
  }, [route.params.id]);

  const onSend = useCallback(
    async (m = []) => {
      // Get messages
      const chatDocRef = doc(database, 'chats', route.params.id);
      const chatDocSnap = await getDoc(chatDocRef);

      const chatData = chatDocSnap.data();
      const data = chatData.messages.map(message => ({
        ...message,
        sentBy: message?.user?._id,
        receivedBy: chatData?.users.find(
          item => item?.email !== message?.user?._id,
        )?.email,
        createdAt: message.createdAt.toDate(),
      }));
      const messagesWillSend = [{...m[0], sent: true, received: false, }];
      let chatMessages = GiftedChat.append(data, messagesWillSend);

      setDoc(
        doc(database, 'chats', route.params.id),
        {
          messages: chatMessages,
          lastUpdated: Date.now(),
        },
        {merge: true},
      );
    },
    [route.params.id, messages],
  );

  const renderBubble = useMemo(
    () => props =>
      (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {backgroundColor: colors.primary},
            left: {backgroundColor: 'lightgrey'},
          }}
        />
      ),
    [],
  );

  const renderSend = useMemo(
    () => props =>
      (
        <>
          <Send {...props}>
            <View
              style={{
                justifyContent: 'center',
                height: '100%',
                marginLeft: 8,
                marginRight: 4,
                marginTop: 12,
              }}>
              <Ionicons name="send" size={24} color={colors.teal} />
            </View>
          </Send>
        </>
      ),
    [],
  );

  const renderInputToolbar = useMemo(
    () => props =>
      (
        <InputToolbar
          {...props}
          containerStyle={styles.inputToolbar}
          renderActions={renderActions}
        />
      ),
    [],
  );

  const renderActions = useMemo(
    () => () =>
      (
        <View style={styles.emojiIcon}>
          <Ionicons name="chatbubbles" size={32} color={colors.teal} />
        </View>
      ),
    [modal],
  );

  const handleEmojiPanel = useCallback(() => {
    if (modal) {
      setModal(false);
    } else {
      Keyboard.dismiss();
      setModal(true);
    }
  }, [modal]);

  const renderLoading = useMemo(
    () => () =>
      (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.teal} />
        </View>
      ),
    [],
  );

  const renderLoadingUpload = useMemo(
    () => () =>
      (
        <View style={styles.loadingContainerUpload}>
          <ActivityIndicator size="large" color={colors.teal} />
        </View>
      ),
    [],
  );

  return (
    <>
      {uploading && renderLoadingUpload()}
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={messages => onSend(messages)}
        imageStyle={{height: 212, width: 212}}
        messagesContainerStyle={{backgroundColor: '#fff'}}
        textInputStyle={{backgroundColor: '#fff', borderRadius: 20}}
        user={{
          _id: auth?.currentUser?.email,
          name: auth?.currentUser?.displayName,
          avatar: 'https://i.pravatar.cc/300',
        }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderUsernameOnMessage={true}
        renderAvatarOnTop={true}
        renderInputToolbar={renderInputToolbar}
        minInputToolbarHeight={56}
        scrollToBottom={true}
        // onPressActionButton={handleEmojiPanel}
        scrollToBottomStyle={styles.scrollToBottomStyle}
        renderLoading={renderLoading}
      />
    </>
  );
}

const styles = StyleSheet.create({
  inputToolbar: {
    bottom: 6,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 16,
  },
  emojiIcon: {
    marginLeft: 4,
    bottom: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  emojiContainerModal: {
    height: 348,
    width: 396,
  },
  emojiBackgroundModal: {},
  scrollToBottomStyle: {
    borderColor: colors.grey,
    borderWidth: 1,
    width: 56,
    height: 56,
    borderRadius: 28,
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
  addImageIcon: {
    bottom: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainerUpload: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
});

export default Chat;
