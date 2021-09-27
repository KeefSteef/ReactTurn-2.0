import React, {useState} from 'react';
import './ProcessCard.sass'

const ProcessCard = ({ data }) => {
    const [process] = useState(data.process);
    const [isFinished] = useState(data.isFinished)

    const setWidthOfStick = () => {
        if(process){
            return '250px'
        }

        else if(isFinished){
            return '430px'
        }

        return '0px'
    }

    return (
        <div className="process_card">
            <div className="process_load-container">
                <div className="load_stick">
                    <span style={{width: setWidthOfStick()}}></span>
                </div>
                <div className="progress_markers">
                    <div className={`waiting_marker marker_ball`}>
                        <p>Waiting</p>
                    </div>
                    <div className={`processing_marker marker_ball ${process || isFinished ? false : 'disabled_marker-ball'}`}>
                        <p>Processing</p>
                    </div>
                    <div className={`finish_marker marker_ball  ${isFinished ? false : 'disabled_marker-ball'}`}>
                        <p>Finished</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcessCard;
