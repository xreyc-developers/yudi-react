import React from "react";
import { useSelector } from "react-redux";
import classes from './MessageForm.module.css';
// FIREBASE
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; 
import { db } from "../../firebase/firebase";

const MessageForm = (props) => {
    const activeContact = useSelector(state => state.contacts.activeContact);
    const authUser = useSelector(state => state.auth);

    const sendMessageHandler = (message) => {
        const sendMessage = async () => {

            // CHECK IF THIS USER IS ON CONTACT OF THE OTHER USER
            // IF CONTACT DOES NOT EXIST FOR BOTH USER, USER WILL NOT BE ABLE
            // TO SEND SOMETHING
            const checkContactQuery = query(
                collection(db, "contacts"),
                where("uid", "==", activeContact.uid)
            );
            const checkContactSnapshot = await getDocs(checkContactQuery);
            let contactsListNew = checkContactSnapshot.docs.map(doc => {
                const contactData = doc.data();
                return { uid: contactData.uid }
            });
            if(contactsListNew.length === 0) return;

            // CREATE MESSAGE FOR BOTH SENDER AND RECEIVER
            const createdOn = Date.now();
            await addDoc(collection(db, "messages"), {
                uida: authUser.uid,
                uidb: activeContact.uid,
                sender_uid: authUser.uid,
                receiver_uid: activeContact.uid,
                message: message,
                createdOn: createdOn
            });
            await addDoc(collection(db, "messages"), {
                uida: activeContact.uid,
                uidb: authUser.uid,
                sender_uid: authUser.uid,
                receiver_uid: activeContact.uid,
                message: message,
                createdOn: createdOn
            });
            props.resetMessageHandler();
        }
        sendMessage();
    }

    const enteredMessageHandler = (event) => {
        const enteredMessage = event.target.value;
        props.onEnteredMessageHandler(enteredMessage);
    }

    const enterKeypressHandler = (event) => {
        if(event.keyCode === 13 && event.shiftKey === false) {
            event.preventDefault();
            const enteredMessage = event.target.value;
            if(enteredMessage === '') return;
            sendMessageHandler(enteredMessage);
        }
    }

    return (
        <div className={classes['message-form']}>
            <textarea placeholder="Message" onKeyDown={enterKeypressHandler} onChange={enteredMessageHandler} value={props.messageEntered}></textarea>
        </div>
    )
}

export default MessageForm;