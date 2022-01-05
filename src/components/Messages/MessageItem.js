import React from "react";
import classes from './MessageItem.module.css';

const MessageItem = (props) => {
    let alignment;
    let bgColor;
    if(props.message.uida === props.message.sender_uid) {
        alignment = { textAlign: 'right' };
        bgColor = { backgroundColor: '#d8ebff'}
    }

    return (
        <div className={classes['message-item']} style={alignment}>
            <span style={bgColor}>{props.message.message}</span>
        </div>
    )
}

export default MessageItem;