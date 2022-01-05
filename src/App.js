import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import PageNotFound from './error/PageNotFound';
import Login from './pages/Login';
import Messages from './pages/Messages';
import Register from './pages/Register';
import SelectCharacter from './pages/SelectCharacter';

// UTILS
import RequiredAuth from './utils/RequiredAuth';

// UI ELEMENTS
import { Alert } from "react-bootstrap";
import Loading from "./components/UI/Interaction/Loading";

// STORE ACTIONS
import { hideFeedbackMessage } from './store/ui/uiFeedbackMessage';

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // REDUX STATES
    const isShowMessage = useSelector(state => state.uiFeedbackMessage.isShow);
    const popupMessage = useSelector(state => state.uiFeedbackMessage.messageContent)
    const isLoading = useSelector(state => state.uiLoading.isShow);

    const closePopupMessage = () => {
        dispatch(hideFeedbackMessage());
    }

    return (
        <>
            {isShowMessage &&
            <div className="popup-message-container">
                <Alert variant="danger" onClose={() => closePopupMessage(false)} dismissible>
                    <p>{popupMessage}</p>
                </Alert>
            </div>
            }

            {isLoading && <Loading />}

            <main>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    
                    <Route path="messages" element={<RequiredAuth><Messages/></RequiredAuth>} />
                    <Route path="select_character" element={<RequiredAuth><SelectCharacter/></RequiredAuth>} />
                    
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </main>
        </>
    );
}

export default App;
