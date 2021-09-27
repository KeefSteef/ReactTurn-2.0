import React from 'react';
import './Priority.sass'
import {connect} from "react-redux";

const Priority = props => {
    return (
        <div className="Priority">
            <section className="Priority_block">
                <ul className="Priority_menu">
                    {props.limitStatics.map(el => <li
                        onClick={props.onClickHandler.bind(this, el)}
                        key={el.name + Math.random()}>{el.name}
                    </li>)}
                </ul>
            </section>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        statics: state.rootCardOptions.statics,
        limitStatics: state.rootCardOptions.limitStatics
    }
}


export default connect(mapStateToProps)(Priority);
