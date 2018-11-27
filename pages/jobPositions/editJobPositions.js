import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps , withState , withHandlers } from 'recompose'
import { TextHeader } from '../../components/TextHeader'
import styled from 'styled-components'
import { Form , Button , Icon , Divider } from 'semantic-ui-react'
import theme from '../../theme/default'
import { Breadcrumb2Page } from '../../components/Breadcrumb'

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
  withState('open' , 'setOpen' , false),
  withProps({
    pageTitle: 'Add Position'
  }),
  withLayout,
  withHandlers({
    handleModalOpen: props => () => event => {
      props.setOpen(true)
    },
    handleModalClose: props => () => event => {
        props.setOpen(false)
    },
    handleDeleteBlacklist: props => () => event => {
        props.setOpen(false)
    }
  })
)

export default enhance((props) => 
  <div>
    {Breadcrumb2Page('ตำแหน่งานที่เปิดรับสมัคร' , 'แก้ไขตำแหน่งงานที่เปิดรับสมัคร' , '/jobPositions/jobPositions')}
    <Divider hidden />
    <Div>
      <center>{TextHeader('แก้ไขตำแหน่งงานที่รับสมัคร')}</center>
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
              value={props.url.query.nameJobPositions}
            />
            <SizeInput
              fluid
              type='number'
              id='nameJobPositions'
              label='จำนวนที่เปิดรับ :'
              placeholder='กรุณาพิมพ์จำนวนที่เปิดรับ'
              value={props.url.query.ReceivingNumber}
            />
          </Form.Group>
          <DivButton>
              <ButtonText floated='right' positive>
                <Icon name='checkmark' /> บันทึก
              </ButtonText>
              <ButtonText floated='right' href="javascript:history.back()">
                <Icon name='times' /> ยกเลิก
              </ButtonText>
          </DivButton>
        </SizeForm>
    </Div>
  </div>
);