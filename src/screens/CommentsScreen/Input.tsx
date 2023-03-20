import {useState} from 'react';
import {View, Text, Image, StyleSheet, TextInput} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

const Input = () => {
  const [newComment, setNewComment] = useState('');
  const onPost = () => {
    setNewComment('');
  };

  return (
    <View style={styles.root}>
      <Image
        source={{
          uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
        }}
        style={styles.image}
      />
      <TextInput
        value={newComment}
        onChangeText={setNewComment}
        style={styles.input}
        placeholder="Wtite your comment"
        multiline
      />
      <Text onPress={onPost} style={styles.button}>
        POST
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 40,
    borderRadius: 20,
    aspectRatio: 1,
  },
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  input: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
    margin: 5,
    paddingRight: 50,
  },
  button: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{translateY: -4}],
    fontSize: fonts.size.sm,
    fontWeight: fonts.weight.full,
    color: colors.primary,
  },
});

export default Input;
