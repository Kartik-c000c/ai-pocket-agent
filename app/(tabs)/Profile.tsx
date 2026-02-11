import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native'
import React from 'react'
import { Plus, Compass, History, LogOut } from 'lucide-react-native'
import Colors from '@/shared/Colors'
import { useRouter } from 'expo-router'
import { useUser, useAuth } from '@clerk/clerk-expo'
import * as AuthSession from "expo-auth-session";

export default function Profile() {
  const router = useRouter()
  const { user } = useUser()
  const { signOut } = useAuth()

  /* ---------- LOGOUT ---------- */
  const onLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await signOut();
         
          // Clerk automatically redirects to auth flow
        },
      },
    ])
  }

  return (
    <View style={styles.container}>
      {/* ---------- PROFILE HEADER ---------- */}
      <View style={styles.profileBox}>
        <Image
          source={{
            uri:
              user?.imageUrl ??
              'https://i.pravatar.cc/300',
          }}
          style={styles.avatar}
        />
        <Text style={styles.email}>
          {user?.primaryEmailAddress?.emailAddress ?? 'user@example.com'}
        </Text>
      </View>

      {/* ---------- MENU OPTIONS ---------- */}
      <View style={styles.menuBox}>
        <MenuItem
          icon={<Plus color={Colors.PRIMARY} />}
          label="Create Agent"
          onPress={() => router.push('/create-agent')}
        />

        <MenuItem
          icon={<Compass color={Colors.PRIMARY} />}
          label="Explore"
          onPress={() => router.push('/Explore')}
        />

        <MenuItem
          icon={<History color={Colors.PRIMARY} />}
          label="My History"
          onPress={() => router.push('/History')}
        />

        <MenuItem
          icon={<LogOut color="red" />}
          label="Logout"
          textColor="red"
          onPress={onLogout}
        />
      </View>
    </View>
  )
}

/* ---------- MENU ITEM ---------- */
const MenuItem = ({
  icon,
  label,
  onPress,
  textColor = Colors.BLACK,
}: {
  icon: React.ReactNode
  label: string
  onPress: () => void
  textColor?: string
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.iconBox}>{icon}</View>
    <Text style={[styles.menuText, { color: textColor }]}>
      {label}
    </Text>
  </TouchableOpacity>
)

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 20,
  },
  profileBox: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: Colors.GRAY,
  },
  menuBox: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  iconBox: {
    width: 30,
    alignItems: 'center',
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
  },
})
