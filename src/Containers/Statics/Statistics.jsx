import React from 'react';
import './Statics.sass'
import ReactApexChart from 'react-apexcharts'
import Priority from "../../Component/Priority/Priority";
import {connect} from "react-redux";
import {settingsGenerateLine} from "./settings";
import {showRejectedList} from "../../redux/actions/actions";

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [20, 50, 100],
            options: {
                chart: {
                    height: 100,
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        offsetY: 20,
                        startAngle: 1,
                        endAngle: 250,
                        hollow: {
                            margin: 20,
                            size: '30%',
                            background: 'forestgreen',
                            image: undefined,
                        },
                        dataLabels: {
                            name: {
                                show: true,
                            },
                            value: {
                                show: false,
                            }
                        }
                    }
                },
                colors: ['#39539E', '#0077B5', '#000'],
                labels: ['Total', 'Resolve', 'Rejected'],
                legend: {
                    show: true,
                    floating: true,
                    fontSize: '17px',
                    position: 'left',
                    offsetX: 100,
                    offsetY: 15,
                    labels: {
                        useSeriesColors: false,
                    },
                    markers: {
                        size: 0
                    },
                    formatter: function (seriesName, opts) {
                        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                    },
                    itemMargin: {
                        vertical: 2
                    }
                },
            },
        }

    };


    viewRejList = () => {
        console.log(this.props.rejectList)
    }

    checkOnParam = (arr,set,point) => {
        if (arr) {
            let fil = arr.filter(el => el[`${point}`] === set)
            return fil.length
        }
    }
    setDataToGraphs = (arr,set,point) => {
        if(arr){
            let fil = arr.filter(el => el[`${point}`] === set)
            return fil.length >= 1 ? fil : false
        }
    }

    convertToSeries = (arr) => {
        if(arr){
            let total = arr.length
            let good = this.checkOnParam(arr,'Good','result');
            let bad = this.checkOnParam(arr,'Bad','result');
            // arr.length > 0 ? [arr.length,  this.checkOnParam(arr,this.checkOnParam(arr,'Good','result'))] : [0,0,0]
            return [total, good, bad]
        }

        else {
            return [0,0,0]
        }
    }


        render() {
            let practiceData = this.convertToSeries(this.setDataToGraphs(this.props.statics, 'Practice', 'point'))
            let passData = this.convertToSeries(this.setDataToGraphs(this.props.statics, 'Passport Review', 'point'))
            let innData = this.convertToSeries(this.setDataToGraphs(this.props.statics, 'INN Create', 'point'))

            return (
            <section className="statics">
                <section className="statics_nav">
                    <div className="statics_nav_block">
                        <ul className="statics_menu">
                            <li><i className="far fa-user total"/> <h2>{this.props.statics.length > 0 ?this.props.statics.length : '0' }</h2></li>
                            <li><i className="far fa-user resolve"/> <h2>{this.checkOnParam(this.props.statics,'Good','result')}</h2></li>
                            <li onClick={this.props.rejectedListToggle}><i className="far fa-user reject"/> <h2>{this.checkOnParam(this.props.statics,'Bad','result')}</h2></li>
                        </ul>
                    </div>
                <section className="statics_params">
                    <Priority onClickHandler={this.props.onClickHandler}/>
                    <div className="graph">
                        <div className="block_graph">
                             <ReactApexChart options={this.state.options} series={practiceData} type="radialBar" height={390} />
                            <h1>Practice</h1>
                        </div>
                        <div className="block_graph">
                            <ReactApexChart options={this.state.options} series={passData} type="radialBar" height={390} />
                            <h1>Passport Review</h1>
                        </div>
                        <div className="block_graph">
                            <ReactApexChart options={this.state.options} series={innData} type="radialBar" height={390} />
                            <h1>INN Create</h1>
                        </div>
                    </div>
                </section>
                    <div id="chart" className="line">
                        <ReactApexChart options={settingsGenerateLine().options} series={
                            settingsGenerateLine(this.props.statics).series
                        } type="area" height={400}/>
                    </div>
                </section>
            </section>
        );
    };


}
function mapStateToProps(state){
    return {
        statics: state.rootCardOptions.statics,
        rejectList: state.rootCardOptions.viewRejectedList
    }
}

function mapDispatchToProps(dispatch){
    return {
        toggleRejectedList: (toggle) => dispatch(showRejectedList(toggle))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Statistics);
