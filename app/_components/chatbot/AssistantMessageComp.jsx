import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Typewriter from "../typewriter/Typewriter";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Button from "@leafygreen-ui/button";
import { setAnimationMessage } from "@/redux/slices/ChatbotSlice";
import JsonDisplay from "../jsonDisplayComp/JsonDisplayComp";
import Icon from "@leafygreen-ui/icon";

const AssistantMessageComp = ({ index, content, resJson, isAnimationDone, stylesPopoverJson, stylesResponseDetailsContainer }) => {
    const dispatch = useDispatch();

    const disableAnimationOnThisMessage = () => {
        if(isAnimationDone === false){
            // setAnimationMessage = true
            dispatch(setAnimationMessage({index: index + 1, isAnimationDone: true}))
        }
    }

    return <div>
        {
            isAnimationDone
            ? content
            : <Typewriter text={content} completedCallback={disableAnimationOnThisMessage} />
        }
        <div className={stylesResponseDetailsContainer}>
            <OverlayTrigger
                trigger="click"
                placement={'top'}
                overlay={
                    <Popover
                        className={stylesPopoverJson}
                    >
                        <Popover.Header as="h3">Response details</Popover.Header>
                        <Popover.Body>
                            <JsonDisplay data={resJson} />
                        </Popover.Body>
                    </Popover>
                }
            >
                <Button size='xsmall'><Icon glyph='Sparkle'></Icon></Button>
            </OverlayTrigger>
        </div>
    </div>;
};

export default AssistantMessageComp;
