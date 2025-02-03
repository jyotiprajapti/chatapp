import React, { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator } from 'react-native';
import Chats from "./src/screens/Chats";
import SignUp from "./src/screens/SignUp";
import Chat from "./src/screens/Chat";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./src/screens/Login";
import Users from "./src/screens/Users";
import ChatHeader from "./src/components/ChatHeader";
import { MenuProvider } from "react-native-popup-menu";
import { auth } from "./src/config/firebase";
import messaging from '@react-native-firebase/messaging';
import { AuthenticatedUserContext, AuthenticatedUserProvider } from "./src/contexts/AuthenticatedUserContext";
import { UnreadMessagesContext, UnreadMessagesProvider } from "./src/contexts/UnreadMessagesContext";
import checkAndRequestNotificationPermission from "./src/utilities/checkNotification";
import { saveFcmToken } from "./src/utilities/saveFcmToken";
import { createChannel } from "./src/services/notificationService";
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { unreadCount, setUnreadCount } = useContext(UnreadMessagesContext);
  useEffect(()=>{
    checkAndRequestNotificationPermission()
    },[])

    useEffect(()=>{
      createChannel()
    },[])

    useEffect(()=>{
      messaging().onTokenRefresh(async (newToken) => {
        const userId = auth.currentUser?.uid; // Ensure the user is logged in
        if (userId) {
            await saveFcmToken(userId, newToken);
        }
    });
    
    },[])
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,  // Disable header globally for all screens
      }}
    >
      <Stack.Screen name="Chats">
        {() => <Chats setUnreadCount={setUnreadCount}  />}
      </Stack.Screen>
   
    </Stack.Navigator>
  );
};


const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={StackNavigator} options={{ headerShown: false }} />
    <Stack.Screen
      name="Chat"
      component={Chat}
      options={({ route }) => ({
        headerTitle: () => <ChatHeader chatName={route.params.chatName} />,
       
      })}
    />
    <Stack.Screen name="Users" component={Users} options={{ title: 'Select User' }} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='Login' component={Login} />
    <Stack.Screen name='SignUp' component={SignUp} />
  </Stack.Navigator>
);

const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async authenticatedUser => {
      setUser(authenticatedUser || null);
      setIsLoading(false);
    });

    return unsubscribeAuth;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }


  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <MenuProvider>
      <AuthenticatedUserProvider>
        <UnreadMessagesProvider>
          <RootNavigator />
        </UnreadMessagesProvider>
      </AuthenticatedUserProvider>
    </MenuProvider>
  );
};

export default App;
