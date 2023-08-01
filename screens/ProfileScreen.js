import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';

const UserProfile = () => {
 const dispatch= useDispatch
    const user = useSelector((state) => state.user.value);
    
    const recentActivities = [
    { id: 1, title: 'Publication 1', date: '2023-07-30' },
    { id: 2, title: 'Publication 2', date: '2023-07-29' },
    { id: 3, title: 'Publication 3', date: '2023-07-28' },
  ];
const handelLogout =() => {
  dispatch(logout())
}
  return (
    <ScrollView style={styles.container}>

          <View style={styles.topContainer}>

          </View>

      <View style={styles.header}>
        {/* <Image source={userData.profilePicture} style={styles.profilePicture} /> */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{user.name}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activités récentes</Text>
        {recentActivities.map((activity) => (
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activityDate}>Date: {activity.date}</Text>
            </View>
        ))}
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() =>handelLogout} 
        >
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userInfoContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userAge: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  userOccupation: {
    fontSize: 18,
    color: '#333',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityIcon: {
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
  },
  activityDate: {
    color: '#666',
  },
  logoutContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  logoutButton: {
    backgroundColor: '#f00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserProfile;
