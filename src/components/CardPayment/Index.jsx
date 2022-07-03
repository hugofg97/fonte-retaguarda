import React, { useContext, useEffect, useState } from "react";

import {
  Box,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { paymentSchema } from "../../schemas/paymentSchema";
import { withStyles } from "@material-ui/styles";
import useStyle from "./style";
import InputMask from "react-input-mask";
import SubscriberContext from "../../context/Subscriber";
import ModalCustom from "../ModalCustom";
import { useNavigate } from "react-router-dom";
import { handleChange } from "./functions";
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

export default function PaymentCard(props) {

  const history = useNavigate();
  const { backWindow } = props;
  const {
    card,
    setCard,
    getSignature,
    msgError,
    successSaveCard,
    setSuccessSaveCard,
    setMsgError,
    saveCard,
    getCardBin,
  } = useContext(SubscriberContext);
  const paymentClass = useStyle(props);
  const [brand, setBrand] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [maskCreditCard, setMaskCreditCard] = useState('9999 9999 9999 9999');

  const closeModal = async () => {
    await getSignature();
    setSuccessSaveCard(false);
    setIsLoading(false);
    setOpenModal(false);
    setCard({
      number: "",
      holderName: "",
      holderDocument: "",
      expMonth: "",
      expYear: "",
      cvv: "",
      brand: "",
    });
    setBrand("");
    if(backWindow) backWindow()
    // history("/configaccount");
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur", resolver: yupResolver(paymentSchema) });

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      if (!brand) {
        setIsLoading(false);
        return;
      }
      await saveCard({
        card: {
          ...card,
          brand: brand,
          holderDocument: card.holderDocument.replace(/[^0-9]/g, ""),
        },
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleMaskCreditCard = () => {
     return maskCreditCard;  
  }
  useEffect(() => {
    if (msgError) {
      setOpenModal(true);
    } else setOpenModal(false);
    if (successSaveCard) {
      closeModal();
      // setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [msgError, successSaveCard]);

  return (
    <Box display="flex" flexDirection="column" marginTop={5} padding="10px">
      <Box display="flex" flexDirection="column">
      <InputMask
          value={card?.number}
          mask={handleMaskCreditCard()}
          alwaysShowMask={true}
          maskChar={''}
          error={!!errors.number?.message}
          className={paymentClass.inputs}
          helperText={errors.number?.message}
          {...register(
            "number",
            handleChange({ prop: "number", setBrand, setCard, card, getCardBin, setMaskCreditCard })
          )}
          onChange={handleChange({
            prop: "number",
            setBrand,
            setCard,
            card,
            getCardBin,
            setMaskCreditCard
          })}
          type="text"
          id="outlined-error-helper-text"
          label="Número do cartão"
          variant="outlined"
        >
          {(inputProps) => <CustomTextField {...inputProps}    InputProps={{
            endAdornment: (
              <InputAdornment
                style={{ border: "0px transparent" }}
                position="end"
              >
             { brand && (<img width="35" height="23" src={`https://dashboard.mundipagg.com/emb/images/brands/${brand}.jpg`} alt=""></img>)}
              </InputAdornment>
            ),
          }}/>}
        </InputMask>

        <CustomTextField
          value={card?.holderName}
          error={!!errors.holderName?.message}
          className={paymentClass.inputs}
          helperText={errors.holderName?.message}
          {...register(
            "holderName",
            handleChange({ prop: "holderName", setBrand, setCard, card })
          )}
          onChange={handleChange({
            prop: "holderName",
            setBrand,
            setCard,
            card,
          
          })}
          type="text"
          id="outlined-error-helper-text"
          label="Nome igual ao do cartão"
          variant="outlined"
        />

        <InputMask
          value={card?.holderDocument}
          mask="999.999.999-99"
          error={!!errors.holderDocument?.message}
          className={paymentClass.inputs}
          helperText={errors.holderDocument?.message}
          {...register(
            "holderDocument",
            handleChange({ prop: "holderDocument", setBrand, setCard, card })
          )}
          onChange={handleChange({
            prop: "holderDocument",
            setBrand,
            setCard,
            card,
          
          })}
          type="text"
          id="outlined-error-helper-text"
          label="Documento(CPF)"
          variant="outlined"
        >
          {(inputProps) => <CustomTextField {...inputProps} />}
        </InputMask>

        <Box display="flex">
          <CustomTextField
            value={card?.expMonth}
            error={!!errors.expMonth?.message}
            className={paymentClass.inputs}
            helperText={errors.expMonth?.message}
            {...register(
              "expMonth",
              handleChange({ prop: "expMonth", setBrand, setCard, card })
            )}
            onChange={handleChange({
              prop: "expMonth",
              setBrand,
              setCard,
              card,
            
            })}
            type="text"
            id="outlined-error-helper-text"
            label="Mês"
            variant="outlined"
            inputProps={{ maxLength: 2 }}
          />

          <InputMask
            value={card?.expYear}
            mask="99"
            error={!!errors.expYear?.message}
            className={paymentClass.inputs}
            helperText={errors.expYear?.message}
            {...register(
              "expYear",
              handleChange({ prop: "expYear", setBrand, setCard, card })
            )}
            onChange={handleChange({
              prop: "expYear",
              setBrand,
              setCard,
              card,
            
            })}
            type="text"
            id="outlined-error-helper-text"
            label="Ano"
            variant="outlined"
          >
            {(inputProps) => <CustomTextField {...inputProps} />}
          </InputMask>

          <CustomTextField
            value={card?.cvv}
            error={!!errors.cvv?.message}
            className={paymentClass.inputs}
            helperText={errors.cvv?.message}
            {...register(
              "cvv",
              handleChange({ prop: "cvv", setBrand, setCard, card })
            )}
            onChange={handleChange({ prop: "cvv", setBrand, setCard, card })}
            type="text"
            id="outlined-error-helper-text"
            label="CVV"
            variant="outlined"
          />
        </Box>

        <ModalCustom
          title={
            msgError ? "Ocorreu um erro" : "Novo cartão cadastrado com sucesso"
          }
          message={msgError}
          open={openModal}
          deny={{ action: () => closeModal(), label: "Fechar" }}
          setOpen={() => setMsgError("")}
        />

        {isLoading ? (
          <Box display="flex" justifyContent="center" >
            <CircularProgress style={{ color: "green" }}></CircularProgress>
          </Box>
        ) : (
          <Box marginTop={5} display="flex" justifyContent="space-around">
             <Button
              className={paymentClass.button}
              variant="outlined"
              color="secondary"
              onClick={backWindow}
            >
              Voltar
            </Button>
            <Button
              disabled={!isValid}
              className={paymentClass.button}
              variant="outlined"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Confirmar
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
