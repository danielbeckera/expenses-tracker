import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  Card,
  CardContent,
  Divider,
  Typography,
  IconButton,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
  Alert,
} from "@mui/material";
import { DeleteOutlined } from "@material-ui/icons";

function History(props) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalVisivel = () => {
    setVisible(true);
  };
  return (
    <div>
      <Card sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" color="text.secondary" component="div">
              {props.title}
            </Typography>
            <Divider variant="middle" />
            <Typography variant="body1" color="text.secondary" component="div">
              {props.value}
            </Typography>
            <IconButton>
              <DeleteOutlined onClick={handleClickOpen} />
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Você realmente deseja deletar esse item?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Ao confirmar, esse item será deletado, caso queira você pode
                    readicioná-lo.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>CANCELAR</Button>
                  <Button onClick={handleClose} autoFocus>
                    DELETAR
                  </Button>
                </DialogActions>
              </Dialog>
            </IconButton>
          </CardContent>
          <Box
            sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
          ></Box>
        </Box>
      </Card>
    </div>
  );
}

export default History;
