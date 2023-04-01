import {FlatList, ViewabilityConfig, ViewToken} from 'react-native';
import FeedPost from '../../components/FeedPost';
// import posts from '../../assets/data/posts.json';
import {useEffect, useRef, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {IPost} from '../../types/models';

const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);

  const ref = firestore().collection('Post');

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list: any[] = [];
      querySnapshot.forEach(async doc => {
        const post = doc.data();
        let user: any = {};
        let comments: any = [];
        await firestore()
          .collection('User')
          .doc(post.userID)
          .get()
          .then(documentSnapshot => {
            console.log('User exists: ', documentSnapshot.exists);
            if (documentSnapshot.exists) {
              const userData = documentSnapshot.data();
              user = {
                id: documentSnapshot.id,
                ...userData,
              };
            }
          });
        await firestore()
          .collection('Comment')
          .where('postID', '==', doc.id)
          .get()
          .then(d => {
            d.forEach(async dSnapShot => {
              const commentData = dSnapShot.data();
              let commentUser: any = {};
              await firestore()
                .collection('User')
                .doc(commentData.userID)
                .get()
                .then(uSnapshot => {
                  console.log('User exists: ', uSnapshot.exists);
                  if (uSnapshot.exists) {
                    const userData = uSnapshot.data();
                    commentUser = {
                      id: uSnapshot.id,
                      image: userData?.image,
                      username: userData?.username,
                    };
                  }
                });

              comments.push({
                id: dSnapShot.id,
                ...commentData,
                user: commentUser,
              });
            });
          });

        list.push({
          id: doc.id,
          ...post,
          user,
          comments,
        });
        setPosts(list);
      });
    });
  }, []);

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        setActivePostId(viewableItems[0].item.id);
      }
    },
  );

  return (
    <FlatList
      data={posts}
      renderItem={({item}) => (
        <FeedPost post={item} isVisible={activePostId === item.id} />
      )}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

export default HomeScreen;
