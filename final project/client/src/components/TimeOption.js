
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-unused-vars */
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import "../style/IngredientOption.css";

const useStyles = makeStyles((theme) => ({
  noOptions: {
    background: "#D1A080",
    fontFamily: "Patua One",
    color: "white"
  },
  input: {
    fontFamily: "Patua One",
    color: "white",
  },
  outlineRoot: {
    "& .makeStyles": {
      width: 0,
      height: 0
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FEF2F2",
      border: '5px solid'
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#D1A080",
      border: '5px solid'
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#D1A080",
      border: '5px solid'
    },
    "& .MuiOutlinedInput-input": {
      color: "#FEF2F2",
      // borderBottom: 0
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "#D1A080"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "white"
    },
    "& .MuiInputLabel-outlined": {
      color: "white",
      fontFamily: "Patua One",
      fontSize: 17
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "#D1A080",
      fontFamily: "Patua One",
      fontSize: 17
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "white",
      fontFamily: "Patua One",
      fontSize: 17
    },
  },

}));
const TimeOption = (props) => {
  const [tags, setTags] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    props.onSelectTime(tags);
    console.log('state changed', tags);
  }, [tags]);


  const onTagsChange = async (event, values) => {
    setTags({
      tags: values
    });
    console.log("tags", tags);
  }




  return (
    <Autocomplete
      style={{
        color: "white"
      }}
      options={timeOptions}
      getOptionLabel={option => option.title}
      onChange={onTagsChange}
      renderInput={params => (
        <div style={{ width: "30%", padding: 50, paddingBottom: 60, left: "58.4%", top: "50%", position: "absolute", transform: "translate(-50%, -50%)" }}>
          <TextField
            {...params}
            variant="outlined"
            style={{ color: "white", fontFamily: "Patua One", borderBottom: 0 }}
            label="Cooking Time"
            placeholder="Cooking Time"
            fullWidth
            classes={{ root: classes.outlineRoot }}
            multiline
          />
        </div>
      )}
      ListboxProps={{ style: { backgroundColor: "#D1A080", color: "white", fontFamily: "Patua One" } }}
      noOptionsText="No Option"
      classes={{ noOptions: classes.noOptions, input: classes.input, root: classes.root }}
    />
  );
}
export default TimeOption;
const timeOptions = [
  { title: '0.5 h' },
  { title: '1 h' },
  { title: '1.5 h' },
  { title: '2 h' },
  { title: '2.5 h' },
  { title: '3 h' },
  { title: '3.5 h (or even longer)' }
];
