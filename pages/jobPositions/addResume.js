import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps } from 'recompose'
import { TextHeader } from '../../components/TextHeader'
import styled from 'styled-components'
import { Form , Button , Icon, Accordion, Input, Select , options} from 'semantic-ui-react'
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
  height: 45px !important;
  margin-top: 22px !important;
  width: 30% !important;
  blackground-color: ${theme.colors.ping}
`;

const panels = [
  {
    key: 'details',
    title: 'BlackList',
    content: {
      as: Form.TextArea,
      label: 'รายละเอียด Blacklist :',
      placeholder: 'กรุณาพิมพ์รายละเอียดการติด Blacklist',
    },
  },
];

const DivButton = styled.div`
  padding-top : 20px !important ;
  padding-bottom : 60px !important ;
`;

const ButtonText = styled(Button)`
  font-family : 'Kanit', sans-serif !important;
`;

const HR = styled.hr`
  width: 83% !important;
  margin-top: -2.9% !important;
  margin-left: 17% !important;
`;

const SizeInput = styled(Form.Input)`
  font-size : 16px !important;
`;

const SizeSelect = styled(Form.Select)`
  font-size : 16px !important;
`;

const SizeAccordion = styled(Accordion)`
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
    <center>{TextHeader('เพิ่มประวัติผู้สมัคร ( Resume )')}</center>
    <center>
      <IconLine name="window minimize outline"/>
    </center>
      <SizeForm>
        <Form.Group widths='equal'>
          <SizeInput
            fluid
            id='name'
            label='ชื่อ :'
            placeholder='กรุณาพิมพ์ชื่อ'
          />
          <SizeInput
            fluid
            id='last-name'
            label='นามสกุล :'
            placeholder='กรุณาพิมพ์นามสกุล'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <SizeInput
            fluid
            id='id-card'
            label='เลขบัตรประจำตัวประชาชน :'
            placeholder='กรุณาพิมพ์เลขบัตรประจำตัวประชาชน'
          />
          <SizeInput
            fluid
            id='Rate'
            label='Rate :'
            placeholder='กรุณาพิมพ์ Rate'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <SizeSelect
            fluid
            id='positons'
            label='ตำแหน่ง :'
            placeholder='กรุณาพิมพ์ตำแหน่ง'
          />
          <SizeSelect
            fluid
            id='status'
            label='สถานะ :'
            placeholder='กรุณาพิมพ์สถานะ'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <SizeInput
            type='file' 
            action
            fluid
            id='id-card'
            label='ไฟล์ข้อมูลส่วนตัว ( .PDF ) :'
            placeholder='กรุณาพิมพ์เลขบัตรประจำตัวประชาชน'>
            <input />
            <Button type='file'>เลือกไฟล์</Button>
          </SizeInput>
        </Form.Group>
        <SizeAccordion  panels={panels} /> <HR/>
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