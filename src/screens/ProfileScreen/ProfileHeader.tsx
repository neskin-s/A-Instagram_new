import {useNavigation} from '@react-navigation/native';
import {Image, Text, View} from 'react-native';
import user from '../../assets/data/user.json';
import Button from '../../components/Button';
import {ProfileNavigationProp} from '../../navigation/types';
import {signOut} from '../AuthScreen/AuthScreen';
import styles from './styles';

const ProfileHeader = () => {
  const navigation = useNavigation<ProfileNavigationProp>();

  const navigateToEdit = () => {
    navigation.navigate('Edit Profile');
  };
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        {/* Profile image */}
        <Image source={{uri: user.image}} style={styles.avatar} />
        {/* Posts, followers, following number */}
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>98</Text>
          <Text>Post</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>198</Text>
          <Text>Followers</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>298</Text>
          <Text>Following</Text>
        </View>
        {/* Profile image */}
      </View>
      <Text style={styles.name}>{user.name}</Text>
      <Text>{user.bio}</Text>
      <View style={{flexDirection: 'row'}}>
        <Button text="Edit Profile" onPress={navigateToEdit} />
        <Button text="Go back" onPress={signOut} />
      </View>
    </View>
  );
};

export default ProfileHeader;
