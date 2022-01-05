import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faUser } from '@fortawesome/free-regular-svg-icons'
import { faComment as faCommentSolid, faUser as faUserSolid } from '@fortawesome/free-solid-svg-icons';
import classes from './ContactList.module.css';
// COMPONENTS
import ContactItem from "./ContactItem";
// FIREBASE
import { db } from "../../firebase/firebase";
import { collection, query, orderBy, getDocs, where, limit } from "firebase/firestore";
import { setContacts, setActiveContact } from "../../store/contacts/contactsSlice";
import HeaderLogo from "../Layout/HeaderLogo";

const ContactList = (props) => {
    const dispatch = useDispatch();
    const contactList = useSelector(state => state.contacts);
    const authUser = useSelector(state => state.auth);
    const [activeTab, setActiveTab] = useState('messages');
    const [searchKey, setSearchKey] = useState('');

    // PREPARATION
    useEffect(() => {
        dispatch(setContacts([]));

        // PROFILES TAB
        const getAllUsers = async () => {
            // GET ALL USERS
            let getAllUserQuery;
            if(searchKey === '') {
                getAllUserQuery = query(collection(db, "users"),limit(20));
            } else {
                getAllUserQuery = query(
                    collection(db, "users"),
                    where("fullname", "==", searchKey),
                    limit(20)
                );
            }
            const usersDocumentSnapshots = await getDocs(getAllUserQuery);

            // GET ALL CONTACTS
            const getAllContactsQuery = query(collection(db, "contacts"),where("uid", "==", authUser.uid));
            const contactsDocumentSnapshots = await getDocs(getAllContactsQuery);

            let userListNew = usersDocumentSnapshots.docs.map(doc => {
                const contactData = doc.data();
                return {
                    id: doc.id,
                    uid: doc.id,
                    fullname: contactData.fullname,
                    email: contactData.email,
                    character_code: contactData.character_code
                }
            });

            contactsDocumentSnapshots.docs.forEach(doc => {
                const contactData = doc.data();
                // REMOVE USERS ALREADY EXIST IN CONTACT
                userListNew = userListNew.filter(contact => contact.uid !== contactData.contact_uid);
            });

            // REMOVE THE USER FROM CONTACT LIST
            userListNew = userListNew.filter(contact => contact.uid !== authUser.uid);

            const activeContact = userListNew[0];

            dispatch(setContacts(userListNew));
            dispatch(setActiveContact({
                uid: activeContact.uid,
                fullname: activeContact.fullname,
                character_code: activeContact.character_code
            }))

        }

        // MESSAGE TAB
        const getAllContacts = async () => {
            let getAllContactsQuery;
            if(searchKey === '') {
                getAllContactsQuery = query(
                    collection(db, "contacts"),
                    where("uid", "==", authUser.uid),
                    orderBy("createdOn")
                );
            } else {
                getAllContactsQuery = query(
                    collection(db, "contacts"),
                    where("uid", "==", authUser.uid),
                    where("fullname", "==", searchKey),
                    orderBy("createdOn")
                );
            }
            const documentSnapshots = await getDocs(getAllContactsQuery);

            let contactsListNew = documentSnapshots.docs.map(doc => {
                const contactData = doc.data();
                return {
                    id: doc.id,
                    uid: contactData.contact_uid,
                    fullname: contactData.fullname,
                    email: contactData.email,
                    character_code: contactData.character_code
                }
                
            });

            contactsListNew = contactsListNew.filter(contact => contact.uid !== authUser.uid);

            const activeContact = contactsListNew[0];

            if(contactsListNew.length === 0) return;

            dispatch(setContacts(contactsListNew));
            dispatch(setActiveContact({
                uid: activeContact.uid,
                fullname: activeContact.fullname,
                character_code: activeContact.character_code
            }));
        }

        if(activeTab === 'profiles') {
            getAllUsers();
        } else {
            getAllContacts();
        }

        
    }, [activeTab, searchKey, authUser.uid, dispatch]);

    const changeActiveContact = (currContact) => {
        dispatch(setActiveContact({
            uid: currContact.uid,
            fullname: currContact.fullname,
            character_code: currContact.character_code
        }))
    }

    const changeActiveTab = (tab) => {
        setActiveTab(tab);
    }

    const removeContactFromList = (contact_id) => {
        const newContactList = [...contactList.contacts];
        const indexOfContact = newContactList.map(contact => contact.id).indexOf(contact_id);
        newContactList.splice(indexOfContact, 1);
        dispatch(setContacts(newContactList));
    }

    const activeTabStyle = {
        backgroundColor: '#f9f9f9',
        color: 'var(--color-primary)'
    }

    return (
        <div className={classes['contacts-wrapper']}>

            <HeaderLogo />

            <div className={classes['contacts-tab-wrapper']}>
                <div style={activeTab === 'messages' ? activeTabStyle : {} } onClick={() => changeActiveTab('messages')}>
                    <FontAwesomeIcon icon={activeTab === 'messages' ? faCommentSolid : faComment}/>
                </div>
                <div style={activeTab === 'profiles' ? activeTabStyle : {} } onClick={() => changeActiveTab('profiles')}>
                    <FontAwesomeIcon icon={activeTab === 'profiles' ? faUserSolid : faUser}/>
                </div>
            </div>
            
            <div className={classes['contacts-search-wrapper']}>
                <input placeholder="Search" onChange={(event) => setSearchKey(event.target.value)}/>
            </div>

            <div className={classes['contacts-list-wrapper']}>
                {contactList.contacts.map(contact => {
                    let isActive;
                    if(contactList.activeContact.uid === contact.uid) {
                        isActive = true;
                    } else {
                        isActive = false;
                    }
                    const hasUnreadMessage = true;
                    return (
                        <ContactItem
                            key={contact.id}
                            contact={contact}
                            isActive={isActive}
                            hasUnreadMessage={hasUnreadMessage}
                            activeTab={activeTab}
                            removeContactFromList={removeContactFromList}
                            onClick={() => {
                                changeActiveContact(contact);
                            }}
                            />
                        )
                })}
            </div>
        </div>
    )
}

export default ContactList;