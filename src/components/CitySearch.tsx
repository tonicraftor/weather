/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  InputBase, List, ListItem, ListItemText,
  createStyles, fade, Theme, makeStyles,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Location } from '../dataRequest/dataTypes';
import { requestCityList, requestCurrent } from '../dataRequest/weatherRequest';
import { actions } from '../store/reducer'

const useStyles = makeStyles((theme: Theme) => createStyles({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  cityList: {
    position: 'absolute',
    top: 40,
    left: 0,
    width: '100%',
    maxHeight: 200,
    overflow: 'auto',
    backgroundColor: '#fff',
    border: '1px solid #262626',
    padding: 0,
  },
  cityListItem: {
    width: '100%',
    color: '#000',
    padding: '0 10',
  },
}));

const CitySearch = () => {
  const classes = useStyles();
  const [input, setInput] = useState();
  const [list, setList] = useState<Location[]>([]);
  const dispatch = useDispatch();

  const resetList = (val: string | null) => {
    if (val === null || val.trim() === '') {
      setList([])
    } else {
      requestCityList(val.toLowerCase()).then((res) => {
        // console.log(res.data)
        if (res.data.length === 0) setList([])
        else setList(res.data)
      })
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setInput(val)
    resetList(val)
  }

  const selectCity = (name: string) => {
    requestCurrent(name).then((res) => {
      console.log(res)
      /* if (res.status !== 200) {

      } */
      dispatch(actions.setCurrent(res.data));
    })
    setList([])
  }

  let cityList = <></>;
  if (list.length > 0) {
    const cities = list.map((item) => (
      <ListItem
        onClick={() => selectCity(item.name)}
        id={`${item.id}`}
        className={classes.cityListItem}
        key={item.id}
        button
      >
        <ListItemText primary={item.name} />
      </ListItem>
    ))
    cityList = (
      <List component="nav" aria-label="city list" className={classes.cityList}>
        { cities }
      </List>
    )
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search a city…"
        onChange={onChange}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
      { cityList }
    </div>
  );
}

export default CitySearch
