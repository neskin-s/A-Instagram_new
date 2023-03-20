import {FlatList, View} from 'react-native';
import comments from '../../assets/data/comments.json';
import Comment from '../../components/Comment';
import Input from './Input';

const CommentsScreen = () => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={comments}
        renderItem={({item}) => (
          <Comment includeDetails={true} comment={item} />
        )}
        style={{padding: 10}}
      />
      <Input />
    </View>
  );
};

export default CommentsScreen;
