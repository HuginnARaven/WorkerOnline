import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Title,
    Legend,
    ZoomAndPan,
} from '@devexpress/dx-react-chart-material-ui';

import { scaleBand } from '@devexpress/dx-chart-core';
import {ArgumentScale, Stack} from '@devexpress/dx-react-chart';

const titleStyle = { margin: 'auto' };
const TitleText = props => <Title.Text {...props} style={titleStyle} />;

export default class WorkerChart extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: props.worker_statistics_by_days,
        };
    }

    render() {
        const { data: chartData } = this.state;

        return (
            <Paper>
                <Chart
                    data={chartData}
                >
                    <ArgumentScale factory={scaleBand} />
                    <ArgumentAxis />
                    <ValueAxis />

                    <BarSeries
                        valueField="td"
                        argumentField="day"
                        name="Task done"
                    />
                    <BarSeries
                        valueField="ta"
                        argumentField="day"
                        name="Task appointed"
                    />
                    <BarSeries
                        valueField="oc"
                        argumentField="day"
                        name="Out of working place"
                    />
                    <ZoomAndPan />
                    <Stack />
                    <Title text="Worker statistics" textComponent={TitleText} />
                    <Legend />
                </Chart>
            </Paper>
        );
    }
}