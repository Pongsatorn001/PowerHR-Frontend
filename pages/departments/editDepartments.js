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
`;
const IconLine = styled(Icon)`
  font-size: 35px !important;
`;
const Panal = styled.p`
  font-size: 18px !important;
`
const SizeInput = styled(Form.Input)`
  font-size : 16px !important;
`;
const ButtonAdd = styled(Button)`
  font-family : 'Kanit', sans-serif !important;
`
const SizeForm = styled(Form)`
  width: 70% !important;
  margin-left: 15% !important;
`;

const enhance = compose(
  withState('department_name' , 'setDepartment_Name'),
  withState('all_Department' , 'setAll_Department'),
  withState('defaultData' ,'setDefaultData'),
  withState('open' , 'setOpen' , false),
  withState('modal' , 'setModal' , false),
  withProps({
    pageTitle: 'Edit Departments'
  }),
  withLayout,
  lifecycle({
    async componentDidMount(){
      const url = `http://localhost:4000/departments/${this.props.url.query.id}`
      const res = await axios.get(url)
      res.data.map( data => {        
        this.props.setDepartment_Name(data.department_name)
        this.props.setDefaultData(data.department_name)
      }) 
      const urlall = `http://localhost:4000/departments`
      const response = await axios.get(urlall)
      let department = []
      response.data.map( data => {
        department.push(data.department_name)
      })
      this.props.setAll_Department(department) 
    }
  }),
  withHandlers({
    handleSaveDepartmentName : props => (id) => event => {
      let check = props.all_Department.indexOf(props.department_name)
      let space = props.department_name.split(' ').join('*')
      let validate = space.indexOf('*')
      if (check === -1 && validate === -1 || props.defaultData === props.department_name) {
        props.setModal(true)
        props.setOpen(true)
        const url = `http://localhost:4000/departments/${id}`
        axios.put(url , {
          id : id ,
          department_name : props.department_name
        })
        .then( res => {
          console.log(res);
          setTimeout(() => {
            history.back()
          }, 3000);
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
      props.setDepartment_Name(event.target.value)      
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
                    ไม่สามารถแก้ไขแผนก {props.department_name} ได้<br/>
                    เนื่องจากมีข้อมูลอยู่ในระบบแล้วหรือข้อมูลไม่ถูกต้อง <br/>กรุณากรอกชื่อแผนกใหม่อีกครั้ง !!
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
                    แก้ไขแผนก {props.department_name} สำเร็จ<br/>
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
        {Breadcrumb2Page('แผนกงานในบริษัท' , 'แก้ไขแผนกงานในบริษัท' , '/departments/departments')}
        <Div>
            <center>{TextHeader('แก้ไขแผนกงานในบริษัท')}</center>
            <center>
                <IconLine name="window minimize outline"/>
            </center>
            <div>
                <SizeForm>
                    <Form.Field>
                        <SizeInput
                            fluid
                            id='namePositions'
                            label='ชื่อแผนกงานที่ต้องการแก้ไข :'
                            placeholder='กรุณากรอก ชื่อแผนกงานที่ต้องการ'
                            defaultValue={props.department_name}
                            onChange={props.handleInputData()}
                        />
                        {props.handleModalShow(props.handleModalOpen())}
                        <DivButton>
                            <ButtonText floated='right' positive onClick={props.handleSaveDepartmentName(props.url.query.id)}>
                                <Icon name='checkmark' /> บันทึก
                            </ButtonText>
                            <ButtonText floated='right' href="javascript:history.back()">
                                <Icon name='times' /> ยกเลิก
                            </ButtonText>
                        </DivButton>
                    </Form.Field>
                </SizeForm>
            </div>
        </Div>
    </div>
);