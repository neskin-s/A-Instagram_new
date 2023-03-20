import {Text, Pressable, StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

interface IButton {
  text?: string;
  onPress?: () => void;
}

const Button = ({text = '', onPress = () => {}}: IButton) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    fontWeight: fonts.weight.semi,
  },
  container: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,

    padding: 5,
    alignItems: 'center',
    flex: 1,
    margin: 5,
  },
});

export default Button;
