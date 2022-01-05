// FIREBASE
import { auth } from "../../firebase/firebase";
import { db } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { showLoading, hideLoading } from "../ui/uiLoading";
import { showFeedbackMessage } from "../ui/uiFeedbackMessage";

// STORE ACTIONS
import { setAuthenticationValues } from "./authSlice";

export const signupAction = (email, password, fullname) => {
    return async dispatch => {
        try {
            dispatch(showLoading());
            const createdUser = await createUserWithEmailAndPassword(auth, email, password);
    
            const userDocument = doc(db, "users", createdUser.user.uid);
            await setDoc(userDocument, {
                fullname: fullname,
                email: email,
                character_code: 'character_01',
                createdOn: Date.now()
            });
    
            localStorage.setItem('auth_uid', createdUser.user.uid);
            localStorage.setItem('auth_email', createdUser.user.email);
            localStorage.setItem('userDetails_fullname', fullname);
            localStorage.setItem('userDetails_character_code', 'character_01');
            
            dispatch(setAuthenticationValues({
                uid: createdUser.user.uid,
                email: createdUser.user.email,
                fullname: fullname,
                character_code: 'character_01'
            }));
            dispatch(hideLoading());

            return {
                code: 200,
                message: "Successful"
            }
        } catch (err) {
            const errorCode = err.code;
            const errorMessage = err.message;
            dispatch(hideLoading());
            dispatch(showFeedbackMessage('Oh snap! Something went wrong!'));
            return {
                code: 400,
                message: `${errorCode} ${errorMessage}`
            }
        }
    }
}


export const loginAction = (email, password) => {
    return async dispatch => {
        try {
            dispatch(showLoading());

            const loggedInUser = await signInWithEmailAndPassword(auth, email, password);

            const userRef = doc(db, "users", loggedInUser.user.uid);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.data();

            localStorage.setItem('auth_uid', loggedInUser.user.uid);
            localStorage.setItem('auth_email', loggedInUser.user.email);        
            localStorage.setItem('userDetails_fullname', userData.fullname);
            localStorage.setItem('userDetails_character_code', userData.character_code);
            
            dispatch(setAuthenticationValues({
                uid: loggedInUser.user.uid,
                email: loggedInUser.user.email,
                fullname: userData.fullname,
                character_code: userData.character_code
            }));

            dispatch(hideLoading());

            return {
                code: 200,
                message: "Successful"
            }
        } catch (err) {
            const errorCode = err.code;
            const errorMessage = err.message;
            dispatch(hideLoading());
            dispatch(showFeedbackMessage('Invalid email or password'));
            return {
                code: 400,
                message: `${errorCode} ${errorMessage}`
            }
        }
    }
}