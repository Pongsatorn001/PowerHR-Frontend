import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps , withState , withHandlers } from 'recompose'
import { TextHeader } from '../../components/TextHeader'
import styled from 'styled-components'
import { Form , Button , Icon, Accordion, Divider , Input, Select , options, Label} from 'semantic-ui-react'
import theme from '../../theme/default'
import { Breadcrumb2Page } from '../../components/Breadcrumb'


const Div = styled.div `
  position : relative ;
  background : ${theme.colors.elementBackground};
  box-shadow : ${theme.colors.boxShadow} ;
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

const DivButton = styled.div`
  padding-top : 20px !important ;
  padding-bottom : 60px !important ;
`;

const ButtonText = styled(Button)`
  font-family : 'Kanit', sans-serif !important;
`;

const HR = styled.hr`
  width: 84.5% !important;
  margin-top: -2.5% !important;
  margin-left: 15% !important;
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
  withLayout,
  withState('list' , 'setlist' , [{ key: 'fd', text: 'Fontend Developer', value: 'Fontend Developer ' }, { key: 'Backend Developer', text: 'Backend Developer', value: 'Backend Developer' } , { key: 'Design UX/UI', text: 'Design UX/UI', value: 'Design UX/UI' }]),
  withState('option','setOption',[{ key: 'w', text: 'รอการสัมภาษณ์', value: 'waiting ' }, { key: 'p', text: 'ผ่านการสัมภาษณ์', value: 'past' } , { key: 'n', text: 'ไม่ผ่านการสัมภาษณ์', value: 'noPast' }]),
)
  
export default enhance((props) => 
  <div>
    {Breadcrumb2Page('ประวัติผู้สมัคร' , 'เพิ่มข้อมูลประวัติผู้สมัคร' , '/resume/resume')}
    <Divider hidden />
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
              maxlength={10}
              type='number'
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
            <SizeInput
              fluid
              id='positons'
              label='ตำแหน่ง :'
              placeholder='เลือกตำแหน่ง'
              defaultValue={props.url.query.position}
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
              id="file" 
              type="file"
              label='ไฟล์ประวัติผู้สมัคร :'
              placeholder='กรุณาเลือกไฟล์ประวัติผู้สมัคร'
            />

            {/* <label for="file" class="ui icon button" >
              เลือกไฟล์
            </label> */}
            
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
  </div>
);