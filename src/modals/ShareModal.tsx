import {FlatList, View } from "react-native";
import React, { useCallback, useState } from "react";
import Modal from "react-native-modal";
import {
    AppText,
    Commonbtn,
    ImageComponent,
    TouchableComponent,
} from "../utilities/Helpers";
import { width } from "../utilities/constants";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";
import Fontisto from "react-native-vector-icons/Fontisto";
import { Images } from "../utilities/Images";

const ShareModal = ({ data, isVisible, title, onPress, onBackdropPress, props }: any) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [products, setProducts] = useState<any[]>([]);

    const toggleSelection = (id: string) => {
        setSelectedIds((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((itemId) => itemId !== id) // Deselect item
                : [...prevSelected, id] // Select item
        );
    };

    const sendProfiles = async () => {
        if (selectedIds.length === 0) {
            console.log("No recipients selected", "Please select at least one recipient.");
            return;
        }
    
        try {
            const sentBy : any= await AsyncStorage.getItem("uid"); // The user sharing the profile
            const profileToShare = data; // Profile to be shared (from `props.data`)
            const recipients = selectedIds; // Selected recipient IDs
    
            // Validate profile to share
            if (!profileToShare || !profileToShare.id) {
                console.error("Profile to share is missing or invalid.");
                return;
            }
    
            // Share the profile with each selected recipient
            for (const sentTo of recipients) {
                const docid = sentTo > sentBy ? `${sentBy}_${sentTo}` : `${sentTo}_${sentBy}`;
                const chatDocRef = firestore().collection("Chat").doc(docid);
    
                // Update chat status
                await chatDocRef.set({ Status: true }, { merge: true });
    
                const msgRef = firestore().collection("Chat").doc(docid).collection("messages");
                const newmsgRef = msgRef.doc();
                const msgId = newmsgRef.id;
    
                // Prepare message object for sharing the profile
                const message = {
                    messageId: msgId,
                    type: "profile_share",
                    profile: profileToShare,
                    sentBy,
                    sentTo,
                    createdAt: new Date(),
                };
    
                // Save message in Firestore
                await newmsgRef.set(message);
            }
    
            // Reset selections and close modal
            setSelectedIds([]);
            onBackdropPress();
    
            console.log("Profile shared successfully!");
        } catch (error) {
            console.error("Error sharing profile:", error);
        }
    };
    

    const renderProfiles = ({ item }: any) => {
        const isSelected = selectedIds.includes(item.id);
    
        return (
            <TouchableComponent
                onPress={() => toggleSelection(item.id)}
                style={{
                    width: width / 3.5,
                    height: width / 3,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: width / 1,
                    backgroundColor: "transparent", 
                }}
            >
                <View
                    style={{
                        backgroundColor: "darkgrey",
                        alignItems: "center",
                        justifyContent: "center",
                        width: width / 5,
                        height: width / 5,
                        borderRadius: width / 1,
                    }}
                >
                    {item?.images?.length !== 0 ? (
                        <ImageComponent
                            source={{ uri: item?.images?.[0] }}
                            style={{
                                width: width / 5,
                                height: width / 5,
                                borderRadius: width / 1,
                            }}
                        />
                    ) : (
                        <Fontisto name={"person"} size={width / 5} color={"grey"} />
                    )}
                </View>
                {isSelected && (
                    <ImageComponent
                        source={Images.check}
                        style={{ height: 25, width: 25, position: "absolute", alignSelf: "flex-end", bottom: 40, right: 15 }}
                        resizeMode="contain"
                    />
                )}
                <AppText
                    style={{
                        color: "black",
                        fontWeight: "600",
                        alignSelf: "center",
                    }}
                >
                    {item.name}
                </AppText>
            </TouchableComponent>
        );
    };
    

    const fetchProducts = async () => {
        try {
            const querySnapshot = await firestore().collection("Users").get();
            const uid = await AsyncStorage.getItem("uid");

            let data: any[] = [];
            let blocked: string[] = [];
            let faves: string[] = [];
            querySnapshot.forEach((documentSnapshot) => {
                if (documentSnapshot.id === uid) {
                    blocked = documentSnapshot.data().blocked || [];
                    faves = documentSnapshot.data().favourite || [];
                } else {
                    data.push({
                        id: documentSnapshot.id,
                        ...documentSnapshot.data(),
                    });
                }
            });

            const filtered = data.filter((item: any) => !blocked.includes(item.id));

            filtered.forEach((item: any) => {
                item.favourite = faves.includes(item.id);
            });

            setProducts(filtered);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchProducts();
        }, [])
    );

    return (
        <Modal
            animationIn={"slideInUp"}
            animationOut={"slideOutDown"}
            isVisible={isVisible}
            backdropOpacity={0.4}
            onBackdropPress={onBackdropPress}
        >
            <View
                style={{
                    backgroundColor: "white",
                    height: width / 0.8,
                    justifyContent: "space-evenly",
                    borderRadius: 13,
                    marginTop: width / 1.05,
                    paddingTop: 10,
                }}
            >
                <FlatList
                    data={products}
                    numColumns={3}
                    renderItem={renderProfiles}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={{ bottom: width / 6 }}>
                <Commonbtn title="Send" onPress={sendProfiles} />
            </View>
        </Modal>
    );
};

export default ShareModal;
