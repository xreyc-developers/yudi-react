import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import classes from './HeaderMenu.module.css';
// REDUX ACTIONS
import { logoutAction } from "../../store/auth/authSlice";
import { showLoading, hideLoading } from "../../store/ui/uiLoading";
import { showFeedbackMessage } from "../../store/ui/uiFeedbackMessage";
// FIREBASE
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
// COMPONENTS
import Charater from "../UI/Characters/Character";


const HeaderMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authUser = useSelector(state => state.auth);

    const logoutHandler = () => {
        const signoutUser = async () => {
            dispatch(showLoading());
            signOut(auth).then(() => {
                dispatch(logoutAction());
                dispatch(hideLoading());
                navigate('/', { replace: true });
            }).catch((err) => {
                console.log(err);
                dispatch(hideLoading());
                dispatch(showFeedbackMessage('Something went wrong!'));
            });
        }
        signoutUser();
    }

    return (
        <div className={classes['profile-name']}>
            <div><Charater character_code={authUser.character_code} style={{ height: '40px' }}/></div>
            <div>
                <span>{authUser.fullname}</span>
                <a onClick={logoutHandler}>Logout <FontAwesomeIcon icon={faSignOutAlt}/></a>
            </div>
        </div>
    )
}

export default HeaderMenu;