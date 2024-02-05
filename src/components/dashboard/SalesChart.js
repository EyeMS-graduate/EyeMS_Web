import React, { useState, useEffect } from "react";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";

const SalesChart = (props) => {
  if(!props){
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 4,
        colors: ['transparent'],
      },
      legend: {
        show: true,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          borderRadius: 2,
        },
      },
      colors: ['#0d6efd', '#009efb', '#6771dc'],
      xaxis: {
        categories: [
          'doorlock',
          'hammering',
          'nback',
          'simon',
          'trafficLight',
          'catchMole',
          'numberPuzzle',
          'depression',
          'anxiety',
          'stress',
        ],
      },
      responsive: [
        {
          breakpoint: 1024,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '60%',
                borderRadius: 7,
              },
            },
          },
        },
      ],
    },
    series: [
      {
        name: '점수',
        data: [],
      },
    ],
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // Update the series data when props.data is defined and not null
    if (props.send && props.send.length > 0) {
      const doorLock = props.send.map(item => item.doorlock);
      const hammering = props.send.map(item => item.hammering);
      const nback = props.send.map(item => item.nback);
      const simon = props.send.map(item => item.simon);
      const trafficLight = props.send.map(item => item.trafficLight);
      const catchMole = props.send.map(item => item.catchMole);
      const numberPuzzle = props.send.map(item => item.numberPuzzle);
      const depression = props.send.map(item => item.depression);
      const anxiety = props.send.map(item => item.anxiety);
      const stress = props.send.map(item => item.stress);

      const updatedSeries = [
        {
          ...chartData.series[0],
          data: [...doorLock, ...hammering, ...nback, ...simon, ...trafficLight, ...catchMole, ...numberPuzzle, ...depression, ...anxiety, ...stress], // Replace 'yourValueProperty' with the actual property name in your data
        },
      ];

      setChartData(prevData => ({
        ...prevData,
        series: updatedSeries,
      }));
    }
  }, [props.send]); // Include props in the dependency array
  return (
      <Card>
        <CardBody>
          <CardTitle tag="h5">이행률</CardTitle>
          <CardSubtitle className="text-muted" tag="h6">
            일별 이행률 그래프
          </CardSubtitle>
          <Chart
              options={chartData.options} // Use chartData.options
              series={chartData.series} // Use chartData.series
              type="bar"
              height="379"
          />
        </CardBody>
      </Card>
  );
};

export default SalesChart;