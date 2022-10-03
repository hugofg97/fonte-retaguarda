import React, { useContext, useEffect, useState } from "react";

import DeleteIcon from '@mui/icons-material/Delete';
import {

  Grid,
  Button,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import styled from 'styled-components';


const GridTemplate = styled.div`

display: grid;
margin-top: 150px;
grid-template-columns: 12fr;




`



export default function AccountConfig(props) {
  

  const {children} = props;

  return (
    <GridTemplate >
      
      {children}
    </GridTemplate>
  );
}
