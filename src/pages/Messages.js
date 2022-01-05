import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ContactList from "../components/Contacts/ContactList";
import EmogiList from "../components/Emogi/EmogiList";
import MessageList from "../components/Messages/MessageList";

import classes from './Messages.module.css';

const Messages = () => {
    const [messageEntered, setMessageEntered] = useState('');

    const onEnteredMessageHandler = (message) => {
        setMessageEntered(message);
    }

    const onEmogiEnteredHandler = (emogi) => {
        setMessageEntered(prevState => {
            return prevState + emogi;
        })
    }

    const resetMessageHandler = () => {
        setMessageEntered("");
    }

    return (
        <Row>
            <Col md={3} sm={3} xs={3} className="nopadding">
                <ContactList />
            </Col>
            <Col md={6} sm={6} xs={6} className="nopadding">
                <MessageList 
                    onEnteredMessageHandler={onEnteredMessageHandler} 
                    resetMessageHandler={resetMessageHandler}
                    messageEntered={messageEntered} 
                />
            </Col>
            <Col md={3} sm={3} xs={3} className="nopadding">
                <EmogiList onEmogiEnteredHandler={onEmogiEnteredHandler} />
            </Col>
        </Row>
    )
}

export default Messages;