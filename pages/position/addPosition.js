import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps } from 'recompose'
import { TextHeader } from '../../components/TextHeader'
import styled from 'styled-components'
import { Form , Input , Button , Icon} from 'semantic-ui-react'
import { Breadcrumb2Page } from '../../components/Breadcrumb'


const Div = styled.div `
  position : relative ;
  background : rgb(255, 255, 255);
  box-shadow : rgb(204, 204, 204) 0px 1px 2px;
  margin-right : 13px;
  margin-top : 20px ;
`

const DivButton = styled.div`
  padding-top : 20px !important ;
  padding-bottom : 60px !important ;
`
const ButtonText = styled(Button)`
  font-family : 'Kanit', sans-serif !important;
`
const IconLine = styled(Icon)`
  font-size: 35px !important;
`;

const SizeInput = styled(Form.Input)`
  font-size : 16px !important;
`;

const SizeForm = styled(Form)`
  width: 70% !important;
  margin-left: 15% !important;
`;

const enhance = compose(
  withProps({
    pageTitle: 'Add Position'
  }),
  withLayout
)
  
export default enhance(() => 
  <div>
    {Breadcrumb2Page('ตำแหน่งงานในบริษัท' , 'เพิ่มตำแหน่งงานในบริษัท' , '/position/position')}
    <Div>
      <center>{TextHeader('เพิ่มตำแหน่งงานในบริษัท')}</center>
      <center>
        <IconLine name="window minimize outline"/>
      </center>
      <div>
        <SizeForm>
          <Form.Field>
            <SizeInput
                fluid
                id='namePositions'
                label='ชื่อตำแหน่งที่ต้องการเพิ่ม :'
                placeholder='กรุณากรอก ชื่อตำแหน่งที่ต้องการ'
              />
            <DivButton>
              <ButtonText floated='right' positive>
                <Icon name='checkmark' /> บันทึก
              </ButtonText>
              <ButtonText floated='right' href="javascript:history.back()">
                <Icon name='times' /> ยกเลิก
              </ButtonText>
            </DivButton>
          </Form.Field>
        </SizeForm>
      </div>
    </Div>
  </div>
);