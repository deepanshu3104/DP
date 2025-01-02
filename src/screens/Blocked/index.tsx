import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { InitialProps } from '../../utilities/Props'
import { AppText, Wrapper, Header, TouchableComponent } from '../../utilities/Helpers'
import firestore from '@react-native-firebase/firestore';
import { colors,width } from "../../utilities/constants";
import ConfirmModal from '../../modals/ConfirmModal';

const Blocked: React.FC<InitialProps> = (props) => {
  const [products, setProducts] = useState<any>([]);
  const [userIds, setUserIds] = useState(props.route.params.blocked || []);
  const [sid, setsid] = useState<any>('');
  const [blockModal, setBlockModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [userIds]);

  const fetchUsers = async () => {
    try {
      // Query Firestore for users whose IDs match the array
      const usersSnapshot = await firestore()
        .collection('Users')
        .where(firestore.FieldPath.documentId(), 'in', userIds)
        .get();

      // Extract user data from documents
      const userData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(userData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const unblock = async (userId: string) => {
    try {
      // Remove the userId from the 'blocked' field in Firestore
      await firestore()
        .collection('Users')
        .doc(props.route.params.id) // Replace with the current user's document ID
        .update({
          blocked: firestore.FieldValue.arrayRemove(userId),
        });

      // Update local states
      setUserIds(prev  => prev.filter(id => id !== userId)); 
      setProducts(prev => prev.filter(user => user.id !== userId)); 

      console.log(`User ${userId} unblocked successfully!`);
    } catch (error) {
      console.error('Error unblocking user:', error);
    } finally {
      setBlockModal(false);
    }
  };

  const renderBlockedUser = ({ item }: any) => (
    <TouchableComponent onLongPress={() => { setsid(item.id); setBlockModal(true); }}>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          backgroundColor: 'white',
          width: width / 1.1,
          height: 70,
          alignItems: 'center',
          marginHorizontal: 20,
          borderWidth: 1,
          borderColor: colors.main2,
          borderRadius: 13,
        }}
      >
        <Image
          source={{ uri: item.images[0] }}
          style={{
            height: width / 8,
            width: width / 8,
            marginHorizontal: 20,
            marginLeft: 10,
            borderRadius: 8,
          }}
        />
        <AppText
          style={{
            fontSize: 23,
            color: 'black',
            fontWeight: '400',
          }}
        >
          {item.name}
        </AppText>
      </View>
    </TouchableComponent>
  );

  return (
    <Wrapper>
      <Header title="Blocked" onPress={() => props.navigation.goBack()} />
      {userIds.length !== 0 ? (
        <FlatList data={products} renderItem={renderBlockedUser} />
      ) : (
        <AppText style={{ textAlign: 'center', marginTop: 50 }}>No Data Found</AppText>
      )}
      <ConfirmModal
        isVisible={blockModal}
        title="Are you sure you want to unblock this user?"
        onBackdropPress={() => setBlockModal(false)}
        onPress={() => unblock(sid)}
      />
    </Wrapper>
  );
};

export default Blocked;
