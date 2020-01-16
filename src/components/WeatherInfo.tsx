/* eslint-disable no-unused-vars */
import React from 'react';
import {
  createStyles, Theme, makeStyles,
  Typography,
} from '@material-ui/core';

const WeatherInfoStrs = [
  ['Wind Speed', 'wind_mph', 'mph'],
  ['Wind Direction', 'wind_dir', ''],
  ['Pressure', 'pressure_mb', 'mb'],
  ['Precipitation', 'precip_mm', 'mm'],
  ['Humidity', 'humidity', '%'],
  ['Cloud', 'cloud', '%'],
  ['Feels like', 'feelslike_f', '°F'],
  ['UV Index', 'uv', ''],
  ['Wind gust', 'gust_mph', 'mph'],
]

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',

    '&>div': {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
    },
  },
}));

const WeatherInfo = (props: {[key: string]: any }) => {
  const classes = useStyles();
  const { current } = props;
  return (
    <div className={classes.root}>
      <div>
        { WeatherInfoStrs.map((item) => <Typography variant="body1" key={item[0]}>{item[0]}</Typography>) }
      </div>
      <div>
        { WeatherInfoStrs.map((item) => (
          <Typography variant="body1" key={item[0]}>
            {`${current[item[1]]} ${item[2]}`}
          </Typography>
        ))}
      </div>
    </div>
  )
}

export default WeatherInfo;
