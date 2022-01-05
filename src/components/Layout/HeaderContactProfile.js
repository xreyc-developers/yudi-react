import React from "react";
import { useSelector } from "react-redux";
import classes from './HeaderContactProfile.module.css';
// COMPONENTS
import Charater from "../UI/Characters/Character";


const HeaderContactProfile = () => {
    const activeContact = useSelector(state => state.contacts.activeContact);

    return (

        <div className={classes['contact-name']}>
            <div>{activeContact.character_code && <Charater character_code={activeContact.character_code} style={{ height: '40px' }}/>}</div>
            <div><span>{activeContact.fullname}</span></div>
        </div>

    )
}

export default HeaderContactProfile;