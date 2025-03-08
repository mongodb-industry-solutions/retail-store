import { useState } from "react";
import InfoWizard from '../InfoWizard/InfoWizard'

const TalkTrackContainer = (props) => {
    const {sections, openModalIsButton =true} = props
    const [openHelpModal, setOpenHelpModal] = useState(false);

    return (
        <div className='w-100 d-flex flex-row-reverse pt-5'>
            <InfoWizard
                open={openHelpModal}
                setOpen={setOpenHelpModal}
                tooltipText="Talk track!"
                iconGlyph="Wizard"
                sections={sections}
                openModalIsButton={openModalIsButton}
            />
        </div>
    )
}

export default TalkTrackContainer