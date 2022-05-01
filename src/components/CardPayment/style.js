import { makeStyles } from "@material-ui/core";



const useStyle = makeStyles((theme) => ({
    root: {
      backgroundColor: "",
    },
    inputs: {
        margin: '10px'
    },
    button: {
        color: 'green',
        margin: '10px',
        backgroundColor:'white',
        border: 'green 1px solid'
    }
}));

export default useStyle;