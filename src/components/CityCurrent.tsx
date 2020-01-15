/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createStyles, Theme, makeStyles,
  Container, Typography,
} from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import { IState } from '../store';
import { requestCurrent, DefaultCity } from '../dataRequest/weatherRequest';
import { actions } from '../store/reducer'

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    position: 'relative',
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: blueGrey[50],
    marginTop: theme.spacing(5),
    padding: theme.spacing(5),
  },
  location: {
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weather: {
    width: '40%',
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
  info: {
    flexGrow: 1,
    display: 'flex',

    '&>div': {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
    },
  },
}));

const CurrentInfoStrs = [
  ['Wind Speed', 'wind_mph', 'mph'],
  ['Wind Direction', 'wind_dir', ''],
  ['Pressure', 'pressure_mb', 'mb'],
  ['Precipitation', 'precip_mm', 'mm'],
  ['Humidity', 'humidity', '%'],
  ['Cloud', 'cloud', '%'],
  ['Feels like', 'feelslike_f', 'F'],
  ['UV Index', 'uv', ''],
  ['Wind gust', 'gust_mph', 'mph'],
]


const CityCurrent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const current = useSelector((state: IState) => state.cityCurrent);

  let currentInfo = <></>;
  if (current) {
    const localtime = new Date(current.location.localtime_epoch * 1000);
    const timestr = localtime.toLocaleTimeString('en-US',
      { timeZone: current.location.tz_id, timeZoneName: 'short' })
    const datestr = localtime.toLocaleDateString('en-US',
      {
        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
      })
    currentInfo = (
      <Container maxWidth="md" className={classes.root}>
        <div className={classes.location}>
          <Typography variant="h2">
            {current.location.name}
          </Typography>
          <Typography variant="subtitle1">
            {`${current.location.region}, ${current.location.country}`}
          </Typography>
          <Typography variant="body2">
            {`Lagitude: ${current.location.lat}, Longitude: ${current.location.lon}`}
          </Typography>
        </div>
        <div className={classes.weather}>
          <div className={classes.temp}>
            <img src={`http:${current.current.condition.icon}`} alt={`${current.current.condition.text}`} />
            <Typography variant="h2">
              {current.current.temp_f}
            </Typography>
            <Typography variant="h5">
              <div>F</div>
              <div className={classes.disabled}>C</div>
            </Typography>
          </div>
          <Typography variant="body1">
            {timestr}
          </Typography>
          <Typography variant="body1">
            {datestr}
          </Typography>
        </div>
        <div className={classes.info}>
          <div>
            { CurrentInfoStrs.map((item) => <Typography variant="body1">{item[0]}</Typography>) }
          </div>
          <div>
            { CurrentInfoStrs.map((item) => (
              <Typography variant="body1">
                {`${current.current[item[1]]} ${item[2]}`}
              </Typography>
            ))}
          </div>
        </div>
      </Container>
    )
  } else {
    requestCurrent(DefaultCity).then((res) => {
      /* if (res.status !== 200) {

      } */
      dispatch(actions.setCurrent(res.data));
    })
  }

  return currentInfo;
}

export default CityCurrent;
