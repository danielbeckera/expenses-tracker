import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  Card,
  CardContent,
  Divider,
  Typography,
  IconButton,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
} from "@mui/material";
import { DeleteOutlined } from "@material-ui/icons";

function History(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card
        sx={{ display: "flex", borderRight: `5px solid ${props.colorHistory}` }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {props.title}
            </Typography>
            <Divider variant="middle" />
            <Typography
              variant="subtitle2"
              color="text.secondary"
              component="div"
            >
              {new Intl.NumberFormat("br-PT", {
                style: "currency",
                currency: "BRL",
              }).format(props.value)}
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
                    Ao deletar, seu saldo será recalculado, caso queira você
                    pode readicionar esse item no futuro.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>CANCELAR</Button>
                  <Button onClick={props.deleteItem} autoFocus>
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
