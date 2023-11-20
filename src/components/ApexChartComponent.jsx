import ReactApexChart from 'react-apexcharts';
import React from 'react';

export default class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: props.datas,
      options: {
        labels: props.labels,
        chart: {
          type: 'polarArea',
        },
        stroke: {
          colors: ['#fff'],
        },
        fill: {
          opacity: 0.8,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.datas !== this.props.datas || prevProps.labels !== this.props.labels) {
      this.setState({
        series: this.props.datas,
        options: {
          ...this.state.options,
          labels: this.props.labels,
        },
      });
    }
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="polarArea" />
      </div>
    );
  }
}
