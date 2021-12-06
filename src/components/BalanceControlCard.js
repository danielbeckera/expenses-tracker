import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { withStyles } from "@material-ui/styles";

const GreenTextTypography = withStyles({
  root: {
    color: "green",
    fontWeight: "bold",
  },
})(Typography);

const RedTextTypography = withStyles({
  root: {
    color: "red",
    fontWeight: "bold",
  },
})(Typography);

export default function BalanceControlCard(props) {
  return (
    <Card sx={{ display: "flex" }}>
      <Box
        sx={{ display: "flex", flexDirection: "column", textAlign: "center" }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="caption">
            INCOME
          </Typography>
          <GreenTextTypography variant="subtitle1" color="" component="div">
            R$ {props.positive}
          </GreenTextTypography>
        </CardContent>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box
        sx={{ display: "flex", flexDirection: "column", textAlign: "center" }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="caption">
            EXPENSES
          </Typography>
          <RedTextTypography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            R$ {props.negative}
          </RedTextTypography>
        </CardContent>
      </Box>
    </Card>
  );
}
