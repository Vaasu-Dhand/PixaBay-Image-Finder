import React, { useState } from "react";
import PropTypes from "prop-types";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import ZoomIn from "@material-ui/icons/ZoomIn";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100vw',
    height: '15%',
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

function ImageResults({ images }) {
  const classes = useStyles();

  let imageListContent;

  // Hooks
  const [open, setOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState("");

  const handleClickOpen = (img) => {
    setCurrentImg(img);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (images) {
    imageListContent = (
      <div className={classes.root} style={{ marginTop: "20px" }} >
        <GridList cellHeight={200} className={classes.gridList} cols={3}>
          {images.map((image) => (
            <GridListTile key={image.id}>
              <img src={image.largeImageURL} alt={image.tags} />
              <GridListTileBar
                title={image.tags}
                subtitle={
                  <span>
                    by: <b> {image.user} </b>
                  </span>
                }
                actionIcon={
                  <IconButton
                    aria-label={`info about ${image.type}`}
                    className={classes.icon}
                    onClick={() => handleClickOpen(image.largeImageURL)}
                  >
                    <ZoomIn />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        {/* Dialog */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <img src={currentImg} alt="" style={{ width: "100%" }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    imageListContent = null;
  }

  return <div>{imageListContent}</div>;
}

ImageResults.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageResults;
