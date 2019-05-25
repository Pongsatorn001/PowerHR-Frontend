import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps, withState , lifecycle , withHandlers } from 'recompose'
import { TextHeader } from '../../components/TextHeader'
import styled from 'styled-components'
import { Form , Button , Icon , Modal } from 'semantic-ui-react'
import { Breadcrumb2Page } from '../../components/Breadcrumb'
import axios from 'axios'
import { inject, observer } from 'mobx-react'
import { firebase } from '../../firebase/index'

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
const IconModal = styled(Icon)`
  font-size: 55px !important;
`
const Panal = styled.p`
  font-size: 18px !important;
`
const ButtonAdd = styled(Button)`
  font-family : 'Kanit', sans-serif !important;
`
const IconLine = styled(Icon)`
  font-size: 35px !important;
`
const SizeInput = styled(Form.Input)`
  font-size : 16px !important;
`
const InputDisable = styled(Form.Input)`
  font-size : 16px !important;
  cursor: not-allowed;
  input {
    background: #efeeee !important;
    pointer-events: none;
  }
`
const SizeForm = styled(Form)`
  width: 70% !important;
  margin-left: 15% !important;
`

const enhance = compose(
  withLayout,
  inject('authStore'),
  withState('position_name' , 'setPosition_Name'),
  withState('position_id' , 'setPosition_id'),
  withState('department_id' , 'setDepartment_id'),
  withState('departmentName' , 'setDepartmentName'),
  withState('all_position_name' , 'setAll_Position_name'),
  withState('defaultData' ,'setDefaultData'),
  withState('open' , 'setOpen' , false),
  withState('modal' , 'setModal' , false),
  withProps({
    pageTitle: 'Edit Position'
  }),
  withHandlers({
    initGetDepartmentData: props => () => {
      firebase.database().ref("positions/" + props.url.query.id)
      .once("value").then( snapshot => {
        let result = Object.assign(snapshot.val())
        props.setPosition_Name(result.position_name)
        props.setDefaultData(result.position_name)
        props.setPosition_id(result.position_id)
        props.setDepartment_id(result.department_id)
        firebase.database().ref("departments/" + result.department_id)
        .once("value").then( data => {
          let name = Object.assign(data.val())
          props.setDepartmentName(name.department_name)       
        })
      })
    }
  }),
  lifecycle({
    async componentDidMount(){
      await this.props.initGetDepartmentData()
    }
  }),
  withHandlers({
    handleSavePositionName : props => (id) => event => {
      console.log(props.position_name);
      if (props.position_name) {
        firebase.database()
        .ref("positions")
        .orderByChild("position_name")
        .equalTo(props.position_name)
        .once("value").then( snapshot => {
          if (snapshot.val()) {
            let result = Object.values(snapshot.val())
            result.map( data => { 
              if (data.department_id === props.url.query.id && props.position_name === props.defaultData) {
                props.setOpen(true)
                props.setModal(true)
              }
              if (data.department_id === props.url.query.id && props.position_name !== props.defaultData) {
                props.setOpen(true)
                props.setModal(false)
              }
              else{
                props.setModal(true)
                props.setOpen(true)
                let result = {
                  department_id : props.department_id,
                  date : firebase.database.ServerValue.TIMESTAMP,
                  position_id : props.position_id,
                  position_name : props.position_name
                }
                firebase.database().ref('positions/' + props.position_id).update(result)
              }
            })
          }
          else{
            props.setModal(true)
            props.setOpen(true)
            let result = {
              department_id : props.department_id,
              date : firebase.database.ServerValue.TIMESTAMP,
              position_id : props.position_id,
              position_name : props.position_name
            }
            firebase.database().ref('positions/' + props.position_id).update(result)
          }
        })
      }
      else{
        props.setOpen(true)
      }
    },
    handleInputData: props => () => event => {
      console.log(event.target.value);
      props.setPosition_Name(event.target.value)      
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
                    ไม่สามารถแก้ไขตำแหน่ง {props.position_name} ได้<br/>
                    เนื่องจากมีข้อมูลอยู่ในระบบแล้วหรือข้อมูลไม่ถูกต้อง <br/>กรุณากรอกชื่อตำแหน่งใหม่อีกครั้ง !!
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
                    แก้ไขตำแหน่ง {props.position_name} สำเร็จ<br/>
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
    {Breadcrumb2Page('ตำแหน่งงานในบริษัท' , 'แก้ไขตำแหน่งงานในบริษัท' , 'javascript:history.back()')}
    <Div>
      <center>{TextHeader('แก้ไขตำแหน่งในบริษัท')}</center>
      <center>
        <IconLine name="window minimize outline"/>
      </center>
      <div>
        <SizeForm>
          <Form.Group widths='equal'>
            <InputDisable
              fluid
              id='nameDepartment'
              label='ชื่อแผนกที่ต้องการเพิ่ม :'
              value={props.departmentName}
            />
            <SizeInput
              fluid
              id='namePositions'
              label='ชื่อตำแหน่งที่ต้องการแก้ไข :'
              placeholder='กรุณากรอก ชื่อตำแหน่งที่ต้องการ'
              value={props.position_name}
              onChange={props.handleInputData()}
              autoFocus
            />
          </Form.Group>
          {props.handleModalShow(props.handleModalOpen())}
          <DivButton>
            <ButtonText floated='right' positive onClick={props.handleSavePositionName(props.url.query.id)}>
              <Icon name='checkmark' /> บันทึก
            </ButtonText>
            <ButtonText floated='right' href="javascript:history.back()">
              <Icon name='times' /> ยกเลิก
            </ButtonText>
          </DivButton>
        </SizeForm>
      </div>
    </Div>
  </div>
);