import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageResults from '../image-results/ImageResults'
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  search: {
      margin: theme.spacing(1),
      width: "100ch",
  },
  amount: {
      margin: theme.spacing(1),
      width: "25ch",
  },
}));

function Search() {
  // Variables
  const apiUrl = "https://pixabay.com/api/";
  const apiKey = "17917329-f815a9278278de99d02a1d351";
  const imagesAmount = [5, 10, 15, 30, 50];
  
  // Hooks
  const [searchText, setSearchText] = useState("");
  const [amount, setAmount] = useState(15);
  const [images, setImages] = useState([]);

  const classes = useStyles();

  const handleChange = async (e) => {
    const search = e.target.value
    if (search === '') {
      setSearchText('')
      setImages([])
    } else {
      setSearchText(search)
      const { data :{hits} } = await axios.get(`${apiUrl}?key=${apiKey}&q=${search}&image_type=photo&per_page=${amount}&safesearch`); // Double Destructuring
      console.log(hits);
      setImages(hits)
    }
  }

  return (
    <div className='margin'>
    <form className={classes.search} noValidate autoComplete="off" style={{display: "inline"}} >
      <span>

      <TextField
        id="outlined-basic"
        label="Search for Images"
        variant="outlined"
        className={`${classes.search} search`}
        value={searchText}
        onChange={(e) => handleChange(e)}
      />
      <TextField
        id="outlined-select-currency"
        select
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        variant="outlined"
        className={`${classes.amount}`}
      >
        {imagesAmount.map((amount) => (
          <MenuItem key={amount} value={amount}>
            {amount}
          </MenuItem>
        ))}
      </TextField>
      </span>
      
    </form>
    <br/>
    {images.length > 0 ? (<ImageResults images={images} />) : null}
  </div>
  );
}

export default Search;
