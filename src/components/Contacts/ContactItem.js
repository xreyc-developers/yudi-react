import React, { useState } from "react";
import Charater from "../UI/Characters/Character";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import classes from './ContactItem.module.css';
//REDUX
import { useSelector } from "react-redux";
// FIREBASE
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const ContactItem = (props) => {
    const authUser = useSelector(state => state.auth);
    const [isShowMenu, setIsShowMenu] = useState(false);

    const addUserToContact = () => {
        setIsShowMenu(false);
        const addNewContact = async () => {
            await addDoc(collection(db, "contacts"), {
                uid: authUser.uid,
                contact_uid: props.contact.uid,
                fullname: props.contact.fullname,
                email: props.contact.email,
                character_code: props.contact.character_code,
                createdOn: Date.now()
            });
            props.removeContactFromList(props.contact.id);
        }
        addNewContact();
    }

    const removeFromContact = () => {
        setIsShowMenu(false);
        const removeRecord = async () => {
            await deleteDoc(doc(db, "contacts", props.contact.id));
            props.removeContactFromList(props.contact.id);
        }
        removeRecord();
    }

    return (
        <div className={props.isActive ? classes['contact-item-active'] : classes['contact-item']} onClick={props.onClick}>
            <div>
                <Charater character_code={props.contact.character_code} style={{ height: '50px' }}/>
            </div>
            
            <div>
                <span>{props.contact.fullname}</span>
            </div>
            
            <div>
                {props.activeTab == 'profiles' && <span onClick={() => setIsShowMenu(state => !state)}><FontAwesomeIcon icon={faPlus} /></span>}
                {props.activeTab == 'messages' && <span onClick={() => setIsShowMenu(state => !state)}><FontAwesomeIcon icon={faEllipsisH} /></span>}
                {isShowMenu && props.activeTab == 'messages' && <div className={classes['remove-contact']}>
                    <span onClick={removeFromContact}>Remove</span>
                </div>}
                {isShowMenu && props.activeTab == 'profiles' && <div className={classes['remove-contact']}>
                    <span onClick={addUserToContact}>Add to Contact</span>
                </div>}
            </div>
        </div>
    )
}

export default ContactItem;