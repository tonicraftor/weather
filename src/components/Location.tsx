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
}));

const Location = (props: {[key: string]: any}) => {
  const classes = useStyles();
  const { location } = props;
  const {
    name, region, country, lat, lon,
  } = location;
  return (
    <div className={classes.root}>
      <Typography variant="h2">
        {name}
      </Typography>
      <Typography variant="subtitle1">
        {`${region}, ${country}`}
      </Typography>
      <Typography variant="body2">
        {`Lagitude: ${lat}, Longitude: ${lon}`}
      </Typography>
    </div>
  )
}

export default Location;
