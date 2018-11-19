import React from 'react'
import { withLayout } from '../hoc'
import { compose, withProps } from 'recompose'
import styled from 'styled-components'

const H1 = styled.h1 `
  padding-top : 18px;
  margin-left : -80px !important;
  font-size: 3rem !important;
  color : #515151 ;
`;

const enhance = compose(
  withProps({
    pageTitle: 'Welcome to PowerHR Admin'
  }),
  withLayout
)
  
export default enhance(() => 
  <div>
    <center>
      <H1>Welcome To PowerHR</H1>
    </center>
  </div>
);