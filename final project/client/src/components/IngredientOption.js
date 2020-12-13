
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
    background: "#9E4244",
    fontFamily: "Patua One",
    color: "white"
  },
  input: {
    fontFamily: "Patua One",
    color: "white",
  },
  outlineRoot: {
    "& .makeStyles.root": {
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
      borderColor: "#9E4244",
      border:'5px solid'
    },
    "& .MuiOutlinedInput-input": {
      color: "white",
      // borderBottom: 0
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



const IngredientOption = (props) => {
  const [tags, setTags] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    props.onSelectIngredients(tags);
    console.log('state changed', tags);
  }, [tags]); 
    
  const onTagsChange = async (event, values) => {
    values.map(async (entry) => {
      entry.pic = await fetchIngredient(entry.title).then((res) => res);
      setTags({
        tags: values
      });
      return entry;
    });
    console.log("tags", tags);
  }
  
  // render() {
  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      style={{ 
        color: "white"}}
      // id="tags-outlined"
      options={ingredients}
      getOptionLabel={option => option.title}
      // defaultValue={}
      onChange={onTagsChange}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
  
        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            title: `${params.inputValue}`,
            pic: ""
          });
        }
  
        return filtered;
      }}
      renderInput={params => (
        <div style={{width:"30%", padding:50, paddingBottom:60, left: "58.4%", top: "53%", position:"absolute", transform: "translate(-50%, -50%)"}}>
          <TextField
            {...params}
            variant="outlined"
            style={{color:"white",fontFamily:"Patua One", borderBottom: 0}}
            // s
            label=" Ingredients"
            placeholder="Your Ingredients"
            // margin="none"
            fullWidth
            classes={{root:classes.outlineRoot}}
            multiline
            // multiline="false"
          />
        </div>
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip style={{backgroundColor:"#9E4244", color:"white", height:48, fontFamily:"Patua One", fontSize:15, marginTop:10, marginLeft:10, marginRight:10}} avatar={<Avatar style={{width:45, height:43}} alt="Remy Sharp" src={option.pic} />} variant="outlined" label={option.title} {...getTagProps({ index })} />
      ))}
      ListboxProps={{style:{backgroundColor:"#9E4244", color:"white", fontFamily:"Patua One"}}}
      noOptionsText="Type in Your Ingredients"
      classes={{noOptions:classes.noOptions, input:classes.input, root:classes.root}}
      limitTags={4}

    />
  );
}
// }
IngredientOption.propTypes = {
  onSelectIngredients: PropTypes.func.isRequired,
};

export default IngredientOption;
const ingredients = [
];
