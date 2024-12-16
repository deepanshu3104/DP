import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { InitialProps } from '../../utilities/Props'
import { AppText, Wrapper } from '../../utilities/Helpers'
import firestore from '@react-native-firebase/firestore';


const Blocked: React.FC<InitialProps> = (props) => {
  const [products, setProducts] = useState<any>([]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await firestore().collection("Users").get();
  
      let data: any = [];
      for (const documentSnapshot of querySnapshot.docs) {
        const userData = documentSnapshot.data();
        const blockedUserIds = userData.blocked || [];
  
        // Fetch names of blocked users
        const blockedUsers: any = [];
        for (const blockedUserId of blockedUserIds) {
          const blockedUserDoc = await firestore()
            .collection("Users")
            .doc(blockedUserId)
            .get();
          if (blockedUserDoc.exists) {
            const blockedUserData = blockedUserDoc.data();
            blockedUsers.push(blockedUserData?.name || "Unknown User");
          }
        }
  
        // Add the user with replaced blocked data
        data.push({
          id: documentSnapshot.id,
          ...userData,
          blocked: blockedUsers, // Replace IDs with names
        });
      }
  
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <Wrapper>
      <AppText>Blocked</AppText>
      <AppText
        style={{
          alignSelf: "center",
        }}
      >
        {products[0]?.blocked}
      </AppText>
    </Wrapper>
  )
}

export default Blocked