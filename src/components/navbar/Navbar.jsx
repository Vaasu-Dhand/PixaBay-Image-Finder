import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
import ReactTextTransition, { presets } from "react-text-transition";

const headings = ['PixaBay Image Finder', 'Image Search App', 'React.js & Material UI']

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function Navbar() {
  const classes = useStyles();
  
  // Hooks
  const [textIndex, setTextIndex] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setTextIndex(textIndex + 1)
    }, 4000);
  }, [textIndex])

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            <b className='margin'>
            <ReactTextTransition
              text={headings[textIndex % headings.length]}
              spring={presets.gentle}
              className="big"
              delay={300}
              inline
            />  
            </b> 
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
