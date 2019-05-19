import React from 'react'
import { withLayout } from '../hoc'
import { compose, withProps , withHandlers, withState } from 'recompose'
import { Button , Form , Header } from 'semantic-ui-react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

const H1 = styled.h1 `
  padding-top : 18px;
  margin-left : -80px !important;
  font-size: 3rem !important;
  color : #515151 ;
`;
const FormContainer = styled(Form)`
  width: 25% !important;
  padding-top: 15% !important;
  margin-left : -5% !important;
  font-family: 'Kanit', sans-serif !important;
`
const LoginHeader = styled(Header)`
  font-family: 'Kanit', sans-serif !important;
`

const enhance = compose(
  withLayout,
  inject('authStore'),
  withState('email' , 'setEmail'),
  withState('password' , 'setPassword'),
  withProps({
    pageTitle: 'Welcome to PowerHR Admin'
  }),
  withHandlers({
    handleLoginButton: props => async() => {      
      await props.authStore.login(props)
    }
  }),
  observer
)
  
export default enhance((props) => 
  <div>
    <center>
      {
        props.authStore.currentUser 
          ?  <H1>Welcome To PowerHR</H1>
          :  <FormContainer>
                <LoginHeader as='h1'>เข้าสู่ระบบ</LoginHeader><br/>
                <Form.Group widths='equal'>
                  <Form.Input
                    fluid
                    placeholder='Email'
                    icon='mail' 
                    iconPosition='left'
                    onChange={(event) => props.setEmail(event.target.value)}
                    type="email"
                    autoFocus 
                  />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input
                    fluid
                    placeholder='Password'
                    icon='key' 
                    iconPosition='left'
                    onChange={(event) => props.setPassword(event.target.value)}
                    type="password"
                  />
                </Form.Group><br/>
                <Button type='submit' color="green" onClick={()=> props.handleLoginButton()}>Login</Button>
              </FormContainer>
      }
    </center>
  </div>
);