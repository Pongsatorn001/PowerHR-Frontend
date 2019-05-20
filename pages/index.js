import React from 'react'
import { withLayout } from '../hoc'
import { compose, withProps , withHandlers } from 'recompose'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';


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
  withLayout,
  withHandlers({
    handleClick: props => () => {
      return console.log('test');
      
    }
  })
)
  
export default enhance(() => 
  <div>
    <center>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
    <ToastContainer />
      {/* <button onClick={()=>{ toast('🦄 Wow so easy!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true
}); }}>click</button> */}
      <H1>Welcome To PowerHR</H1>
    </center>
  </div>
);