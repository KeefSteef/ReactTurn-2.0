import React, {useEffect, useState, useRef} from 'react';
import './Card.sass'
import gsap from 'gsap'
import {addToAnalytics, pushLastCard, pushNewObject, timerToStartNewCard} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import useCountDown from 'react-countdown-hook';

const Card = props => {
    const [isFinished, setFinished] = useState(false);
    const [timeToDie, action] = useCountDown(props.timeToStart + props.time, 1000);
    const [currentDateTime] = useState(Date.now() + props.timeToStart + props.time)
    const mainTimerToFade = useRef(null)
    const dateTimeAfterPause = useRef(null)
    const [isAddToStore, setAddToStore] = useState(true)


    const prevTime = () => {
        if (props.id === 1) {
            return new Date(Date.now()).toLocaleTimeString();
        } else {
            return new Date(Date.now() + props.timeToStart - props.time).toLocaleTimeString();
        }
    }


    const nextTime = () => {
        if (props.id === 1) {
            return new Date(Date.now() + props.timeToStart + props.time).toLocaleTimeString();
        } else {
            return new Date(Date.now() + props.timeToStart).toLocaleTimeString();
        }
    }


    const [dateNow] = useState(prevTime)
    const [dateLater] = useState(nextTime)
    const iniialTimerToDestroy = (timeResume) => {
        if(isAddToStore) {
            return mainTimerToFade.current = setTimeout(() => {
                const tl = gsap.timeline({
                    onComplete: () => {
                        props.addToStore(newObj)
                        setFinished(true)
                        props.CanPush(true)
                        props.PushCardAfterFinish(newObj)
                    }
                })
                tl.to(`.card${props.id}`, .5, {y: -20, opacity: 0})
                return setAddToStore(false)
            }, timeResume || props.timeToStart + props.time)
        }
    }

    useEffect(() => {
        if(props.isLast === undefined) {
            action.start()
            iniialTimerToDestroy()
        }
    }, [])



    useEffect(() => {
        if(props.doPause){
            window.clearTimeout(mainTimerToFade.current)
            dateTimeAfterPause.current = currentDateTime - Date.now() + 500
            action.pause()
        }


        if (!props.doPause && props.doPause !== undefined && dateTimeAfterPause.current !== null){
            action.resume()
            iniialTimerToDestroy(timeToDie)
        }
    },[props.doPause])


    let newObj = {
        isFinished: props.isLast ? true : isFinished,
        process: timeToDie < props.time,
        time: props.time,
        id: props.id,
        name: props.name,
        point: props.point,
        timeToStart: props.timeToStart ? props.timeToStart : props.time,
        result: Math.floor(Math.random() * 10) >= 4 ? 'Good' : 'Bad',
    }


    const secToMin = (seconds) => {
        if (seconds / 1000 >= 3600) {
            return Math.floor((seconds / 1000) / 3600) + 'h'
        }

        if (seconds / 1000 >= 60) {
            return Math.floor(seconds / 1000 / 60) + 'm'
        }

        else {
            return seconds / 1000 + 's'
        }
    }


    return (
    isFinished === true ? false :
            <div className={`card${props.id} card`} onClick={() => props.toggleProcessCard(newObj)}>
                <div className="card_header">
                    <div className="card_options">
                        <div className="card_offer">
                            <h1 className="card_offer-title">{props.point}</h1>
                        </div>
                        <div className="card_time">
                            {/*<h1>{timeToDie/1000}</h1>*/}
                            <h1>{timeToDie > props.time ? 'Waiting...' : secToMin(timeToDie)}</h1>
                            <h1>{`${dateNow} - ${dateLater}`}</h1>
                        </div>
                    </div>
                    <div className="card_number">
                        <p>{'№ ' + props.id}</p>
                    </div>
                </div>
                <div className="card_main">
                    <div className="card_main-info">
                        <div className="card_main-info-img">
                            <i className="far fa-user"></i>
                            <div className="card_main_titles">
                                <h1>{props.name}</h1>
                            </div>
                        </div>
                        <div className="card-main-status">
                            <h1>{timeToDie < props.time  ? <div>
                                <h3 style={{
                                    color: 'forestgreen',
                                    fontSize: '18px',
                                    fontWeight: 'lighter'
                                }}>Processing</h3>
                            </div> : null}</h1>
                        </div>
                    </div>
                </div>
            </div>
    );
};

function mapStateToProps(state) {
    return {
        statics: state.rootCardOptions.statics,
        doPause: state.rootCardOptions.doPauseCard
    }
}

function mapDispatchToProps(dispatch) {
    return {
        TimeToStartForNewCard: val => dispatch(timerToStartNewCard(val)),
        addToStore: obj => dispatch(addToAnalytics(obj)),
        CanPush: toggle => dispatch(pushNewObject(toggle)),
        PushCardAfterFinish: obj => dispatch(pushLastCard(obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
