
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete,{createFilterOptions} from '@material-ui/lab/Autocomplete';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import {fetchIngredient} from "./getData";
import "../style/IngredientOption.css";

const useStyles = makeStyles((theme) => ({
  noOptions: {
    background: "#B6666F",
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
      borderColor: "#FEF2F2",
      border:'5px solid'
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#B6666F",
      border:'5px solid'
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#B6666F",
      border:'5px solid'
    },
    "& .MuiOutlinedInput-input": {
      color: "white",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "#B6666F"
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
      color: "#B6666F",
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

const DifficultyOption = (props) => {
  const [tags, setTags] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    props.onSelectDifficulty(tags);
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
        color: "white"}}
      options={difficulties}
      getOptionLabel={option => option.title}
      onChange={onTagsChange}
      renderInput={params => (
        <div style={{width:"30%", padding:50, paddingBottom:60, left: "58.4%", top: "50%", position:"absolute", transform: "translate(-50%, -50%)"}}>
          <TextField
            {...params}
            variant="outlined"
            style={{color:"white",fontFamily:"Patua One", borderBottom: 0}}
            label="Recipe Difficulty"
            placeholder="Recipe Difficulty"
            fullWidth
            classes={{root:classes.outlineRoot}}
            multiline
          />
        </div>
      )}
      ListboxProps={{style:{backgroundColor:"#B6666F", color:"white", fontFamily:"Patua One"}}}
      noOptionsText="No Option"
      classes={{noOptions:classes.noOptions, input:classes.input, root:classes.root}}
    />
  );
}

DifficultyOption.propTypes = {
  onSelectDifficulty: PropTypes.func.isRequired,
};

export default DifficultyOption;
const difficulties = [
  { title: 'easy' },
  { title: 'medium' },
  { title: 'hard' },
];
