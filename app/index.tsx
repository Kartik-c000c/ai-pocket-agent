// import Colors from "@/shared/Colors";
// import {useAuth,useUser} from '@clerk/clerk-expo'
// import { Platform, Text, View ,Image, Dimensions, TouchableOpacity, ActivityIndicator} from "react-native";
// import {useEffect,useCallback, useState} from 'react'
// import * as WebBrowser from 'expo-web-browser'
// import * as AuthSession from 'expo-auth-session'
// import { useSSO } from '@clerk/clerk-expo'
// import { router, useRouter } from "expo-router";
// import { firestoreDb } from "@/config/FirebaseConfig";
// import {doc,setDoc} from "firebase/firestore"

// export const useWarmUpBrowser = () => {
//   useEffect(() => {
//     if (Platform.OS !== 'android') return
//     void WebBrowser.warmUpAsync()
//     return () => {
//       // Cleanup: closes browser when component unmounts
//       void WebBrowser.coolDownAsync()
//     }
//   }, [])
// }
// WebBrowser.maybeCompleteAuthSession()


// export default function Index() {
//   const {isSignedIn} = useAuth()
//   const router = useRouter();
//   const {user} = useUser();
//   const [loading,setLoading] = useState(true);
//   console.log(user?.primaryEmailAddress?.emailAddress);
//   useEffect(()=>{
//     if(isSignedIn){
//        //redirect to home screen
//        router.replace("/(tabs)/Home")
//     }
//     if(isSignedIn!=undefined){
//       setLoading(false);
//     }
//   },[isSignedIn])
//   useWarmUpBrowser()

//   // Use the `useSSO()` hook to access the `startSSOFlow()` method
//   const { startSSOFlow } = useSSO()

//   const onLoginPress = useCallback(async () => {
//     try {
//       // Start the authentication process by calling `startSSOFlow()`
//       const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
//         strategy: 'oauth_google',
//         // For web, defaults to current path
//         // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
//         // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
//         redirectUrl: AuthSession.makeRedirectUri(),
//       })
//       if(signUp)
//       {
//         await setDoc(doc(firestoreDb,'users',signUp.emailAddress??''),{
//           email:signUp.emailAddress,
//           name:signUp.firstName+" "+signUp.lastName,
//           joinDate:Date.now(),
//           credits:20
//         });
//       }

//       // If sign in was successful, set the active session
//       if (createdSessionId) {
//         setActive!({
//           session: createdSessionId,
//           // Check for session tasks and navigate to custom UI to help users resolve them
//           // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
//           navigate: async ({ session }) => {
//             if (session?.currentTask) {
//               console.log(session?.currentTask)
//               return
//             }

//             router.push('/')
//           },
//         })
//       } else {
//         // If there is no `createdSessionId`,
//         // there are missing requirements, such as MFA
//         // See https://clerk.com/docs/guides/development/custom-flows/authentication/oauth-connections#handle-missing-requirements
//       }
//     } catch (err) {
//       // See https://clerk.com/docs/guides/development/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2))
//     }
//   }, [])

//   return (
//     <View
//       style={{
//         flex: 1,
//         padding: 20,
//         paddingTop:Platform.OS=='android'? 30:40,
//         justifyContent:'center',
//         backgroundColor:'white'
//       }}
//     >
//       <Image source={require('./../assets/images/images.png')}
//         style={{
//           width:Dimensions.get('screen').width*0.85,
//           height:280,
//           margin:12,
//           resizeMode:'contain',
//           marginTop:40
//         }}
//       />
//       <View>
//         <Text style={{
//           fontSize:25,
//           fontWeight:'bold',
//           textAlign:'center',
//           marginBottom:10,

//         }}>Welcome to AI Pocket Agent</Text>
//         <Text
//          style={{
//           fontSize:18,
//           textAlign:'center',
//           color:Colors.GRAY
//          }}
//         >Your Ultimate Ai Personal Agent.Try it today,Completely Free!</Text>
//        {!loading&& <TouchableOpacity style={{
//           width:'100%',
//           padding:15,
//           backgroundColor:Colors.BLACK,
//           borderRadius:12,
//           marginTop:50
//         }} 
//         onPress={onLoginPress}
//         >
//           <Text style={{
//             color:Colors.WHITE,
//             textAlign:'center',
//             fontSize:16
//           }}>Get Started</Text>
//         </TouchableOpacity>
//    }
//    {loading==undefined&&
//     <ActivityIndicator size={'large'}/>
//    }
//       </View>
//     </View>
//   );
// }
//----------------------------------------------------------------------------------
// import Colors from "@/shared/Colors";
// import { useAuth, useUser } from '@clerk/clerk-expo'
// import {
//   Platform,
//   Text,
//   View,
//   Image,
//   Dimensions,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import { useEffect, useCallback, useState } from 'react'
// import * as WebBrowser from 'expo-web-browser'
// import * as AuthSession from 'expo-auth-session'
// import { useSSO } from '@clerk/clerk-expo'
// import { useRouter } from "expo-router";
// import { firestoreDb } from "@/config/FirebaseConfig";
// import { doc, setDoc } from "firebase/firestore"

// WebBrowser.maybeCompleteAuthSession()

// export default function Index() {
//   const { isSignedIn } = useAuth()
//   const { user } = useUser()
//   const router = useRouter()

//   const [loading, setLoading] = useState(true)

//   /* ---------- REDIRECT IF LOGGED IN ---------- */
//   useEffect(() => {
//     if (isSignedIn === true) {
//       router.replace('/(tabs)/Home')
//     }
//     if (isSignedIn === false) {
//       setLoading(false)
//     }
//   }, [isSignedIn])

//   /* ---------- SSO ---------- */
//   const { startSSOFlow } = useSSO()

//   const onLoginPress = useCallback(async () => {
//     try {
//       const { createdSessionId, setActive, signUp } =
//         await startSSOFlow({
//           strategy: 'oauth_google',
//           redirectUrl: AuthSession.makeRedirectUri(),
//         })

//       // new user
//       if (signUp?.emailAddress) {
//         await setDoc(
//           doc(firestoreDb, 'users', signUp.emailAddress),
//           {
//             email: signUp.emailAddress,
//             name: `${signUp.firstName ?? ''} ${signUp.lastName ?? ''}`,
//             joinDate: Date.now(),
//             credits: 20,
//           },
//           { merge: true }
//         )
//       }

//       if (createdSessionId) {
//         await setActive!({ session: createdSessionId })
//         router.replace('/(tabs)/Home') // 🔥 CORRECT ROUTE
//       }
//     } catch (err) {
//       console.log('Login error:', err)
//     }
//   }, [])

//   /* ---------- UI ---------- */
//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     )
//   }

//   return (
//     <View
//       style={{
//         flex: 1,
//         padding: 20,
//         paddingTop: Platform.OS === 'android' ? 30 : 40,
//         justifyContent: 'center',
//         backgroundColor: 'white',
//       }}
//     >
//       <Image
//         source={require('./../assets/images/images.png')}
//         style={{
//           width: Dimensions.get('screen').width * 0.85,
//           height: 280,
//           resizeMode: 'contain',
//           alignSelf: 'center',
//           marginBottom: 30,
//         }}
//       />

//       <Text
//         style={{
//           fontSize: 25,
//           fontWeight: 'bold',
//           textAlign: 'center',
//           marginBottom: 10,
//         }}
//       >
//         Welcome to AI Pocket Agent
//       </Text>

//       <Text
//         style={{
//           fontSize: 18,
//           textAlign: 'center',
//           color: Colors.GRAY,
//         }}
//       >
//         Your Ultimate AI Personal Agent. Try it today, completely free!
//       </Text>

//       <TouchableOpacity
//         style={{
//           width: '100%',
//           padding: 15,
//           backgroundColor: Colors.BLACK,
//           borderRadius: 12,
//           marginTop: 50,
//         }}
//         onPress={onLoginPress}
//       >
//         <Text
//           style={{
//             color: Colors.WHITE,
//             textAlign: 'center',
//             fontSize: 16,
//           }}
//         >
//           Get Started
//         </Text>
//       </TouchableOpacity>
//     </View>
//   )
// }
//------------------------------------------------------------------------
import Colors from "@/shared/Colors";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";

import { useEffect, useState } from "react";
import { useAuth, useSSO } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  const { isLoaded, isSignedIn } = useAuth();   // 🔥 IMPORTANT
  const { startSSOFlow } = useSSO();

  const [loading, setLoading] = useState(true);

  /* ---------- AUTH STATE ---------- */
  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      router.replace("/(tabs)/Home");
    } else {
      setLoading(false);
    }
  }, [isLoaded, isSignedIn]);

  /* ---------- LOGIN ---------- */
  const onLoginPress = async () => {
    // 🔥 Guard: auth ready nahi → kuch mat karo
    if (!isLoaded) return;

    try {
      const { createdSessionId, setActive } =
        await startSSOFlow({
          strategy: "oauth_google",
        });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/(tabs)/Home");
      }
    } catch (e) {
      console.log("LOGIN ERROR:", e);
    }
  };

  /* ---------- LOADING SCREEN ---------- */
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  /* ---------- UI ---------- */
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        paddingTop: Platform.OS === "android" ? 30 : 40,
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Image
        source={require("./../assets/images/images.png")}
        style={{
          width: Dimensions.get("screen").width * 0.85,
          height: 280,
          resizeMode: "contain",
          alignSelf: "center",
          marginBottom: 30,
        }}
      />

      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Welcome to AI Pocket Agent
      </Text>

      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          color: Colors.GRAY,
        }}
      >
        Your Ultimate AI Personal Agent. Try it today, completely free!
      </Text>

      {/* 🔥 FINAL FIXED BUTTON */}
      <TouchableOpacity
        disabled={!isLoaded}
        onPress={onLoginPress}
        style={{
          width: "100%",
          padding: 15,
          backgroundColor: isLoaded ? Colors.BLACK : "#ccc",
          borderRadius: 12,
          marginTop: 50,
        }}
      >
        <Text
          style={{
            color: Colors.WHITE,
            textAlign: "center",
            fontSize: 16,
          }}
        >
          {isLoaded ? "Get Started" : "Loading..."}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
