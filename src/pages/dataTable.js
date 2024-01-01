import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../redux/actions/action";
import EditUser from "../components/editModal";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { allUsers, error, editedData, deleteData } = useSelector(
    (state) => state?.userReducer
  );
  console.log(allUsers, "allUsers");
  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = React.useState(editedData);
  const [deletedData, setDeletedData] = React.useState(deleteData);
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    dispatch(getAllUsers());
  }, [editData, open, deletedData]);

  const handleEdit = (card) => {
    setData(card);
    setOpen(!open);
  };
  const handleDelete = (card) => {
    dispatch(deleteUser(card?._id));
  };
  const handleAddNewUser = () => {
    navigate("/register");
  };
  return (
    <>
      {open && <EditUser open={open} data={data} setOpen={setOpen} />}
      <Box className="add">
        <Button variant="contained" onClick={() => handleAddNewUser()}>
          AddNewUser
        </Button>
      </Box>
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
              <Button size="small" onClick={() => handleEdit(card)}>
                edit
              </Button>
              <Button size="small" onClick={() => handleDelete(card)}>
                delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
};
export default UserList;
