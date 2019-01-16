import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps , withHandlers , withState , lifecycle} from 'recompose'
import { TextHeader } from '../../components/TextHeader'
import styled from 'styled-components'
import { Form , Button , Icon , Divider , Input , Modal } from 'semantic-ui-react'
import theme from '../../theme/default'
import { Breadcrumb2Page } from '../../components/Breadcrumb'
import axios from 'axios'

const Div = styled.div `
  position : relative ;
  background : rgb(255, 255, 255);
  box-shadow : rgb(204, 204, 204) 0px 1px 2px;
  margin-right : 13px;
`;
const IconModal = styled(Icon)`
  font-size: 55px !important;
`;
const Panal = styled.p`
  font-size: 18px !important;
`
const ButtonAdd = styled(Button)`
  font-family : 'Kanit', sans-serif !important;
`
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
  withState("positions_id" , "setPositions_id"),
  withState("checklist" , "setChecklist"),
  withState('job_position','setJob_position',[]),
  withState("listDepartment" , "setlistDepartment"),
  withState("position" , "setPosition"),
  withState("department" , "setDepartment"),
  withState("value" , "setValue"),
  withState("rate" , "setRate"),
  withState("description" , "setDescription"),
  withState('open' , 'setOpen' , false),
  withState('modal' , 'setModal' , false),
  withState('defaultTime' , 'setDefaultTime'),
  withState('defaultName' , 'setDefaultName'),
  withState('defaultDepartment' , 'setDefaultDepartment'),
  withState('defaultPosition' , 'setDefaultPosition'),
  withState('defaultList' , 'setDefaultList'),
  withProps({
    pageTitle: 'Add Position'
  }),
  withLayout,
  lifecycle({
    async componentDidMount(){
      //get data in api position
      const url = 'http://localhost:4000/positions'
      const res =  await axios.get(url)
      this.props.setlist(res.data)
      
      const urlGetByID = `http://localhost:4000/job_position/${this.props.url.query.id}`
      const resJobData =  await axios.get(urlGetByID)
      this.props.setRate(resJobData.data[0].rate)
      this.props.setValue(resJobData.data[0].value)
      this.props.setDepartment(resJobData.data[0].department_name)
      this.props.setPosition(resJobData.data[0].position_name)
      this.props.setTimeBefore(resJobData.data[0].startdate)
      this.props.setTimeAfter(resJobData.data[0].enddate)
      this.props.setDescription(resJobData.data[0].description.split('<br/>').join('\n'))
      this.props.setPositions_id(resJobData.data[0].positions_id)      
      
      let check = []
      res.data.map( data => {
        check.push(data.position_name)
      })
      
      this.props.setChecklist(check)
      
      //get data in position and jobposition api
      const urlJob_position = 'http://localhost:4000/joinPosition'
      const resJobposition = await axios.get(urlJob_position)
      let data = []
      let id_position = []
      resJobposition.data.map( response => {
        data.push(response.position_name)

      })
      this.props.setJob_position(data)
      
      // get data in department api
      const urlDepartment = 'http://localhost:4000/departments'
      const resDepartment = await axios.get(urlDepartment)
      this.props.setlistDepartment(resDepartment.data)
          
    }
  }),
  withHandlers({
    handleTimerAfter: props => () => event => {
      props.setTimeAfter(event.target.value)
    },
    handleTimerBefore: props => () => event => {
      props.setTimeBefore(event.target.value)
    },
    handleInputPosition: props => () => {      
      if (props.list === undefined) {
        return null
      }
      else{
        let result = props.list.map( data => {
          return( <option value={data.position_name} key={data.positions_id} />)
        })
        return result
      }
    },
    handleInputDepartment: props => () => {
      if (props.listDepartment === undefined) {
        return null
      }
      else{
        let result = props.listDepartment.map( data => {
          return( <option value={data.department_name} key={data.id} />)
        })
        return result
      }
    },
    handleInputDepartmentName: props => () => event => {  
      props.setDepartment(event.target.value)
      props.setDefaultDepartment(event.target.value)
      if (event.keyCode === 8) {
        props.setDefaultPosition(undefined)
        const url = 'http://localhost:4000/positions'
        axios.get(url)
        .then( res => {
          props.setlist(res.data)
        })
        .catch( err => {
          console.log(err);
        })
      }
      else{
        const url = `http://localhost:4000/showDataPositionInDepartment/${event.target.value}`
        axios.get(url)
        .then( res => {
          props.setlist(res.data)
        })
        .catch( err => {
          console.log(err);
        })
      }
    },
    handleInputPositionName: props => () => event => {  
      let { list } = props      
      props.setPosition(event.target.value)
      if (event.keyCode === 8) {        
        props.setDefaultDepartment(undefined)
      }
      else{
        list.map( data => {
          if (data.position_name === event.target.value) {
            props.setPositions_id(data.positions_id)
            const url = `http://localhost:4000/positions/${data.positions_id}`
            axios.get(url)
            .then( res => {
              props.setDefaultDepartment(res.data[0].department_name)
            })
            .catch( err => {
              console.log(err);
            })
          }
          else{
            return null
          }
        })
      }
    },
    handleInputValue: props => () => event => {  
      props.setValue(event.target.value)
    },
    handleInputDescription: props => () => event => { 
      props.setDescription(event.target.value)
    },
    handleInputRate: props => () => event => { 
      props.setRate(event.target.value)
    },
    handleSaveData: props => () => event => {
      let have = props.checklist.indexOf(props.position)  
      let description_data = props.description.split('\n').join("<br/>")
      
      if (have !== -1) {
        props.setModal(true)
        props.setOpen(true)
        props.setDefaultName(props.positions_id)
        const url = `http://localhost:4000/job_position/${props.url.query.id}`
        axios.put(url , {
          positions_id : props.positions_id,
          description : description_data,
          value : props.value,
          startdate : props.timeBefore,
          enddate : props.timeAfter,
          rate : props.rate
        })
        .then( res => {
          setTimeout(() => {
            history.back()
          }, 2000);
        })
        .catch( err => {
          console.log(err);
        })
      }
      else{
        props.setOpen(true)
      }
    },
    handleModalOpen: props => () => event => {
      props.setOpen(false)
    },
    handleModalShow: props => (setModal) => {      
      if(props.modal === false && props.open === true){
        return(
          <Modal 
            size="tiny"
            open={props.open}
            dimmer="blurring"
          >
            <Modal.Content>
              <center>
                <IconModal name="info circle"/><br/><br/>
                <Panal>
                  ไม่สามารถแก้ไขตำแหน่งงานที่เปิดรับได้<br/>
                  เนื่องจากข้อมูลไม่ถูกต้อง <br/>กรุณากรอกชื่อตำแหน่งงานที่เปิดรับใหม่อีกครั้ง !!
                </Panal>
                <ButtonAdd color='youtube' onClick={setModal}>
                    <Icon name='close' /> ปิด
                </ButtonAdd>
              </center>
            </Modal.Content>
          </Modal>
        )
      }
      else{
        return(
          <Modal 
            size="tiny"
            open={props.open}
            dimmer="blurring"
          >
            <Modal.Content>
              <center>
                <IconModal name="info circle"/><br/><br/>
                <Panal>
                  แก้ไขตำแหน่งงานที่เปิดรับสำเร็จ<br/>
                </Panal>
                <ButtonAdd positive onClick={setModal}>
                    <Icon name='checkmark' /> ตกลง
                </ButtonAdd>
              </center>
            </Modal.Content>
          </Modal>
        )
      }
    }
  })
)

export default enhance((props) => 
  <div>
    {Breadcrumb2Page('ตำแหน่งานที่เปิดรับสมัคร' , 'เพิ่มตำแหน่งงานที่เปิดรับสมัคร' , '/jobPositions/jobPositions')}
    <Divider hidden />
    <Div>
      <center>{TextHeader('แก้ไขตำแหน่งงานที่รับสมัคร')}</center>
      <center>
      <IconLine name="window minimize outline"/>
      </center>
        <SizeForm>
          <Form.Group widths='2'>
            <SizeInput
              fluid
              control={Input}
              id='nameJobPositions'
              label='แผนกที่เปิดรับสมัคร :'
              placeholder='กรุณาระบุแผนกที่เปิดรับสมัคร'
              name="department_name"
              list="department_name"
              required
              autoFocus
              defaultValue={props.department}
              onKeyUp={props.handleInputDepartmentName()}
            />
            <datalist id="department_name">
              {props.handleInputDepartment()}
            </datalist>
            <SizeInput
              fluid
              control={Input}
              id='position_name'
              label='ตำแหน่งที่เปิดรับสมัคร :'
              placeholder='กรุณาระบุตำแหน่งที่เปิดรับ'
              name="position_name"
              list="data"
              required
              defaultValue={props.position}
              onKeyUp={props.handleInputPositionName()}
            />
            <datalist id="data">
              {props.handleInputPosition()}
            </datalist>
          </Form.Group>
          <Form.Group widths='equal'>
            <SizeInput
              fluid
              id='nameJobPositions'
              label='จำนวนที่เปิดรับสมัคร :'
              placeholder='กรุณาระบุจำนวนที่เปิดรับ'
              onKeyUp={props.handleInputValue()}
              type="number"
              defaultValue={props.value}
              required
            />
            <SizeInput
              fluid
              id='nameJobPositions'
              label='ค่าตอบแทน :'
              placeholder='กรุณาระบุจำนวนค่าตอบแทน'
              onKeyUp={props.handleInputRate()}
              type="text"
              defaultValue={props.rate}
              required
            />
          </Form.Group>
          {props.handleModalShow(props.handleModalOpen())}
          <Form.Group widths='equal'>
            <SizeInput
              fluid
              id='nameJobPositions'
              label='วันที่เปิดการรับสมัคร :'
              type="date"
              value={props.timeBefore}
              onChange={props.handleTimerBefore()}
              required
            />
            <SizeInput
              fluid
              id='nameJobPositions'
              label='วันที่ปิดการรับสมัคร :'
              type="date"
              value={props.timeAfter}
              onChange={props.handleTimerAfter()}
              required
            />
          </Form.Group>
          <FormTextArea 
            label='รายละเอียดตำแหน่งงาน :' 
            placeholder='กรุณาระบุรายละเอียดของตำแหน่งงาน ( ตัวอย่าง 1. พัฒนา website ด้วย React ) '
            onChange={props.handleInputDescription()}
            required 
            value={props.description}
          />
          <DivButton>
              <ButtonText floated='right' positive onClick={props.handleSaveData()}>
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