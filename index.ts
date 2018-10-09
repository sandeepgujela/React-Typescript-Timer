import React, { Component } from 'react'
// import { duration } from 'moment';
import moment from 'moment'
interface Props {
startDate: any,
endDate: any
}

interface State {
    days: any,
    hours: any,
    minutes: any,
    seconds: any
}

export class CountdownTimerComponent extends Component<Props, State> {
    static defaultProps: Partial<Props> = {
    }
    timer

    constructor(props: Props, state: State) {
        super(props, state)
        this.state = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    }

    componentWillMount() {
        const that = this
        const startDate = moment(this.props.endDate)
        const endDate = moment(this.props.startDate)
        let duration = Math.abs(endDate.diff(startDate))
        this.timer = setInterval(function() {
            duration = duration - 1000
            that.diff(duration)
        }, 1000)

    }
    componentWillUnmount() {
        this.setState ( {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        })
    }

    diff(diff) {
        if (diff < 1000) {
            clearInterval(this.timer)
        } else {
            let seconds = Math.floor(diff / 1000)
            let minutes = Math.floor(seconds / 60)
            let hours = Math.floor(minutes / 60)
            const days = Math.floor(hours / 24)
            seconds = seconds % 60
            minutes = minutes % 60
            hours = hours % 24
            this.setState({
                days: days,
                hours: hours,
                minutes : minutes,
                seconds: seconds
            })

        }
    }
    render() {
        return <span> { this.state.days > 0 ? `${this.state.days} Days ` : null }
                      {this.state.hours} Hrs {this.state.minutes} Mins 
                      { this.state.days === 0 &&
                        this.state.hours === 0 &&
                        this.state.minutes === 0 ? ` ${this.state.seconds} secs` : null}

               </span>
    }
}