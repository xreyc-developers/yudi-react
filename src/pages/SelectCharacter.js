import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
// STYLES
import classes from './SelectCharacter.module.css';
// COMPONENTS
import CloudBackground from "../components/UI/Background/CloudBackgroud";
import ButtonPrimary from "../components/UI/Widgets/ButtonPrimary";
import Character from "../components/UI/Characters/Character";
// FIRESTORE
import { db } from "../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
// CONSTANTS
import { charactersSet } from "../constants/Characters";
// STORE ACTIONS
import { showLoading, hideLoading } from "../store/ui/uiLoading";
import { showFeedbackMessage } from "../store/ui/uiFeedbackMessage";

const CHARACTERS_SET = charactersSet;

const SelectCharacter = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedCharacter, setSelectedCharacter] = useState('character_01');

    const selectCharacterHandler = (selected_character) => {
        setSelectedCharacter(selected_character);
    }

    const updateCharacterCode = async () => {
        dispatch(showLoading());
        try {
            const auth_uid = localStorage.getItem('auth_uid');

            const userDocument = doc(db, "users", auth_uid);
            const docSnap = await getDoc(userDocument);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                await setDoc(userDocument, {
                    fullname: userData.fullname,
                    email: userData.email,
                    character_code: selectedCharacter,
                    createdOn: userData.createdOn,
                    updatedOn: Date.now()
                });
            } else {
                dispatch(showFeedbackMessage('Ops, something went wrong!'));
            }

            dispatch(hideLoading());
            navigate("/messages", { replace: true });
        } catch (err) {
            dispatch(hideLoading());
            dispatch(showFeedbackMessage());
        }
        dispatch(hideLoading());
    }

    const selectedSubmitHandler = (e) => {
        e.preventDefault();
        updateCharacterCode();
    }

    return (
        <>
            <CloudBackground />

            <div className={classes['character-selection-wrapper']}>
                <div className={classes['character-selection-container']}>

                    <div className={classes['character-selection-title']}>
                        SELECT YOUR AVATAR
                    </div>

                    <div className="vertical-line" style={{ width: "400px"}}></div>

                    <div className={classes['character-selection-list-wrap']}>
                        <div>
                            <Row>
                                {CHARACTERS_SET.map(character_code => {
                                    return (
                                        <Col
                                            key={character_code}
                                            md={4}
                                            onClick={() => {
                                                selectCharacterHandler(character_code);
                                            }}
                                            className={selectedCharacter == character_code ? classes['character-selection-selected-wrap'] : '' } style={{ marginBottom: '50px' }}>
                                            <Character character_code={character_code}/>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>
                    </div>

                    <div className={classes['character-selection-group']}>
                        <ButtonPrimary onClick={selectedSubmitHandler} style={{ width: '200px' }}>Select</ButtonPrimary>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectCharacter;