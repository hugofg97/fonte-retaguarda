
export const handleChange =  ({prop, setCard, card, setBrand,getCardBin,setMaskCreditCard}) => async (event) => {
    if (prop === "number") {
      let { value } = event.target;
      value = value.replace(/_/g,'' ).replace(/ /g,'' );
      if (value.length === 0) setCard({ ...card, [prop]: '' });
      const number = parseInt(value);
      if (isNaN(number)) return;
      setCard({ ...card, [prop]: value.toString() });
      if (value.replace(/_/g,'' ).replace(/ /g,'' ).length >= 4) {
          const cardBin = await getCardBin(number);
          if(cardBin?.gaps) {
          setBrand(cardBin?.brand);
          const length =cardBin?.lenghts.pop();
          let currentMask = ''.padEnd(length, '9');
          const splitedMask = currentMask.split('');
          cardBin.gaps?.forEach((v,i) => {
            splitedMask[v-1] = `${splitedMask[v-1]} `;
          })
          const mask = splitedMask.join('');
          setMaskCreditCard(mask);
      
        }
      }
      return;
    }
    if (prop === "expMonth") {
      const { value } = event.target;
      if (value.length === 0) setCard({ ...card, [prop]: '' });
      const number = parseInt(value);
      if (isNaN(number)) return;
      setCard({ ...card, [prop]: number.toString() });
      return;
    }
    setCard({ ...card, [prop]: event.target.value });
  };