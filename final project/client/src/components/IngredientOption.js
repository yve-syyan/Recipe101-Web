
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
// import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Autocomplete,{createFilterOptions} from '@material-ui/lab/Autocomplete';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import { withStyles } from '@material-ui/core/styles';
// import { getTag } from "./tagFunction";
// import { array } from 'prop-types';
import PropTypes from 'prop-types';
import {fetchIngredient} from "./getData";
import "../style/IngredientOption.css";
// import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  noOptions: {
    background: "#9E4244",
    fontFamily: "Patua One",
    color: "white"
  },
  input: {
    fontFamily: "Patua One",
    color: "white",
    // botderBottom:0
  },
  outlineRoot: {
    // '.MuiListItemText-multiline': {
    //   borderColor:"red"
    // },
    // "& .MuiOutlinedInput-root .MuiInputBase-input": {
    //    borderBottom: 0,
    //    outline: 0
    // },
    // // .MuiAutocomplete-inputFocused
    // "& .MuiOutlinedInput-root .Mui-focused": {
    //    borderBottom: 0
    // },
    "& .makeStyles.root": {
      width:0,
      height:0
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E4C2C1",
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
      color: "#E4C2C1",
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
      options={top100Films}
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
        <div style={{width:"50%", padding:50, paddingBottom:60, left: "68.4%", top: "50%", position:"absolute", transform: "translate(-50%, -50%)"}}>
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
      limitTags={8}

    />
  );
}
// }
IngredientOption.propTypes = {
  onSelectIngredients: PropTypes.func.isRequired,
};

// IngredientOption.propTypes = {
//   classes: PropTypes.func.isRequired,
// };
export default IngredientOption;
// export default withStyles(styles)(IngredientOption);
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  // { title: 'apple', year: 1994, pic: "" },
  // { title: 'The Godfather', year: 1972 },
  // { title: 'The Godfather: Part II', year: 1974 },
  // { title: 'The Dark Knight', year: 2008 },
  // { title: '12 Angry Men', year: 1957 },
  // { title: "Schindler's List", year: 1993 },
  // { title: 'Pulp Fiction', year: 1994 },
  // { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  // { title: 'The Good, the Bad and the Ugly', year: 1966 },
  // { title: 'Fight Club', year: 1999 },
  // { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  // { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  // { title: 'Forrest Gump', year: 1994 },
  // { title: 'Inception', year: 2010 },
  // { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  // { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  // { title: 'Goodfellas', year: 1990 },
  // { title: 'The Matrix', year: 1999 },
  // { title: 'Seven Samurai', year: 1954 },
  // { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  // { title: 'City of God', year: 2002 },
  // { title: 'Se7en', year: 1995 },
  // { title: 'The Silence of the Lambs', year: 1991 },
  // { title: "It's a Wonderful Life", year: 1946 },
  // { title: 'Life Is Beautiful', year: 1997 },
  // { title: 'The Usual Suspects', year: 1995 },
  // { title: 'Léon: The Professional', year: 1994 },
  // { title: 'Spirited Away', year: 2001 },
  // { title: 'Saving Private Ryan', year: 1998 },
  // { title: 'Once Upon a Time in the West', year: 1968 },
  // { title: 'American History X', year: 1998 },
  // { title: 'Interstellar', year: 2014 },
  // { title: 'Casablanca', year: 1942 },
  // { title: 'City Lights', year: 1931 },
  // { title: 'Psycho', year: 1960 },
  // { title: 'The Green Mile', year: 1999 },
  // { title: 'The Intouchables', year: 2011 },
  // { title: 'Modern Times', year: 1936 },
  // { title: 'Raiders of the Lost Ark', year: 1981 },
  // { title: 'Rear Window', year: 1954 },
  // { title: 'The Pianist', year: 2002 },
  // { title: 'The Departed', year: 2006 },
  // { title: 'Terminator 2: Judgment Day', year: 1991 },
  // { title: 'Back to the Future', year: 1985 },
  // { title: 'Whiplash', year: 2014 },
  // { title: 'Gladiator', year: 2000 },
  // { title: 'Memento', year: 2000 },
  // { title: 'The Prestige', year: 2006 },
  // { title: 'The Lion King', year: 1994 },
  // { title: 'Apocalypse Now', year: 1979 },
  // { title: 'Alien', year: 1979 },
  // { title: 'Sunset Boulevard', year: 1950 },
  // {
  //   title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
  //   year: 1964,
  // },
  // { title: 'The Great Dictator', year: 1940 },
  // { title: 'Cinema Paradiso', year: 1988 },
  // { title: 'The Lives of Others', year: 2006 },
  // { title: 'Grave of the Fireflies', year: 1988 },
  // { title: 'Paths of Glory', year: 1957 },
  // { title: 'Django Unchained', year: 2012 },
  // { title: 'The Shining', year: 1980 },
  // { title: 'WALL·E', year: 2008 },
  // { title: 'American Beauty', year: 1999 },
  // { title: 'The Dark Knight Rises', year: 2012 },
  // { title: 'Princess Mononoke', year: 1997 },
  // { title: 'Aliens', year: 1986 },
  // { title: 'Oldboy', year: 2003 },
  // { title: 'Once Upon a Time in America', year: 1984 },
  // { title: 'Witness for the Prosecution', year: 1957 },
  // { title: 'Das Boot', year: 1981 },
  // { title: 'Citizen Kane', year: 1941 },
  // { title: 'North by Northwest', year: 1959 },
  // { title: 'Vertigo', year: 1958 },
  // { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
  // { title: 'Reservoir Dogs', year: 1992 },
  // { title: 'Braveheart', year: 1995 },
  // { title: 'M', year: 1931 },
  // { title: 'Requiem for a Dream', year: 2000 },
  // { title: 'Amélie', year: 2001 },
  // { title: 'A Clockwork Orange', year: 1971 },
  // { title: 'Like Stars on Earth', year: 2007 },
  // { title: 'Taxi Driver', year: 1976 },
  // { title: 'Lawrence of Arabia', year: 1962 },
  // { title: 'Double Indemnity', year: 1944 },
  // { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
  // { title: 'Amadeus', year: 1984 },
  // { title: 'To Kill a Mockingbird', year: 1962 },
  // { title: 'Toy Story 3', year: 2010 },
  // { title: 'Logan', year: 2017 },
  // { title: 'Full Metal Jacket', year: 1987 },
  // { title: 'Dangal', year: 2016 },
  // { title: 'The Sting', year: 1973 },
  // { title: '2001: A Space Odyssey', year: 1968 },
  // { title: "Singin' in the Rain", year: 1952 },
  // { title: 'Toy Story', year: 1995 },
  // { title: 'Bicycle Thieves', year: 1948 },
  // { title: 'The Kid', year: 1921 },
  // { title: 'Inglourious Basterds', year: 2009 },
  // { title: 'Snatch', year: 2000 },
  // { title: '3 Idiots', year: 2009 },
  // { title: 'Monty Python and the Holy Grail', year: 1975 },
];
