import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps , withState , withHandlers} from 'recompose'
import { TextHeader } from '../../components/TextHeader'
import styled from 'styled-components'
import { Form , Button , Icon, Accordion, Divider } from 'semantic-ui-react'
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
  width: 58% !important;
  margin-left: 21% !important;
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
  withState('list','setList',[{id: '001', file: 'https://www.mogen.co.th/imgadmins/resume/20180226150849.pdf', name: 'พงศธร', lastName: 'จันด้วง', rate: '20000', status: 'รอการสัมภาษณ์' , idcard: '1-2855-55211-51-4'},{id: '002', file: 'https://www.mogen.co.th/imgadmins/resume/20180226150849.pdf', name: 'กิตปกรณ์', lastName: 'ทองเงิน', rate: '30000', status: 'ผ่านการสัมภาษณ์' , idcard: '1-2855-55211-51-4'}]),
  withState('jobPositions' , 'setjobPositions' , [{ key: 'Fontend Developer', text: 'Fontend Developer', value: 'Fontend Developer' }, { key: 'Backend Developer', text: 'Backend Developer', value: 'Backend Developer' } , { key: 'Design UX/UI', text: 'Design UX/UI', value: 'Design UX/UI' }]),
  withState('option','setOption',[{ key: 'w', text: 'รอการสัมภาษณ์', value: 'waiting ' }, { key: 'p', text: 'ผ่านการสัมภาษณ์', value: 'past' } , { key: 'n', text: 'ไม่ผ่านการสัมภาษณ์', value: 'noPast' }]),
  withProps({
    pageTitle: 'Add Position'
  }),
  withLayout
)
  
export default enhance((props) => 
  <div>
    {Breadcrumb2Page('ตำแหน่งานที่เปิดรับสมัคร' , 'แก้ไขตำแหน่งงานที่เปิดรับสมัคร' , '/resume/resume')}
    <Divider hidden />
    <Div>
      <center>{TextHeader('แก้ไขประวัติผู้สมัคร ( Resume )')}</center>
      <center>
        <IconLine name="window minimize outline"/>
      </center>
      {props.list.map( (data , i) => {
        if (data.id === props.url.query.id) {
          return(
            <SizeForm>
              <Form.Group widths='equal'>
                <SizeInput
                  fluid
                  id='name'
                  label='ชื่อ :'
                  placeholder='กรุณาพิมพ์ชื่อ'
                  defaultValue={data.name}
                />
                <SizeInput
                  fluid
                  id='last-name'
                  label='นามสกุล :'
                  placeholder='กรุณาพิมพ์นามสกุล'
                  defaultValue={data.lastName}
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <SizeInput
                  fluid
                  id='id-card'
                  label='เลขบัตรประจำตัวประชาชน :'
                  placeholder='กรุณาพิมพ์เลขบัตรประจำตัวประชาชน'
                  defaultValue={data.idcard}
                />
                <SizeInput
                  fluid
                  id='Rate'
                  label='Rate :'
                  placeholder='กรุณาพิมพ์ Rate'
                  defaultValue={data.rate}
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <SizeSelect
                  fluid
                  id='positons'
                  label='ตำแหน่ง :'
                  options={props.jobPositions}
                  placeholder='เลือกตำแหน่ง'
                  defaultValue={props.jobPositions[0].value}
                />
                <SizeSelect
                  fluid
                  id='status'
                  label='สถานะ :'
                  options={props.option}
                  placeholder='เลือกสถานะ'
                  defaultValue={props.option[0].value}
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <SizeInput
                  type='file'
                  id='id-card'
                  label='ไฟล์ข้อมูลส่วนตัว ( .PDF ) :'
                  placeholder='กรุณาเลือกไฟล์ประวัติผู้สมัคร'>
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
          )
        }        
      })}
    </Div>
  </div>
);