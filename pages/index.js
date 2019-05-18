import React from 'react'
import { withLayout } from '../hoc'
import { compose, withProps } from 'recompose'
import { Button , Form , Input } from 'semantic-ui-react'
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
`

const enhance = compose(
  withLayout,
  inject('authStore'),
  withProps({
    pageTitle: 'Welcome to PowerHR Admin'
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
                <Form.Group widths='equal'>
                  <Form.Input
                    fluid
                    id='namePositions'
                    placeholder='Email'
                    icon='mail' 
                    iconPosition='left'
                    // onChange={props.handleSetName()}
                    autoFocus 
                  />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input
                    fluid
                    id='namePositions'
                    placeholder='Password'
                    icon='key' 
                    iconPosition='left'
                    // onChange={props.handleSetName()}
                  />
                </Form.Group>
                <Button type='submit'>Submit</Button>
              </FormContainer>
      }
    </center>
  </div>
);