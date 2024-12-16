import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { InitialProps } from "../../utilities/Props";
import { AppText, Wrapper } from "../../utilities/Helpers";
import firestore from '@react-native-firebase/firestore';


const Favourites: React.FC<InitialProps> = (props) => {
  const [products, setProducts] = useState<any>([]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await firestore().collection("Users").get();

      let data: any = [];
      for (const documentSnapshot of querySnapshot.docs) {
        const userData = documentSnapshot.data();
        const favouriteUserIds = userData.favourite || [];

        // Fetch names of blocked users
        const favouriteUsers: any = [];
        for (const favouriteUserId of favouriteUserIds) {
          const favouriteUserDoc = await firestore()
            .collection("Users")
            .doc(favouriteUserId)
            .get();
          if (favouriteUserDoc.exists) {
            const favouriteUserData = favouriteUserDoc.data();
            favouriteUsers.push(favouriteUserData?.name || "Unknown User");
          }
        }

        // Add the user with replaced blocked data
        data.push({
          id: documentSnapshot.id,
          ...userData,
          favourite: favouriteUsers, // Replace IDs with names
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
      <AppText>Favourites</AppText>
       <AppText
              style={{
                alignSelf: "center",
              }}
            >
              {products[0]?.favourite}
            </AppText>
    </Wrapper>
  );
};

export default Favourites;
