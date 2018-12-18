import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps , withHandlers , withState , lifecycle} from 'recompose'
import { TextHeader } from '../../components/TextHeader'
import styled from 'styled-components'
import { Form , Button , Icon , Divider , Input } from 'semantic-ui-react'
import theme from '../../theme/default'
import { Breadcrumb2Page } from '../../components/Breadcrumb'
import axios from 'axios'

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
const FormTextArea = styled(Form.TextArea)`
  font-size : 16px !important;
`

const enhance = compose(
  withState("timeBefore" , "setTimeBefore"),
  withState("timeAfter" , "setTimeAfter"),
  withState("list" , "setlist"),
  withState("position" , "setPosition"),
  withProps({
    pageTitle: 'Add Position'
  }),
  withLayout,
  lifecycle({
    async componentDidMount(){
      //get data in api
      const url = 'http://localhost:4000/positions'
      const res =  await axios.get(url)
      this.props.setlist(res.data)
      
      //set datepicker
      const time = new Date();
      const date = time.getDate()
      const month = time.getMonth()+1
      const year = time.getFullYear()
      this.props.setTimeBefore(year + "-" + month + "-" + date)
    }
  }),
  withHandlers({
    handleTimer: props => () => event => {
      props.setTimeAfter(event.target.value)
    },
    handleInputPosition: props => () => {
      if (props.list === undefined) {
        return null
      }
      else{
        let result = props.list.map( data => {
          return( <option value={data.position_name} key={data.id} />)
        })
        return result
      }
    },
    handleInputPosition: props => () => event => {  
      console.log(event.target.value);
      // props.setPosition(event.target.value)
    }
  })
)

export default enhance((props) => 
  <div>
    {Breadcrumb2Page('ตำแหน่งานที่เปิดรับสมัคร' , 'เพิ่มตำแหน่งงานที่เปิดรับสมัคร' , '/jobPositions/jobPositions')}
    <Divider hidden />
    <Div>
      <center>{TextHeader('เพิ่มตำแหน่งงานที่รับสมัคร')}</center>
      <center>
        <IconLine name="window minimize outline"/>
      </center>
        <SizeForm>
          <Form.Group widths='equal'>
            <SizeInput
              fluid
              control={Input}
              id='nameJobPositions'
              label='ตำแหน่งที่เปิดรับสมัคร :'
              placeholder='กรุณาระบุตำแหน่งที่เปิดรับ'
              name="position_name"
              list="position_name"
              required
              autoFocus
              onKeyUp={props.handleInputPosition()}
            />
            <datalist id="position_name">
              {props.handleInputPosition()}
            </datalist>
            <SizeInput
              fluid
              id='nameJobPositions'
              label='จำนวนที่เปิดรับสมัคร :'
              placeholder='กรุณาระบุจำนวนที่เปิดรับ'
              type="number"
              required
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <SizeInput
              fluid
              id='nameJobPositions'
              label='วันที่เปิดการรับสมัคร :'
              type="date"
              min={props.timeBefore}
              onChange={props.handleTimer()}
              required
            />
            <SizeInput
              fluid
              id='nameJobPositions'
              label='วันที่ปิดการรับสมัคร :'
              type="date"
              min={props.timeAfter}
              required
            />
          </Form.Group>
          <FormTextArea 
            label='รายละเอียดตำแหน่งงาน :' 
            placeholder='กรุณาระบุรายละเอียดของตำแหน่งงาน ( ตัวอย่าง 1. พัฒนา website ด้วย React ) '
            required 
          />
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