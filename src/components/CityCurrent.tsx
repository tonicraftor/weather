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
import { actions } from '../store/reducer';
import Location from './Location';
import WeatherCard from './WeatherCard';
import WeatherInfo from './WeatherInfo';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    position: 'relative',
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: blueGrey[50],
    marginTop: theme.spacing(5),
    padding: theme.spacing(5),

    '&>:first-child': {
      width: '30%',
    },
    '&>:nth-child(2)': {
      width: '40%',
    },
    '&>:last-child': {
      flexGrow: 1,
    },
  },
}));

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
        <Location location={current.location} />
        <WeatherCard location={current.location} current={current.current} />
        <WeatherInfo current={current.current} />
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
