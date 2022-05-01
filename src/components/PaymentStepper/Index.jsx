import React, { useContext, useEffect, useState } from "react";
import PaymentCard from "./PaymentCard";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Container, CircularProgress } from "@material-ui/core";
import useStyle from "./style";
import SubscriberContext from "../../context/Subscriber";

const StepperPayment = (props) => {
  const { getUser } = useContext(SubscriberContext);

  const history = useNavigate();
  const [loading, setLoading] = useState(false);

  const paymentClass = useStyle(props);

  const [step, setStep] = useState(0);
  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };
  const renderContentStep = () => {
    return <PaymentCard submit={nextStep} />;
  };
  useEffect(() => {
    setLoading(true);
    getUser()
      .then((v) => {
        if (v?.signature?.length > 0) history("/configaccount");
        setLoading(false);
      })
      .catch((err) => setLoading(false));
    // setLoading(false)
  }, []);

  return (
    <Container className={paymentClass.root}>
      <Box display="flex" justifyContent="space-around"></Box>
      <Box>
        {!loading ? (
          renderContentStep()
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
            height="100vh"
          >
            <CircularProgress style={{ color: "green" }}></CircularProgress>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default StepperPayment;
