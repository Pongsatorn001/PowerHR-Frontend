import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps } from 'recompose'
import { TextHeader } from '../../components/TextHeader'
import styled from 'styled-components'
import { Form , Input , Button , Icon, Container} from 'semantic-ui-react'
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
  width: 50% !important;
  margin-left: 25% !important;
`;

const BtnSelectFile = styled(Button)`
  height: 39px !important;
  margin-top: 22px !important;
  width: 30% !important;
  blackground-color: ${theme.colors.ping}
`;

const enhance = compose(
  withProps({
    pageTitle: 'Add Position'
  }),
  withLayout
)
  
export default enhance(() => 
  <Div>
    <center>{TextHeader('เพิ่มตำแหน่งงานที่เปิดรับสมัคร')}</center>
    <center>
      <IconLine name="window minimize outline"/>
    </center>
      <SizeForm>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            id='name'
            label='ชื่อ :'
            placeholder='กรุณาพิมพ์ชื่อ'
          />
          <Form.Input
            fluid
            id='last-name'
            label='นามสกุล :'
            placeholder='กรุณาพิมพ์นามสกุล'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            id='id-card'
            label='เลขบัตรประจำตัวประชาชน :'
            placeholder='กรุณาพิมพ์เลขบัตรประจำตัวประชาชน'
          />
          <Form.Input
            fluid
            id='Rate'
            label='Rate'
            placeholder='กรุณาพิมพ์ Rate'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            id='positons'
            label='ตำแหน่ง'
            placeholder='กรุณาพิมพ์ตำแหน่ง'
          />
          <Form.Input
            fluid
            id='status'
            label='สถานะ'
            placeholder='กรุณาพิมพ์สถานะ'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            id='file'
            label='ไฟล์ประวัติส่วนตัว'
            placeholder='กรุณาเลือกไฟล์ไฟล์ประวัติส่วนตัว'
          />
          <BtnSelectFile size='small'>
            <Button.Content visible>เลือกไฟล์</Button.Content>
          </BtnSelectFile>
        </Form.Group>
      </SizeForm>
  </Div>
);