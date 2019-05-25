import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps , withHandlers ,withState , lifecycle } from 'recompose'
import { TextHeader } from '../../components/TextHeader'
import styled from 'styled-components'
import { Form , Button , Icon , Modal , Select } from 'semantic-ui-react'
import { Breadcrumb2Page } from '../../components/Breadcrumb'
import { inject, observer } from 'mobx-react'

const options = [
    { key: 'Admin', text: 'Admin', value: 'Admin' },
    { key: 'Leader', text: 'Leader', value: 'Leader' },
]

const Div = styled.div `
  position : relative ;
  background : rgb(255, 255, 255);
  box-shadow : rgb(204, 204, 204) 0px 1px 2px;
  margin-right : 13px;
  margin-top : 20px ;
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
const DivButton = styled.div`
  padding-top : 20px !important ;
  padding-bottom : 60px !important ;
`
const ButtonText = styled(Button)`
  font-family : 'Kanit', sans-serif !important;
`
const IconLine = styled(Icon)`
  font-size: 35px !important;
`
const SizeInput = styled(Form.Input)`
  font-size : 16px !important;
`
const SizeSelect = styled(Form.Field)`
  font-size : 16px !important;
`
const SizeForm = styled(Form)`
  width: 70% !important;
  margin-left: 15% !important;
`

const enhance = compose(
  withLayout,
  inject('authStore'),
  withState('name' , 'setName'),
  withState('email' , 'setEmail'),
  withState('password' , 'setPassword'),
  withState('role' ,'setRole'),
  withState('open' , 'setOpen' , false),
  withState('modal' , 'setModal' , false),
  withState('messageLog' , 'setMessageLog'),
  withProps({
    pageTitle: 'Edit Users'
  }),
  lifecycle({
    async componentDidMount(){
      
    }
  }),
  withHandlers({
    handleSetName: props => () => event => {
        props.setName(event.target.value)
    },
    handleSetEmail: props => () => event => {
        props.setEmail(event.target.value)
    },
    handleSetPassword: props => () => event => {
        props.setPassword(event.target.value)
    },
    handleSetRole: props => () => (event, {value}) => {
        props.setRole(value)
        
    },
    handleSavePosition: props => async() => {
        if (props.name && props.email && props.password && props.role) {
            await props.authStore.createUser(props)
        }
        else{
            props.setOpen(true)
            props.setMessageLog('กรุณากรอกข้อมูลให้ครบถ้วน !')
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
                    {props.messageLog}
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
                เพิ่มผู้ใช้งาน {props.name} สำเร็จ<br/>
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
  }),
  observer
)
  
export default enhance((props) => 
  <div>
    {Breadcrumb2Page('รายชื่อผู้ใช้งานในระบบ' , 'เพิ่มผู้ใช้งานในระบบ' , `/user/user?id=${props.url.query.data}`)}
    <Div>
      <center>{TextHeader('เพิ่มผู้ใช้งานในระบบ')}</center>
      <center>
        <IconLine name="window minimize outline"/>
      </center><br/>
      <div>
        <SizeForm>
          <Form.Group widths='equal'>
            <SizeInput
              fluid
              id='namePositions'
              label='ชื่อผู้ใช้งาน :'
              placeholder='กรุณากรอก ชื่อผู้ใช้งานที่ต้องการเพิ่ม'
              onChange={props.handleSetName()}
              autoFocus
            />
            <SizeInput
              fluid
              id='namePositions'
              label='อีเมล :'
              placeholder='กรุณากรอก อีเมลของผู้ใช้งานที่ต้องการเพิ่ม'
              onChange={props.handleSetEmail()}
              type="email"
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <SizeInput
              fluid
              id='namePositions'
              label='รหัสผ่าน :'
              placeholder='กรุณากรอก รหัสผ่าน'
              onChange={props.handleSetPassword()}
              type='password'
            />
            <SizeSelect 
                control={Select} 
                label='ตำแหน่ง :' 
                options={options} 
                placeholder='ตำแหน่ง'
                onChange={props.handleSetRole()}
                style={{ 
                    height: '43px',
                    marginTop: '-5'
                }}
            />
        </Form.Group>
          {props.handleModalShow(props.handleModalOpen())}
          <DivButton>
            <ButtonText floated='right' positive onClick={() => props.handleSavePosition()}>
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