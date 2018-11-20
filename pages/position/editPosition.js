import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps } from 'recompose'
import { TextHeader } from '../../components/TextHeader'
import styled from 'styled-components'
import { Form , Input , Button , Icon} from 'semantic-ui-react'


const Div = styled.div `
  position : relative ;
  background : rgb(255, 255, 255);
  box-shadow : rgb(204, 204, 204) 0px 1px 2px;
  margin-right : 13px;
`
const DivForm = styled.div`
  padding-top : 40px !important ;
  margin-left : 500px !important ;
  margin-right : 500px !important ;
`

const DivButton = styled.div`
  padding-top : 20px !important ;
  padding-bottom : 60px !important ;
`
const ButtonText = styled(Button)`
  font-family : 'Kanit', sans-serif !important;
`

const enhance = compose(
  withProps({
    pageTitle: 'Add Position'
  }),
  withLayout
)
  
export default enhance(() => 
  <Div>
    <center>{TextHeader('Edit Positions ( แก้ไขตำแหน่ง )')}</center>
    <DivForm>
      <Form>
        <Form.Field>
          <label>ชื่อตำแหน่งที่ต้องการแก้ไข : </label>
          <Input placeholder='กรุณากรอก ชื่อตำแหน่งที่ต้องการ'/>
          <DivButton>
            <ButtonText floated='right' positive>
              <Icon name='checkmark' /> บันทึก
            </ButtonText>
            <ButtonText floated='right'>
              <Icon name='times' /> ยกเลิก
            </ButtonText>
          </DivButton>
        </Form.Field>
      </Form>
    </DivForm>
  </Div>
);