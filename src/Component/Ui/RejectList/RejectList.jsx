import React from 'react';
import {connect} from "react-redux";
import './RejectList.sass'

const RejectList = props  => {


    const filterByRejected = arr => {
        let newArr = [...arr];
        let lisOfReject = ['Sick','Dead','Forgive']
        newArr.forEach(el => {
            let rand = Math.floor(Math.random() * lisOfReject.length);
            el.reasonReject = lisOfReject[rand]
        });
        return newArr.filter(el => el.result !== 'Good')
    }


    return (
        <div>
            <div className="reject_container">
                <ul className="reject_list">
                    {filterByRejected(props.statics).map(obj => {
                        return  <li key={Math.random()}>
                            <div>
                                <i className="far fa-user reject"/>
                                <h2>{obj.id}</h2>
                                <h2>{obj.name}</h2>
                                <h2>{obj.reasonReject}</h2>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    );
};


function mapStateToProps(state){
    return {
        statics: state.rootCardOptions.statics
    }
}

export default connect(mapStateToProps)(RejectList);
