import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  makeStyles,
  withStyles,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schemas/loginSchema";
import SubscriberContext from "../../context/Subscriber";
import { useNavigate, useParams } from "react-router-dom";
import ModalCustom from "../ModalCustom";

const style = makeStyles(() => ({
  title: {
    color: "#68846D",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  subTitle: {
    color: "grey",
    fontWeight: "bold",
    fontSize: "1rem",
    textAlign: "left",
  },
}));
const CustomTextField = withStyles((theme) => ({
  root: {
    "& .MuiFormHelperText-root": {
      color: "red",
    },
    "& .MuiInputBase-adornedEnd": {
      backgroundColor: "white",
      border: "0.5px solid grey",
      borderRadius: "5px",
    },
    marginBottom: "15px",
  },
}))(TextField);
export default function AccountConfig(props) {
  const history = useNavigate();
  const { auth } = useContext(SubscriberContext);
  const paymentClass = style(props);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (prop) => (event) => {
    setLogin({ ...login, [prop]: event.target.value });
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur", resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { email, password } = data;
    await auth({ email, password }).then(() => history("/configaccount"));

    setIsLoading(false);
  };

  return (
    <Box display="flex" marginTop={10} flexDirection="column">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography className={paymentClass.title}> Conecte-se:</Typography>
        <CustomTextField
          value={login?.email}
          error={!!errors.email?.message}
          className={paymentClass.inputs}
          helperText={errors.email?.message}
          {...register("email", handleChange("email"))}
          onChange={handleChange("email")}
          type="text"
          id="outlined-error-helper-text"
          label="Email"
          variant="outlined"
        />
        <CustomTextField
          value={login?.password}
          error={!!errors.password?.message}
          className={paymentClass.inputs}
          helperText={errors.password?.message}
          {...register("password")}
          onChange={handleChange("password")}
          type="password"
          id="outlined-error-helper-text"
          label="Senha"
          variant="outlined"
        />
        {isLoading ? (
          <CircularProgress style={{ color: "green" }}></CircularProgress>
        ) : (
          <Button
            disabled={!isValid}
            className={paymentClass.button}
            variant="outlined"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Prosseguir
          </Button>
        )}
      </Box>
      <ModalCustom title="okok" message="oko" open={false} />
    </Box>
  );
}
