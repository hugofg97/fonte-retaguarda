import React, { useContext, useEffect, useState } from "react";

import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Typography,

  Button,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";

import SubscriberContext from "../../context/Subscriber";
import { useNavigate, useParams } from "react-router-dom";
import ModalCustom from "../ModalCustom";
import {  Radio } from "@mui/material";
import PaymentCard from "../CardPayment/Index";

const style = makeStyles(() => ({
  title: {
    color: "grey",
    fontSize: "1rem",
    marginLeft: "1rem",
    marginTop: "5px",
  },
  subTitle: {
    color: "#68846D",
    fontWeight: "bold",
    fontSize: "1rem",
    marginLeft: "2px",
  },
}));

export default function AccountConfig(props) {
  const history = useNavigate();
  const { id } = useParams();
  const { getSignature, signature, cancelSubscribtion,setSuccessSaveCard,getCardBin, userCards,updateCard,deleteCard,successDeleteCard, setSuccessDeleteCard, successSignature } =
    useContext(SubscriberContext);
  const paymentClass = style(props);
  const [password, setPassword] = useState("");
  const [modalCancelSubscription, setModalCancelSubscription] = useState(false);
  const [modalSwitchCards, setModalSwitchCards] = useState(false);
  const [modalNewCard, setModalNewCard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRemoveCard, setIsLoadingRemoveCard] = useState(null);
  const [isLoadingSwitchCard, setIsLoadingSwitchCard] = useState(false);
  const [ selecetedCard, setSelectedCard ] = useState(null);

  const onSubmit = async () => {
    await signature({ password, document: id });
  };
  const handleSelected = (event) => {
    setSelectedCard(event.currentTarget.value)
  }
  const switchCard = async () => {
    setIsLoadingSwitchCard(true);
    await updateCard({cardId: selecetedCard});
    await getSignature();
    setSuccessSaveCard(false)
    setIsLoadingSwitchCard(false);
    setModalSwitchCards(false);
  }
  const cancelSignature = async () => {
    await cancelSubscribtion();
  };
  const openModalCard = () => {
    setModalSwitchCards(!modalSwitchCards);
  }
  const openModalNewCard = () => {
    setModalNewCard(!modalNewCard);
  }
  useEffect(() => {
    setIsLoading(true);
    getSignature().then((v) => {
      if (!v?.id) {
        history("/payment");
        setIsLoading(false);
      } else {
        setSelectedCard(v.card?.id)
        setIsLoading(false);
        return;
      }
    });
  }, []);
  useEffect(() => {
    if (successSignature) {
      localStorage.clear();
      history("/");
    }
  }, [successSignature]);
  useEffect(() => {
    if (successDeleteCard) {
      getSignature().then(() => setIsLoadingRemoveCard(null));
    }
  }, [successDeleteCard]);
  

  return (
    <Box display="flex" marginTop={10} flexDirection="column">
      {isLoading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          height="100vh"
        >
          <CircularProgress style={{ color: "green" }}></CircularProgress>
        </Box>
      ) : (
        <>
          <Box display="flex" flexDirection="column" alignItems="start">
            <Box
              display="flex"
              width="100vw"
              flexDirection="column"
              alignItems="start"
            >
              <Typography className={paymentClass.title}>
                Assinatura:
                <span
                  style={{ color: signature?.active ? "#68846D" : "red" }}
                  className={paymentClass.subTitle}
                >
                  {signature?.active ? "Ativa" : "Pendente"}
                </span>
              </Typography>

              <Typography className={paymentClass.title}>
                Fatura Atual:
                <span className={paymentClass.subTitle}>
                  {new Date(signature?.charge?.due_at).toLocaleDateString()}
                </span>
              </Typography>
              <Typography className={paymentClass.title}>
                Status:
                <span className={paymentClass.subTitle}>
                  {signature?.active ? "Pago" : "Pendente"}
                  {!signature?.active && (
                    <Button
                      label="senha"
                      style={{ color: "blue" }}
                      onClick={onSubmit}
                      variant="text"
                    >
                      Pagar fatura
                    </Button>
                  )}
                </span>
              </Typography>

              <Typography className={paymentClass.title}>
                Próxima Fatura:
                <span className={paymentClass.subTitle}>
                  {new Date(
                    signature?.subscription?.next_billing_at
                  ).toLocaleDateString()}
                </span>
              </Typography>
            <Typography className={paymentClass.title}>
              Cartão:
              <span className={paymentClass.subTitle}>
              { signature?.card?.brand && (<img width="35" height="23" src={`https://dashboard.mundipagg.com/emb/images/brands/${signature?.card?.brand}.jpg`} alt=""></img>)}
       
               
                {` Final: ${signature?.card?.last_four_digits}`}
              </span>
              <Button onClick={() => openModalCard()} style={{ color: "blue" }}>Trocar</Button>
            </Typography>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" marginTop={5}>
            <Button
              label="senha"
              style={{ color: "blue" }}
              onClick={setModalNewCard}
              variant="text"
            >
              Adicionar novo cartão
            </Button>
            {signature?.active && (
              <Button
                label="senha"
                style={{ color: "red" }}
                onClick={() => setModalCancelSubscription(true)}
                variant="filled"
              >
                Cancelar assinatura?
              </Button>
            )}
          </Box>
          <ModalCustom
            title="Cancelar assinatura"
            component={
              <Box marginTop={5} display="flex" justifyContent="space-around">
                <Button
                  onClick={cancelSignature}
                  className={paymentClass.button}
                  variant="outlined"
                  color="primary"
                >
                  Sim
                </Button>

                <Button
                  className={paymentClass.button}
                  variant="outlined"
                  color="secondary"
                  onClick={() => setModalCancelSubscription(false)}
                >
                  Não
                </Button>
              </Box>
            }
            message="Tem certeza que deseja cancelar sua assinatura?"
            open={modalCancelSubscription}
          />
          <ModalCustom
            title="Adicionar cartão"
            component={ userCards.length >=5 ? ( 
              <Box marginTop={5} display="flex" justifyContent="center">
                 <Button
              onClick={openModalNewCard}
              className={paymentClass.button}
              variant="outlined"
              style={{marginTop: 20, textAlign:'center'}}
              color="primary"
            >
              Voltar
            </Button></Box>):
              (<PaymentCard backWindow={openModalNewCard}/>)
            }
            message={userCards.length >=5 ?'Você já possui 5 cartões cadastrados e exedeu o limite, para cadastrar mias um cartão será preciso remover outro':'Preencha os dados abaixo para adicionar um novo cartão'}
            open={modalNewCard}
            fullScreen={true}
          />
          <ModalCustom
            title="Selecione o cartão Desejado"
            fullScreen
            component={
              <Box margin="auto" marginTop={5} display="flex" flexDirection="column" width="100%"  justifyContent="space-arround">
                {userCards.map((el) => (
                  <Box paddingLeft={1} height={50}>
                  <Radio  onChange={handleSelected} value={el.id} checked={selecetedCard === el.id}></Radio>  { el?.brand && (<img width="35" height="23" src={`https://dashboard.mundipagg.com/emb/images/brands/${el?.brand}.jpg`} alt=""></img>)} Final: {el.lastFourDigits} {isLoadingRemoveCard === el.id ? <CircularProgress style={{marginLeft: 10}} size={20} color="secondary"/>:  <Button onClick={() => {
                    setIsLoadingRemoveCard(el.id);
                    deleteCard(el.id)
                  } 
                  } style={{color:'red'}}><DeleteIcon  /></Button>}
                  </Box>
                ))}
                  {!isLoadingSwitchCard? (<Box marginTop={5} display="flex" justifyContent="space-around">
                  <Button
                  onClick={openModalCard}
                  className={paymentClass.button}
                  variant="outlined"
                  color="secondary"
                >
                  Voltar
                </Button>

                <Button
                  className={paymentClass.button}
                  variant="outlined"
                  color="primary"
                  onClick={switchCard}
                >
                  Salvar
                </Button>
              </Box>): 
                <Box display="flex" justifyContent="center">
                 <CircularProgress style={{ color: "green" }}/>
                </Box>}
              </Box>
            }
            message="A sua próxima fatura será cobrada no cartão selecionado"
            open={modalSwitchCards}
          />
        </>
      )}
    </Box>
  );
}
