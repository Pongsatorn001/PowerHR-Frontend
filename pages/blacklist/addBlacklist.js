import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps } from 'recompose'
import { TextHeader } from '../../components/TextHeader'
import styled from 'styled-components'
import { Form , Input , Button , Icon , TextArea } from 'semantic-ui-react'

const Div = styled.div `
  position : relative ;
  background : rgb(255, 255, 255);
  box-shadow : rgb(204, 204, 204) 0px 1px 2px;
  margin-right : 13px;
  font-family : 'Kanit', sans-serif !important;
`
const DivButton = styled.div`
  padding-top : 20px !important ;
  padding-bottom : 60px !important ;
`
const ButtonText = styled(Button)`
  font-family : 'Kanit', sans-serif !important;
`
const DivForm = styled.div`
  padding-top : 40px !important ;
  margin-left : 15% !important ;
  margin-right : 15% !important ;
`

const enhance = compose(
  withProps({
    pageTitle: 'Add Blacklist'
  }),
  withLayout
)
  
export default enhance(() => 
    <Div>
        <center>{TextHeader('Add Blacklist ( เพิ่มผู้สมัครไม่ผ่านการคัดเลือก )')}</center>
        <DivForm>
            <Form>
                <Form.Group widths='equal'>
                    <Form.Field
                        id='form-input-control-first-name'
                        control={Input}
                        label='ชื่อจริง'
                        placeholder='ชื่อจริง'
                    />
                    <Form.Field
                        id='form-input-control-last-name'
                        control={Input}
                        label='นามสกุล'
                        placeholder='นามสกุล'
                    />
                </Form.Group>
                <Form.Field
                    id='form-textarea-control-opinion'
                    control={TextArea}
                    label='รายละเอียด/เหตุผล'
                    placeholder='รายละเอียดหรือเหตุผลในการติด Blacklist'
                />
                <DivButton>
                    <ButtonText floated='right' positive>
                        <Icon name='checkmark' /> บันทึก
                    </ButtonText>
                    <ButtonText floated='right' href="javascript:history.back()">
                        <Icon name='times' /> ยกเลิก
                    </ButtonText>
                </DivButton>
            </Form>
        </DivForm>
    </Div>
);