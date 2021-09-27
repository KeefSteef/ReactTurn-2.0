import React, {Component} from 'react';
import Card from '../../Component/Ui/Card/Card';
import './Main.sass'
import {connect} from "react-redux";
import {generateCardInfo} from '../../redux/generateCard';
import {doPauseCard, pushNewObject} from "../../redux/actions/actions";

class Main extends Component {
    state = {
        persons: [
            {
                name: this.props.nameData[0],
                time: 5000,
                point: 'Passport Review',
                id: 1,
            },
            {
                name: this.props.nameData[1],
                time: 5000,
                point: 'INN Create',
                id: 2,
            },
            {
                name: this.props.nameData[2],
                time: 10000,
                point: 'Practice',
                id: 3,
            },

        ],

        viewLastCard: false,
        canAddObj: true,
        lastCardObj: {},
        isPause: false,
    }



    renderCard = (arr) => {
        let timeCheck = []
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        return arr.map((el, index) => {
            timeCheck.push(el.time);
            return <Card
                time={el.time} key={el.id + el.name}
                timeToStart={el.id > 3 ? el.startTime + 1000 : timeCheck.reduce(reducer) - el.time}
                id={el.id}
                name={el.name} point={el.point}
                toggleProcessCard={this.props.toggleProcessCard}
                isPause={this.state.isPause}
            />
        })
    }


    toggleViewLast = () => {
        this.setState({
            viewLastCard: !this.state.viewLastCard,
            isPause: !this.state.isPause
        })

        return this.props.DoPause(!this.state.viewLastCard);
    }


    createCard = (obj) => {
        if (obj) {
            let persons = [...this.state.persons]
            persons.push(obj);
            this.setState({
                persons
            })
        }
    }


    addNewPerson = (timeToStart) => {
        const persons = [...this.state.persons];
        let newPerson = generateCardInfo(this.props.nameData, timeToStart)
        newPerson.id = persons.length + 1
        persons.push(newPerson)
        this.setState({
            persons
        })
    }


    addToLastCardObj = () => {
        this.setState({
            lastCardObj: this.props.objectLastCard
        })

    }


    componentDidUpdate(){
        if(this.props.isAddToState){
            this.props.CanPush(false)
            this.setState({
                canAddObj: true
            })
        }

        if(this.props.objectLastCard && this.state.canAddObj){
            this.addNewPerson(this.state.persons[this.state.persons.length - 1].time + this.state.persons[this.state.persons.length - 2].time)
            this.addToLastCardObj()
            this.setState({
                canAddObj: false
            })
        }
    }


    render() {
        return (
            <div className="Header">
                <div className={"Nav"}>
                    <div className="view_last-card">
                        {this.props.statics.length >= 1 ?  <button onClick={this.toggleViewLast}>L</button> : null}
                    </div>
                    {this.state.viewLastCard ?  <Card
                        id={this.state.lastCardObj.id}
                        name={this.state.lastCardObj.name} point={this.state.lastCardObj.point}
                        toggleProcessCard={this.props.toggleProcessCard}
                        isLast={true}
                        isPause={this.state.isPause}
                    /> : null}
                    {
                        this.renderCard(this.state.persons)
                    }
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        statics: state.rootCardOptions.statics,
        objectLastCard: state.rootCardOptions.lastCard,
        isAddToState: state.rootCardOptions.isAddToState,
        timeToStartForNewCards: state.rootCardOptions.newCardTimeToStart
    }
}

function receiveStateFromProps(dispatch){
    return {
        CanPush: toggle => dispatch(pushNewObject(toggle)),
        DoPause: marker => dispatch(doPauseCard(marker))
    }
}

export default connect(mapStateToProps,receiveStateFromProps)(Main);