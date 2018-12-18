import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps, withState , lifecycle , withHandlers } from 'recompose'
import { TextHeader } from '../../components/TextHeader'
import styled from 'styled-components'
import { Form , Button , Icon} from 'semantic-ui-react'
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

const IconLine = styled(Icon)`
  font-size: 35px !important;
`;

const SizeInput = styled(Form.Input)`
  font-size : 16px !important;
`;

const SizeForm = styled(Form)`
  width: 70% !important;
  margin-left: 15% !important;
`;

const enhance = compose(
  withState('position_name' , 'setPosition_Name'),
  withProps({
    pageTitle: 'Edit Position'
  }),
  withLayout,
  lifecycle({
    async componentDidMount(){
      const url = `http://localhost:4000/positions/${this.props.url.query.id}`
      const res = await axios.get(url)
      res.data.map( data => {        
        this.props.setPosition_Name(data.position_name)
      })  
    }
  }),
  withHandlers({
    handleSavePositionName : props => (id) => event => {
      const url = `http://localhost:4000/positions/${id}`
      axios.put(url , {
        id : id ,
        position_name : props.position_name
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
    },
    handleInputData: props => () => event => {
      props.setPosition_Name(event.target.value)      
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
          <Form.Field>
              <SizeInput
                fluid
                id='namePositions'
                label='ชื่อตำแหน่งที่ต้องการแก้ไข :'
                placeholder='กรุณากรอก ชื่อตำแหน่งที่ต้องการ'
                defaultValue={props.position_name}
                onChange={props.handleInputData()}
              />
            <DivButton>
              <ButtonText floated='right' positive onClick={props.handleSavePositionName(props.url.query.id)}>
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