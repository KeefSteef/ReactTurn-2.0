import React from 'react'
import './App.css';
import Layout from './HOC/Layout/Layout'
import Main from "./Containers/Main/Main";
import Backdraw from "./HOC/Backdraw";
import {connect} from "react-redux";
import InfoCard from "./Component/Ui/InfoCard/InfoCard";
import {updateAfterRemove} from './redux/actions/actions'
import Statics from "./Containers/Statics/Statistics";
import LoadCircle from "./Component/Ui/LoadCircle/LoadCircle";
import {AxiosRequest} from "./Services/Axios/axiosRequest";
import ErrorBoundary from "./HOC/ErrorBoundary/ErrorBoundary";
import ProcessCard from "./Component/Ui/ProcessCard/ProcessCard";
import RejectList from "./Component/Ui/RejectList/RejectList";

class App extends React.Component {

    state = {
        shadowToggle: false,
        mainLoad: false,
        nameData: [],
        hasError: false,
        showProcessData: false,
        showInformationByCard: false,
        activeCard: {},
        dataOfProcessingObject: {},
        showRejectList: false

    }

    toggleRejectedList = () => {
        this.setState({
            showRejectList: !this.state.showRejectList
        })
    }

    toggleHandlerCard = (obj) => {
        this.setState ({
            showInformationByCard: true,
            shadowToggle: true,
            activeCard: obj
        })
    }

    switchBackDraw = () => {
        this.setState ({
            shadowToggle: false,
            showProcessData: false,
            showInformationByCard:false,
            showRejectList: false
        })
    }

    removeCard = (obj) => {
        this.props.UpdateAfterRemove(obj);
    }

    getRequestData = async () => {
       try{
           const response = await AxiosRequest.getCharacter('https://mcteaparty.fun/api/keef/anime')
           let flatArr = [response].flatMap(data => {
               return data
           })

           this.setState({
               nameData: flatArr,
               mainLoad:true
           })
       }

       catch {
           this.setState({hasError: true, mainLoad:true})
       }
    }

    componentDidMount() {
        this.getRequestData()
    }

    toggleProcessCard = (obj) => {
        this.setState({
            showProcessData: !this.state.showProcessData,
            shadowToggle: true,
            dataOfProcessingObject: obj
        })
    }


    render() {
        return (
            <div className="App">
                <Layout>
                    {this.state.showRejectList ?
                       <Backdraw onClickHandler={this.switchBackDraw}>
                           <RejectList/>
                       </Backdraw> : null}
                    {this.state.shadowToggle && this.state.showProcessData ? <Backdraw onClickHandler={this.switchBackDraw}> <ProcessCard data={this.state.dataOfProcessingObject} /> </Backdraw> : null}
                    {this.state.shadowToggle && this.state.showInformationByCard ? <Backdraw onClickHandler={this.switchBackDraw}>
                        <InfoCard removeHandler={this.removeCard} data={this.state.activeCard}/>
                    </Backdraw> : null}
                    {this.state.mainLoad ?

                       <ErrorBoundary hasError={this.state.hasError}>
                           <Main toggleProcessCard={this.toggleProcessCard} nameData={this.state.nameData}/>
                       </ErrorBoundary>

                        : <LoadCircle/>
                    }

                    <Statics rejectedListToggle={this.toggleRejectedList} onClickHandler={this.toggleHandlerCard}/>
                </Layout>
            </div>
        );
    }
}


function mapStateToPropsApp(state) {
    return {
        statics: state.statics,
        viewRejectedList: state.rootCardOptions.viewRejectedList
    }
}

function receiveStateFromProps(dispatch) {
    return {
        UpdateAfterRemove: (obj) => dispatch(updateAfterRemove(obj))
    }
}

export default connect(mapStateToPropsApp, receiveStateFromProps)(App);
