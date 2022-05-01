import creditCardType from 'credit-card-type'

export const handleChange = ({prop, setCard, card, setBrand}) => (event) => {
    if (prop === "number") {
      const { value } = event.target;
      if (value.length === 0) setCard({ ...card, [prop]: '' });
      const number = parseInt(value);
      if (isNaN(number)) return;
      setCard({ ...card, [prop]: value.toString() });
      if (value.length > 4) {

        if (creditCardType(value)[0]?.type) {

          setBrand(creditCardType(value)[0].type)
        }
        else setBrand('')

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