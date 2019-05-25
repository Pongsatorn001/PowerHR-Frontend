import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps , withHandlers , withState , lifecycle} from 'recompose'
import { TextHeader } from '../../components/TextHeader'
import styled from 'styled-components'
import { Form , Button , Icon , Divider , Select , Modal } from 'semantic-ui-react'
import theme from '../../theme/default'
import { Breadcrumb2Page } from '../../components/Breadcrumb'
import axios from 'axios'
import { inject, observer } from 'mobx-react'
import { firebase } from '../../firebase/index'

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
const SizeSelect = styled(Form.Field)`
  font-size : 16px !important;
`

const enhance = compose(
  withLayout,
  inject('authStore'),
  withState("timeBefore" , "setTimeBefore"),
  withState("timeAfter" , "setTimeAfter"),
  withState("list" , "setlist"),
  withState("positions_id" , "setPositions_id"),
  withState('job_position','setJob_position',[]),
  withState("listDepartment" , "setlistDepartment"),
  withState("position" , "setPosition"),
  withState("department" , "setDepartment"),
  withState("position_log_name" , "setPosition_log_name"),
  withState('department_log_name','setDepartment_log_name'),
  withState("value" , "setValue"),
  withState("rate" , "setRate"),
  withState("description" , "setDescription"),
  withState('open' , 'setOpen' , false),
  withState('modal' , 'setModal' , false),
  withState('defaultDepartment' , 'setDefaultDepartment'),
  withState('defaultPosition' , 'setDefaultPosition'),
  withProps({
    pageTitle: 'Add Position'
  }),
  withHandlers({
    initGetJobPositionData: props => () => {
      firebase.database()
      .ref("job_positions_log")
      .orderByChild("job_position_id")
      .equalTo(props.url.query.id)
      .once("value").then( snapshot => {
        let data = Object.values(snapshot.val())
        data.map( result => {
          props.setDefaultDepartment(result.department_id)
          props.setDepartment(result.department_id)
          props.setDefaultPosition(result.position_id)
          props.setPosition(result.position_id)
          props.setValue(result.value)
          props.setRate(result.rate)
          props.setDescription(result.description.split('<br/>').join('\n'))
          props.setTimeBefore(result.startdate)
          props.setTimeAfter(result.enddate)
          props.setPosition_log_name(result.position_name)
          props.setDepartment_log_name(result.department_name)

          firebase.database()
          .ref("positions")
          .orderByChild("department_id")
          .equalTo(result.department_id)
          .once("value").then( snapshot => {
            let data = Object.values(snapshot.val())
            let result = data.map( res => {
              const {
                position_id : key,
                position_name : text,
                position_id : value
              } = res
              return {"key" : key , "text" : text , "value" : value}
            })            
            props.setlist(result)
          })
        })
      })
    },
    initGetDepartmentData: props => () => {
      firebase.database().ref('departments')
      .once("value")
      .then( snapshot => {
        if (snapshot.val()) {
          let data = Object.values(snapshot.val())
          let result = data.map( res => {
            const {
              department_id : key,
              department_name : text,
              department_id : value
            } = res
            return {"key" : key , "text" : text , "value" : value}
          })    
          props.setlistDepartment(result)   
        }
      })
      .catch( err => {
          console.log(err , 'err');
      })
    },
    initGetPositionByDepartmentID: props => (departmentID) => {
      firebase.database()
        .ref("positions")
        .orderByChild("department_id")
        .equalTo(departmentID)
        .once("value").then( snapshot => {
          let data = Object.values(snapshot.val())
          let result = data.map( res => {
            const {
              position_id : key,
              position_name : text,
              position_id : value
            } = res
            return {"key" : key , "text" : text , "value" : value}
          }) 
          props.setlist(result)
        })
    },
    initGetDepartmentNameById: props => (value) => {
      firebase.database()
      .ref("departments")
      .orderByChild("department_id")
      .equalTo(value)
      .once("value").then( snapshot => {
        let data = Object.values(snapshot.val())
        data.map( result => {
          props.setDepartment_log_name(result.department_name)
        })
      })
    },
    initGetPositionNameById: props => (value) => {
      firebase.database()
      .ref("positions")
      .orderByChild("position_id")
      .equalTo(value)
      .once("value").then( snapshot => {
        let data = Object.values(snapshot.val())
        data.map( result => {
          props.setPosition_log_name(result.position_name)
        })
      })
    },
  }),
  lifecycle({
    async componentDidMount(){
      await this.props.initGetJobPositionData()
      await this.props.initGetDepartmentData()
    }
  }),
  withHandlers({
    handleTimerAfter: props => () => event => {
      props.setTimeAfter(event.target.value)
    },
    handleTimerBefore: props => () => event => {
      props.setTimeBefore(event.target.value)
    },
    handleInputDepartmentName: props => () => (event, {value , name}) => { 
      props.initGetDepartmentNameById(value)
      props.initGetPositionByDepartmentID(value)
      props.setDepartment(value)
    },
    handleInputPositionName: props => () => (event, {value}) => {  
      props.initGetPositionNameById(value)
      props.setPosition(value)
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
      if (props.position && props.description && props.department && props.value && props.rate && props.timeAfter && props.timeBefore) {
        let description_data = props.description.split('\n').join("<br/>")
        props.setModal(true)
        props.setOpen(true)
        let result = {
          job_position_id : props.url.query.id,
          department_id : props.department,
          position_id : props.position,
          value : props.value,
          rate : props.rate,
          description : description_data,
          startdate : props.timeBefore,
          enddate : props.timeAfter,
          date : firebase.database.ServerValue.TIMESTAMP,
        }
        firebase.database().ref('job_positions/' + props.url.query.id).update(result);

        let result_log = {
          job_position_id : props.url.query.id,
          department_id : props.department,
          department_name : props.department_log_name,
          position_id : props.position,
          position_name : props.position_log_name,
          value : props.value,
          rate : props.rate,
          description : description_data,
          startdate : props.timeBefore,
          enddate : props.timeAfter,
          date : firebase.database.ServerValue.TIMESTAMP,
        }
        firebase.database().ref('job_positions_log/' + props.url.query.id).update(result_log);
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
                <ButtonAdd positive onClick={() => {javascript:history.back()}}>
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
    {Breadcrumb2Page('ตำแหน่งานที่เปิดรับสมัคร' , 'แก้ไขตำแหน่งงานที่เปิดรับสมัคร' , '/jobPositions/jobPositions')}
    <Divider hidden />
    <Div>
      <center>{TextHeader('แก้ไขตำแหน่งงานที่รับสมัคร')}</center>
      <center>
      <IconLine name="window minimize outline"/>
      </center>
        <SizeForm>
          <Form.Group widths='2'>
          {
            props.defaultDepartment
              ? <SizeSelect
                  control={Select} 
                  label='แผนก :' 
                  options={props.listDepartment} 
                  placeholder='แผนก'
                  onChange={props.handleInputDepartmentName()}
                  style={{ 
                      height: '43px',
                      marginTop: '-5'
                  }}
                  defaultValue={props.defaultDepartment}
                  required
                />
              : null
          }
          {
            props.defaultPosition
              ? <SizeSelect
                  control={Select} 
                  label='ตำแหน่ง :' 
                  options={props.list} 
                  placeholder='ตำแหน่ง'
                  onChange={props.handleInputPositionName()}
                  style={{ 
                      height: '43px',
                      marginTop: '-5'
                  }}
                  defaultValue={props.defaultPosition}
                  required
                />
              : null
          }
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