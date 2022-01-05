import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from './MessageList.module.css';
// COMPONENTS
import MessageItem from "./MessageItem";
import MessageForm from "./MessageForm";
// FIREBASE
import { db } from "../../firebase/firebase";
import { collection, onSnapshot, query, orderBy, getDocs, where, limit, startAfter } from "firebase/firestore";
import HeaderContactProfile from "../Layout/HeaderContactProfile";


const MessageList = (props) => {
    const activeContact = useSelector(state => state.contacts.activeContact);
    const authUser = useSelector(state => state.auth);
    
    const [messages, setMessages] = useState([]);
    const [isLoadingMessage, setIsLoadingMessage] = useState(false);
    const [lastMessageSnapshot, setLastMessageSnapshot] = useState();
    const [isLinkedToUser, setIsLinkedToUser] = useState(false);

    const activeContactId = activeContact.uid;

    // PREPARATION
    useEffect(() => {
        setIsLoadingMessage(true);
        setMessages([]);
        
        const getAllMessageQuery = query(
            collection(db, "messages"),
            where("uida", "==", authUser.uid),
            where("uidb", "==", activeContact.uid),
            orderBy("createdOn", "desc"),
            limit(15)
        );

        const unsubscribe = onSnapshot(getAllMessageQuery, (querySnapshot) => {
            // SET THE LAST DOCUMENT FOR PAGINATION
            const lastMessage = querySnapshot.docs[querySnapshot.docs.length-1];
            setLastMessageSnapshot(lastMessage);
            // SET THE MESSAGES
            setMessages(prevMessages => {
                const messageListNew = [];
            
                querySnapshot.forEach((doc) => {
                    const messageData = doc.data();

                    const filteredMessages = prevMessages.filter(prevState => prevState.id === doc.id);
                    if(filteredMessages.length === 0) {
                        messageListNew.push({
                            id: doc.id,
                            uida: messageData.uida,
                            uidb: messageData.uidb,
                            sender_uid: messageData.sender_uid,
                            receiver_uid: messageData.receiver_uid,
                            message: messageData.message,
                            createdOn: messageData.createdOn
                        })
                    }
                });

                return [...messageListNew, ...prevMessages];
            });
        });

        setIsLoadingMessage(false);
        
        // CLEAR PREVIOUS LISTENER
        return () => {
            unsubscribe();
        }
    }, [activeContactId, activeContact.uid, authUser.uid]);

    // CHECK IF CURRENT USER IS LINKED TO THE AUTH USER
    useEffect(() => {
        const checkUser = async () => {
            const checkContactQuery = query(
                collection(db, "contacts"),
                where("uid", "==", activeContact.uid)
            );
            const checkContactSnapshot = await getDocs(checkContactQuery);
            let contactsListNew = checkContactSnapshot.docs.map(doc => {
                const contactData = doc.data();
                return { uid: contactData.uid }
            });
            if(contactsListNew.length === 0) {
                setIsLinkedToUser(false);
            } else {
                setIsLinkedToUser(true);
            }
        }
        checkUser();
    }, [activeContact.uid])


    const scrollTopHandler = (event) => {
        
        const scrollHeight = event.target.scrollHeight;
        const scrollTop = event.target.scrollTop;
        const clientHeight = event.target.clientHeight;

        if(!lastMessageSnapshot) return;

        if((scrollHeight + scrollTop) === (clientHeight)) {
            console.log('[TRIGGERED]');

            const getOldMessages = async () => {
                const getAllUserQuery = query(
                    collection(db, "messages"),
                    where("uida", "==", authUser.uid),
                    where("uidb", "==", activeContact.uid),
                    orderBy("createdOn", "desc"),
                    startAfter(lastMessageSnapshot),
                    limit(15)
                );

                const oldMessageListNew = [];

                const querySnapshot = await getDocs(getAllUserQuery);
                querySnapshot.forEach((doc) => {
                    const messageData = doc.data();
                    oldMessageListNew.push({
                        id: doc.id,
                        uida: messageData.uida,
                        uidb: messageData.uidb,
                        sender_uid: messageData.sender_uid,
                        receiver_uid: messageData.receiver_uid,
                        message: messageData.message,
                        createdOn: messageData.createdOn
                    });
                });

                const lastMessage = querySnapshot.docs[querySnapshot.docs.length-1];

                setLastMessageSnapshot(lastMessage);


                setMessages(prevMessages => {
                    return [...prevMessages, ...oldMessageListNew];
                })
            }
            getOldMessages();           
        }
    }

    return (
        <div className={classes['message-wrapper']}>

            <HeaderContactProfile />

            <div className={classes['message-list-wrapper']} onScroll={scrollTopHandler}>
                {isLoadingMessage && <p>Loading Messages...</p>}
                {!isLinkedToUser && <div className={classes['unlinked-message']}>You are not linked to this user.</div>}
                {messages.map(message => <MessageItem key={message.id} message={message} />)}
            </div>

            <div>
                <MessageForm 
                    onEnteredMessageHandler={props.onEnteredMessageHandler} 
                    resetMessageHandler={props.resetMessageHandler}
                    messageEntered={props.messageEntered}/>
            </div>

        </div>
    )
}

export default MessageList;