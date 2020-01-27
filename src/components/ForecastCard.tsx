/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  createStyles, Theme, makeStyles,
} from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { IState } from '../store';
import { requestForecast, requestHistory } from '../dataRequest/weatherRequest';
import { actions } from '../store/reducer';
import { Forecast } from '../dataRequest/dataTypes';

Chart.plugins.unregister(ChartDataLabels);

let theChart: Chart | null = null;

function LoadChart(
  ctx: CanvasRenderingContext2D,
  labels: string[],
  maxTemps: number[],
  minTemps: number[],
  patterns: (CanvasPattern | null)[],
) {
  const maxTick = Math.ceil(Math.max(...maxTemps) / 10) * 10 + 20;
  if (theChart) {
    const { data, options } = theChart;
    if (data && data.datasets) {
      data.datasets[0].data = maxTemps;
      const { datalabels } = data.datasets[0];
      if (datalabels) {
        datalabels.backgroundColor = patterns;
      }
      data.datasets[1].data = minTemps;
    }
    if (options && options.scales && options.scales.yAxes && options.scales.yAxes[0].ticks) {
      options.scales.yAxes[0].ticks.suggestedMax = maxTick;
    }
    theChart.update();
    return;
  }
  theChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Max Temperature, °F',
        data: maxTemps,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        datalabels: {
          // color: '#36A2EB',
          font: {
            size: 90,
          },
          anchor: 'end',
          align: 'end',
          offset: 0,
          padding: {
            right: 60,
          },
          formatter: () => ' ',
          // formatter: (value, context) => conditions[context.dataIndex],
          backgroundColor: patterns,
        },
      },
      {
        label: 'Min Temperature, °F',
        data: minTemps,
        backgroundColor: 'rgba(132, 99, 255, 0.2)',
        borderColor: 'rgba(132, 99, 255, 1)',
        borderWidth: 1,
        datalabels: {
          display: false,
        },
      },
      ],
    },
    plugins: [ChartDataLabels],
    options: {
      scales: {
        yAxes: [{
          ticks: {
            suggestedMax: maxTick,
          },
        }],
      },
      legend: {
        align: 'start',
        labels: {
          fontSize: 16,
        },
      },
      title: {
        display: true,
        fontSize: 24,
        text: 'Forecast',
      },
    },
  });
  theChart.height = 300;
  theChart.aspectRatio = 0;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    height: 300,
    position: 'relative',
    marginTop: 10,
  },
}));

const ForecastCard = (props: {[key: string]: any }) => {
  const classes = useStyles();
  const [forecastData, setForecastData] = useState<Forecast | null>(null);
  const dispatch = useDispatch();
  const { location, days } = props;
  let content = <></>;
  let canvas: HTMLCanvasElement | null = null;
  if (forecastData !== null) {
    content = (
      <div className={classes.root}>
        <canvas ref={(c) => { canvas = c }} height="100%" />
      </div>
    );
  }

  useEffect(() => {
    requestForecast(location.name, days).then((res) => {
      if (res.status === 200) {
        setForecastData(res.data);
      } else {
        // error
        dispatch(actions.setError(res.status));
      }
    });
  }, [location]);

  useEffect(() => {
    if (canvas && forecastData) {
      // console.log('forecastData:', forecastData);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const forcasts = forecastData.forecast.forecastday;
        const labels = forcasts.map((item) => item.date);
        const maxt = forcasts.map((item) => item.day.maxtemp_f);
        const mint = forcasts.map((item) => item.day.mintemp_f);
        const patterns: (CanvasPattern | null)[] = forcasts.map(() => null);
        forcasts.forEach((item, index) => {
          const image = new Image();
          image.src = `http:${item.day.condition.icon}`;
          image.onload = () => {
            patterns[index] = ctx.createPattern(image, 'no-repeat');
            if (!patterns.includes(null)) {
              LoadChart(ctx, labels, maxt, mint, patterns);
            }
          }
        })
      }
    }
  }, [canvas, forecastData]);

  return content;
}

export default ForecastCard;
