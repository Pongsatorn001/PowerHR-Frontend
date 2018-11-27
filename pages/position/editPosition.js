import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps, withState , withHandlers } from 'recompose'
import { TextHeader } from '../../components/TextHeader'
import styled from 'styled-components'
import { Form , Input , Button , Icon} from 'semantic-ui-react'
import { Breadcrumb2Page } from '../../components/Breadcrumb'

const Div = styled.div `
  position : relative ;
  background : rgb(255, 255, 255);
  box-shadow : rgb(204, 204, 204) 0px 1px 2px;
  margin-right : 13px;
  margin-top : 20px ;
`
const DivForm = styled.div`
  padding-top : 40px !important ;
  margin-left : 30%  !important ;
  margin-right : 30%  !important ;
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
  withState('list' , 'setlist' , ['Fontend Developer' , 'Backend Developer' , 'Fullstack Developer' , 'Design UX/UI' , 'Tester']),
  withProps({
    pageTitle: 'Edit Position'
  }),
  withLayout,
  withHandlers({
    setEdit: props => () => {
      const name = props.url.query.name
      let editData
      props.list.map( data => {
        if (data === name) {
          return editData = data
        }
      })
      return editData
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
                value={props.setEdit()}
              />
            <DivButton>
              <ButtonText floated='right' positive>
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