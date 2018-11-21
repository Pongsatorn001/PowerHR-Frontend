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
  margin-left : 30%  !important ;
  margin-right : 30%  !important ;
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
    pageTitle: 'Edit Position'
  }),
  withLayout
)
  
export default enhance((props) => 
  <Div>
    <center>{TextHeader('Edit Positions ( แก้ไขตำแหน่ง )')}</center>
    <DivForm>
      <Form>
        <Form.Field>
          <label>ชื่อตำแหน่งที่ต้องการแก้ไข : </label>
          <Input placeholder='กรุณากรอก ชื่อตำแหน่งที่ต้องการ' value={props.url.query.name}/>
          <DivButton>
            <ButtonText floated='right' positive>
              <Icon name='checkmark' /> บันทึก
            </ButtonText>
            <ButtonText floated='right' href="javascript:history.back()">
              <Icon name='times' /> ยกเลิก
            </ButtonText>
          </DivButton>
        </Form.Field>
      </Form>
    </DivForm>
  </Div>
);