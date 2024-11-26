import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';

const Typewriter = ({ text, completedCallback = null }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (!completed && text) {
            let index = 0;

            const typing = setInterval(() => {
                if (index < text.length) {
                    setDisplayedText((prev) => prev + text.charAt(index));
                    index++;
                } else {
                    clearInterval(typing);
                    setCompleted(true); // Mark typing as completed
                }
            }, 30); // Adjust typing speed

            return () => clearInterval(typing); // Cleanup on unmount
        } else {
            setDisplayedText(text); // Ensure the full text is displayed after typing
        }
        if(completed && completedCallback !== null){
            completedCallback()
        }
    }, [text, completed]);

    return <ReactMarkdown>{displayedText}</ReactMarkdown>;
};

export default Typewriter;
