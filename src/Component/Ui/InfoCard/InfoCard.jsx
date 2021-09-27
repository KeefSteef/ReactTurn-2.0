import React, {useState} from 'react';
import './InfoCard.sass';
import {connect} from "react-redux";
import {redrawFunction} from "../../../redux/actions/actions";

const InfoCard = props => {
    const [validResult, setValidResult] = useState(true);
    const changeOfResult = (obj, msg) => {
        let temp = [...props.statics];
        let index = temp.findIndex(el => el.id === obj.id);
        temp[index].result = msg;
        props.RedrawState(temp);
        setValidResult(!validResult);
    }

    const redrawResult = () => {
        let user = props.statics.filter(person => person.id === props.data.id)
        return <h1 style={{color: user[0].result === 'Good' ? 'forestgreen' : 'red'}}>{user[0].result}</h1>
    }

    return (
        <div className="info_card">
            <h1>{`id: ${props.data.id} ${props.data.name}`}</h1>
            <div className="info_card_title">
                {redrawResult()}
            </div>
            <div className="info_card-btn">
                <button onClick={() => changeOfResult(props.data, "Good")}>Good</button>
                <button onClick={() => changeOfResult(props.data, "Bad")}>Bad</button>
                <button style={{background: '#000', color: '#ffff'}}
                        onClick={() => props.removeHandler(props.data)}
                >Delete
                </button>

            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        statics: state.rootCardOptions.statics
    }
}

function mapReceiveToProps(dispatch) {
    return {
        RedrawState: obj => dispatch(redrawFunction(obj))
    }
}

export default connect(mapStateToProps, mapReceiveToProps)(InfoCard);
