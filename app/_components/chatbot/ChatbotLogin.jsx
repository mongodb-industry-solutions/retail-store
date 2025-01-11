import React from 'react'
import { useDispatch } from 'react-redux';

import { setAllowChatbot } from '@/redux/slices/ChatbotSlice';

const ChatbotLogin = () => {
    const dispatch = useDispatch();

    const loginToChatbot = () => {
        const password = document.getElementById('chatbotInput').value
        if (password === process.env.NEXT_PUBLIC_CHATBOT_PASSWORD)
            dispatch(setAllowChatbot(true))
        else
            alert('wrong password')
    }
    const onKeyDownInput = (e) => {
        if(e.key === 'Enter')
            loginToChatbot()
    }
    return (
        <div>
            <p>If you are looking to showcase this demo to a client please contact prashant.juttukonda@mongodb.com or angie.guemes@mongodb.com to get the password.</p>
            <input type='password' id='chatbotInput' onKeyDown={(e) => onKeyDownInput(e)}></input>
            <button type='' onClick={() => loginToChatbot()}>Submit</button>
        </div>
    )
}

export default ChatbotLogin