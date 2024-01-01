import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { editUser } from "../redux/actions/action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditUser = ({ open, setOpen, data }) => {
    const dispatch = useDispatch();
  const initialState = {
    email: "",
    phoneNumber: 0,
    userName: "",
  };
  const [formData, setFormData] = React.useState(initialState);
  console.log(data, "data");
  React.useEffect(() => {
    if (data) {
      setFormData({
        email: data.email || "",
        userName: data.userName || "",
        phoneNumber: data.phoneNumber || 0,
      });
    }
  }, [data]);

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { email, userName, phoneNumber } = formData;
const handleSubmit = ()=>{
    const newData = {
        id : data._id ,
        data : formData
    }
    dispatch(editUser(newData))
    setOpen(false)
}
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
            
          <Box sx={style}>
            <Typography>Email:</Typography>
            <TextField
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Typography>User Name:</Typography>
            <TextField
              type="text"
              value={userName}
              name="userName"
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Typography>Phone Number:</Typography>
            <TextField
              type="number"
              value={phoneNumber}
              name="phoneNumber"
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button onClick={()=>handleSubmit()}>Update</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default EditUser;
