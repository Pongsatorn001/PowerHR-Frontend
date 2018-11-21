import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps } from 'recompose'
import { TextHeader } from '../../components/TextHeader'
import styled from 'styled-components'
import { Form , Button , Icon } from 'semantic-ui-react'
import theme from '../../theme/default'


const Div = styled.div `
  position : relative ;
  background : rgb(255, 255, 255);
  box-shadow : rgb(204, 204, 204) 0px 1px 2px;
  margin-right : 13px;
`;

const IconLine = styled(Icon)`
  font-size: 35px !important;
`;

const SizeForm = styled(Form)`
  width: 70% !important;
  margin-left: 15% !important;
`;

const DivButton = styled.div`
  padding-top : 20px !important ;
  padding-bottom : 60px !important ;
`;

const ButtonText = styled(Button)`
  font-family : 'Kanit', sans-serif !important;
`;

const SizeInput = styled(Form.Input)`
  font-size : 16px !important;
`;

const enhance = compose(
  withProps({
    pageTitle: 'Add Position'
  }),
  withLayout
)
  
export default enhance(() => 
  <Div>
    <center>{TextHeader('เพิ่มตำแหน่งงานที่รับสมัคร ( Job Positions )')}</center>
    <center>
      <IconLine name="window minimize outline"/>
    </center>
      <SizeForm>
        <Form.Group widths='equal'>
          <SizeInput
            fluid
            id='nameJobPositions'
            label='ชื่อตำแหน่งงานที่เปิดรับสมัคร :'
            placeholder='กรุณาพิมพ์ชื่อตำแหน่งงานที่เปิดรับสมัคร'
          />
        </Form.Group>
        <DivButton>
            <ButtonText floated='right' positive>
              <Icon name='checkmark' /> บันทึก
            </ButtonText>
            <ButtonText floated='right'>
              <Icon name='times' /> ยกเลิก
            </ButtonText>
        </DivButton>
      </SizeForm>
  </Div>
);