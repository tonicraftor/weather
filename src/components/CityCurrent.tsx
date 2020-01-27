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
import ForecastCard from './ForecastCard';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    position: 'relative',
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: blueGrey[50],
    marginTop: theme.spacing(1),
  },
  firstBlock: {
    marginTop: theme.spacing(5),
  },
  currentBlock: {
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
  forecastBLock: {
    padding: theme.spacing(2),
  },
}));

const CityCurrent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const current = useSelector((state: IState) => state.cityCurrent);

  let currentInfo = <></>;
  if (current) {
    // console.log(current);
    const localtime = new Date(current.location.localtime_epoch * 1000);
    currentInfo = (
      <>
        <Container maxWidth="md" className={`${classes.root} ${classes.firstBlock} ${classes.currentBlock}`}>
          <Location location={current.location} />
          <WeatherCard location={current.location} current={current.current} />
          <WeatherInfo current={current.current} />
        </Container>
        <Container maxWidth="md" className={`${classes.root} ${classes.forecastBLock}`}>
          <ForecastCard location={current.location} days={7} />
        </Container>
      </>
    )
  } else {
    requestCurrent(DefaultCity).then((res) => {
      if (res.status === 200) {
        dispatch(actions.setCurrent(res.data));
      } else {
        // error
        dispatch(actions.setError(res.status));
      }
    })
  }

  return currentInfo;
}

export default CityCurrent;
