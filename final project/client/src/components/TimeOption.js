
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete,{createFilterOptions} from '@material-ui/lab/Autocomplete';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {fetchIngredient} from "./getData";
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
      width:0,
      height:0
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
      border:'5px solid'
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#D1A080",
      border:'5px solid'
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#D1A080",
      border:'5px solid'
    },
    "& .MuiOutlinedInput-input": {
      color: "white",
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
      fontSize:17
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "#D1A080",
      fontFamily: "Patua One",
      fontSize:17
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "white",
      fontFamily: "Patua One",
      fontSize:17
    },
  },

}));

const filter = createFilterOptions();


const TimeOption = () => {
  const [tags, setTags] = useState([]);
  const classes = useStyles();

  return (
    <Autocomplete
      style={{ 
        color: "white"}}
      options={timeOptions}
      getOptionLabel={option => option.title}
      renderInput={params => (
        <div style={{width:"30%", padding:50, paddingBottom:60, left: "58.4%", top: "50%", position:"absolute", transform: "translate(-50%, -50%)"}}>
          <TextField
            {...params}
            variant="outlined"
            style={{color:"white",fontFamily:"Patua One", borderBottom: 0}}
            label="Cooking Time"
            placeholder="Cooking Time"
            fullWidth
            classes={{root:classes.outlineRoot}}
            multiline
          />
        </div>
      )}
      ListboxProps={{style:{backgroundColor:"#D1A080", color:"white", fontFamily:"Patua One"}}}
      noOptionsText="No Option"
      classes={{noOptions:classes.noOptions, input:classes.input, root:classes.root}}
    />
  );
}
export default TimeOption;
const timeOptions = [
  { title: '< 30min' },
  { title: '30min' },
  { title: '45min' },
  { title: '1h' },
  { title: '1h15min' },
  { title: '1h30min' },
  { title: '1h45min' },
  { title: '2h' },
  { title: '>2h' }
];
