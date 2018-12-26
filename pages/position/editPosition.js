import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps, withState , lifecycle , withHandlers } from 'recompose'
import { TextHeader } from '../../components/TextHeader'
import styled from 'styled-components'
import { Form , Button , Icon , Modal } from 'semantic-ui-react'
import { Breadcrumb2Page } from '../../components/Breadcrumb'
import axios from 'axios'

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
  withState('position_name' , 'setPosition_Name'),
  withState('departmentName' , 'setDepartmentName'),
  withState('all_position_name' , 'setAll_Position_name'),
  withState('defaultData' ,'setDefaultData'),
  withState('open' , 'setOpen' , false),
  withState('modal' , 'setModal' , false),
  withProps({
    pageTitle: 'Edit Position'
  }),
  withLayout,
  lifecycle({
    async componentDidMount(){
      const url = `http://localhost:4000/positions/${this.props.url.query.id}`
      const res = await axios.get(url)
      let department_id
      res.data.map( data => {        
        this.props.setPosition_Name(data.position_name)
        this.props.setDefaultData(data.position_name)
        department_id = data.department_id
      })

      const urlDepartment = `http://localhost:4000/departments/${department_id}`
      const response_des = await axios.get(urlDepartment)
      this.props.setDepartmentName(response_des.data[0].department_name)      
      
      let position_all = []
      const urlAllPosition = `http://localhost:4000/positions`
      const response_pos = await axios.get(urlAllPosition)
      response_pos.data.map( data => {
        position_all.push(data.position_name)
      })      
     this.props.setAll_Position_name(position_all)
    }
  }),
  withHandlers({
    handleSavePositionName : props => (id) => event => {
      let checkData = props.all_position_name.indexOf(props.position_name)
      if (checkData === -1 || props.position_name === props.defaultData){
        props.setModal(true)
        props.setOpen(true)
        const url = `http://localhost:4000/positions/${id}`
        axios.put(url , {
          id : id ,
          position_name : props.position_name,
        })
        .then( res => {
          console.log(res);
          setTimeout(() => {
            javascript:history.back()
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
    handleInputData: props => () => event => {
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
    {Breadcrumb2Page('ตำแหน่งงานในบริษัท' , 'แก้ไขตำแหน่งงานในบริษัท' , '/position/position')}
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
              defaultValue={props.position_name}
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