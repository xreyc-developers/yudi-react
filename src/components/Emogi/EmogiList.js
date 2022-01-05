import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import MessageForm from "../Messages/MessageForm";
import classes from './EmogiList.module.css';
import { Emogi } from "../../constants/Emogi";
import HeaderMenu from "../Layout/HeaderMenu";

const EmogiList = (props) => {
    const [currentTab, setCurrentTab] = useState('smiley');

    const clickEmogiHandler = (emogi) => {
        props.onEmogiEnteredHandler(emogi);
    }

    let emogiList = [];

    if(currentTab == 'smiley') {
        emogiList = Emogi.smiley;
    }
    else if(currentTab == 'animals') {
        emogiList = Emogi.animals;
    }
    else if(currentTab == 'foods') {
        emogiList = Emogi.foods;
    } else {
        emogiList = Emogi.smiley;
    }
    

    const changeTabHandler = (tab) => {
        setCurrentTab(tab);
    }

    return (
        <div className={classes['emogi-wrapper']}>
            
            <HeaderMenu />
            
            <div className={classes['emogi-list-wrapper']}>
                {emogiList.map(emogi => <span key={emogi.id} onClick={() => clickEmogiHandler(emogi.emogi_code)}>{emogi.emogi_code}</span>)}
            </div>

            <div className={classes['emogi-tab']}>
                <span onClick={() => changeTabHandler('smiley')}>😀</span>
                <span onClick={() => changeTabHandler('animals')}>🐶</span>
                <span onClick={() => changeTabHandler('foods')}>🍎</span>
            </div>
        </div>
    )
}

export default EmogiList;