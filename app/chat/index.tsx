// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigation, useLocalSearchParams } from 'expo-router';
// import { Camera, Plus, Send } from 'lucide-react-native';
// import Colors from '@/shared/Colors';
// import { AIChatModel } from '@/shared/GlobalApi';

// type Message = {
//   role: 'user' | 'assistant' | 'system';
//   content: string;
// };

// export default function ChatUI() {
//   const navigation = useNavigation();
//   const { agentName, agentPrompt } = useLocalSearchParams();

//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState('');

//   const flatListRef = useRef<FlatList>(null);

//   // Header
//   useEffect(() => {
//     navigation.setOptions({
//       headerShown: true,
//       headerTitle: agentName,
//       headerRight: () => <Plus />,
//     });
//   }, [agentName]);

//   // System prompt
//   useEffect(() => {
//     if (agentPrompt) {
//       setMessages([
//         {
//           role: 'system',
//           content: agentPrompt.toString(),
//         },
//       ]);
//     }
//   }, [agentPrompt]);

//   // Auto scroll to bottom
//   useEffect(() => {
//     setTimeout(() => {
//       flatListRef.current?.scrollToEnd({ animated: true });
//     }, 50);
//   }, [messages]);

//   const onSendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage: Message = {
//       role: 'user',
//       content: input,
//     };

//     const updatedMessages = [...messages, userMessage];
//     setMessages(updatedMessages);
//     setInput('');

//     try {
//       const result = await AIChatModel(updatedMessages);

//       const aiMessage: Message = {
//         role: 'assistant',
//         content: result.aiResponse,
//       };

//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       keyboardVerticalOffset={80}
//       style={{ flex: 1, padding: 10 }}
//     >
//       <FlatList<Message>
//       ref={flatListRef}
//       data={messages}
//       keyExtractor={(_, index) => index.toString()}
//       contentContainerStyle={{ paddingBottom: 10 }}
//       renderItem={({ item }) => {
//       if (item.role === 'system') return null;

//        return (
//          <View style={{ width: '100%', paddingVertical: 4 }}>
//          <View
//            style={[
//             styles.messageContainer,
//             item.role === 'user'
//               ? styles.userMessage
//               : styles.assistantMessage,
//           ]}
//         >
//           <Text>{item.content}</Text>
//         </View>
//       </View>
//     );
//   }}
// />


//       {/* Input */}
//       <View style={styles.inputContainer}>
//         <TouchableOpacity style={{ marginRight: 6 }}>
//           <Camera color={Colors.BLACK} size={26} />
//         </TouchableOpacity>

//         <TextInput
//           style={styles.input}
//           placeholder="Type a message..."
//           value={input}
//           onChangeText={setInput}
//           multiline
//         />

//         <TouchableOpacity style={styles.sendBtn} onPress={onSendMessage}>
//           <Send color={Colors.WHITE} size={20} />
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   messageContainer: {
//     maxWidth: '75%',
//     padding: 10,
//     borderRadius: 12,
//   },
//   userMessage: {
//     backgroundColor: '#5AE3C0',
//     alignSelf: 'flex-end',
//     borderBottomRightRadius: 2,
//   },
//   assistantMessage: {
//     backgroundColor: '#E0E0E0',
//     alignSelf: 'flex-start',
//     borderBottomLeftRadius: 2,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#CCC',
//     borderRadius: 20,
//     marginBottom: 6,
//   },
//   input: {
//     flex: 1,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     backgroundColor: Colors.WHITE,
//   },
//   sendBtn: {
//     backgroundColor: '#097969',
//     padding: 8,
//     borderRadius: 99,
//     marginLeft: 6,
//   },
// });

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { Camera, Plus, Send, X } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';

import Colors from '@/shared/Colors';
import { AIChatModel } from '@/shared/GlobalApi';
import { firestoreDb, storage } from '@/config/FirebaseConfig';

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content?: string;
  imageUrl?: string;
};

export default function ChatUI() {
  const navigation = useNavigation();
  const { agentName, agentPrompt, chatId,agentId,messagesList } = useLocalSearchParams();
  const { user } = useUser();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const [docId, setDocId] = useState<string | null>(null);

  const flatListRef = useRef<FlatList>(null);

  /* ---------------- HEADER ---------------- */
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: agentName,
      headerRight: () => <Plus />,
    });
  }, [agentName]);

  /* ---------------- DOC ID ---------------- */
  useEffect(() => {
    if (chatId) {
      setDocId(chatId.toString());
      //@ts-ignore
      const messageListJSON=JSON.parse(messagesList)
    if(messageListJSON?.length>0){
      setMessages(messageListJSON)
    }
    } else {
      setDocId(Date.now().toString());
    }
  }, [chatId]);

  /* ---------------- SYSTEM PROMPT ---------------- */
  useEffect(() => {
    if (agentPrompt) {
      setMessages([
        {
          id: Date.now().toString(),
          role: 'system',
          content: agentPrompt.toString(),
        },
      ]);
    }
  }, [agentPrompt]);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 80);
  }, [messages, isTyping]);

  /* ---------------- IMAGE PICK ---------------- */
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.6,
    });

    if (!result.canceled) {
      setFile(result.assets[0].uri);
    }
  };

  /* ---------------- IMAGE UPLOAD ---------------- */
  const uploadImageToStorage = async () => {
    if (!file) return '';

    const response = await fetch(file);
    const blob = await response.blob();

    const fileName = `${Date.now()}.png`;
    const imageRef = ref(storage, `ai-pocket-agent/${fileName}`);

    await uploadBytes(imageRef, blob);
    return await getDownloadURL(imageRef);
  };

  /* ---------------- SEND MESSAGE ---------------- */
  const onSendMessage = async () => {
    if (!input.trim() && !file) return;

    let imageUrl = '';

    if (file) {
      imageUrl = await uploadImageToStorage();
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      imageUrl,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    setInput('');
    setFile(null);
    setIsTyping(true);

    try {
      const aiMessages = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content ?? '',
      }));

      const result = await AIChatModel(aiMessages);

      const aiMessage: Message = {
        id: Date.now().toString() + '_ai',
        role: 'assistant',
        content: result.aiResponse,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsTyping(false);
    }
  };

  /* ---------------- LONG PRESS ---------------- */
  const onLongPressMessage = (msg: Message) => {
    if (!msg.content) return;

    Alert.alert('Message Options', '', [
      {
        text: 'Copy',
        onPress: async () => {
          await Clipboard.setStringAsync(msg.content || '');
        },
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setMessages((prev) => prev.filter((m) => m.id !== msg.id));
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  /* ---------------- 🔥 FINAL FIRESTORE SAVE ---------------- */
  useEffect(() => {
    if (!messages.length || !docId) return;

    const saveMessages = async () => {
      try {
        const cleanedMessages = messages.map((m) => ({
          id: m.id,
          role: m.role,
          content: m.content ?? '',
          imageUrl: m.imageUrl ?? '',
        }));

        await setDoc(
          doc(firestoreDb, 'chats', docId),
          {
            userEmail: user?.primaryEmailAddress?.emailAddress ?? '',
            messages: cleanedMessages,
            docId,
            agentName,
            agentPrompt,
            agentId,
            updatedAt: Date.now()
          },
          { merge: true }
        );

        console.log('✅ Chat saved to Firestore');
      } catch (error) {
        console.log('❌ Firestore save error:', error);
      }
    };

    saveMessages();
  }, [messages, docId]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
      style={{ flex: 1 }}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => {
          if (item.role === 'system') return null;

          return (
            <TouchableOpacity
              onLongPress={() => onLongPressMessage(item)}
              style={{ width: '100%', paddingVertical: 4 }}
            >
              <View
                style={[
                  styles.messageContainer,
                  item.role === 'user'
                    ? styles.userMessage
                    : styles.assistantMessage,
                ]}
              >
                {item.imageUrl ? (
                  <Image source={{ uri: item.imageUrl }} style={styles.chatImage} />
                ) : null}

                {item.content ? <Text>{item.content}</Text> : null}
              </View>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={
          isTyping ? <Text style={styles.typing}>AI is typing...</Text> : null
        }
      />

      {file && (
        <View style={styles.preview}>
          <Image source={{ uri: file }} style={styles.previewImage} />
          <TouchableOpacity onPress={() => setFile(null)}>
            <X />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Camera color={Colors.BLACK} size={26} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
          multiline
        />

        <TouchableOpacity style={styles.sendBtn} onPress={onSendMessage}>
          <Send color={Colors.WHITE} size={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 12,
  },
  userMessage: {
    backgroundColor: '#5AE3C0',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 2,
  },
  assistantMessage: {
    backgroundColor: '#E0E0E0',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 2,
  },
  chatImage: {
    width: 220,
    height: 220,
    borderRadius: 10,
    marginBottom: 6,
  },
  typing: {
    padding: 6,
    color: '#777',
    fontStyle: 'italic',
  },
  preview: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 4,
  },
  previewImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 20,
    margin: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
  },
  sendBtn: {
    backgroundColor: '#097969',
    padding: 8,
    borderRadius: 99,
    marginLeft: 6,
  },
});
