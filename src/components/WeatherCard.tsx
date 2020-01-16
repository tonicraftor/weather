/* eslint-disable no-unused-vars */
import React from 'react';
import {
  createStyles, Theme, makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  temp: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  disabled: {
    color: '#aaaaaa',
  },
}));

const WeatherCard = (props: {[key: string]: any }) => {
  const classes = useStyles();
  const {
    location, current,
  } = props;
  const localtime = new Date(location.localtime_epoch * 1000);
  const timestr = localtime.toLocaleTimeString('en-US',
    { timeZone: location.tz_id, timeZoneName: 'short' })
  const datestr = localtime.toLocaleDateString('en-US',
    {
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
    })
  return (
    <div className={classes.root}>
      <div className={classes.temp}>
        <img src={`http:${current.condition.icon}`} alt={`${current.condition.text}`} />
        <Typography variant="h2">
          {current.temp_f}
        </Typography>
        <Typography variant="h5">
          <div>°F</div>
          <div className={classes.disabled}>°C</div>
        </Typography>
      </div>
      <Typography variant="body1">
        {timestr}
      </Typography>
      <Typography variant="body1">
        {datestr}
      </Typography>
    </div>
  )
}

export default WeatherCard;
