import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/actions/action";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const UserList = () => {
  const dispatch = useDispatch();
  const { allUsers, error } = useSelector((state) => state?.userReducer);
  console.log(allUsers, "allUsers");
  React.useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {allUsers?.data?.map((card, index) => (
        <Card key={index} sx={{ minWidth: 255 }} className="card">
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              {card?.userName}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
         {card?.email}
            </Typography>
            <Typography variant="body2">{card?.phoneNumber}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">edit</Button>
            <Button size="small">delete</Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};
export default UserList;
