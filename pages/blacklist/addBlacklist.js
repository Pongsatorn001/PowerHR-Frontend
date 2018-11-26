import { withLayout } from '../../hoc'
import React from 'react'
import { compose, withProps , withHandlers , withState} from 'recompose'
import { TextHeader } from '../../components/TextHeader'
import styled from 'styled-components'
import { Form , Input , Button , Icon , TextArea } from 'semantic-ui-react'
import { Breadcrumb2Page } from '../../components/Breadcrumb'
import { log } from 'util';

const Div = styled.div `
  position : relative ;
  background : rgb(255, 255, 255);
  box-shadow : rgb(204, 204, 204) 0px 1px 2px;
  margin-right : 13px;
  font-family : 'Kanit', sans-serif !important;
  margin-top : 20px ;
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
    withState('list' , 'setlist' , [{fname: 'Tan' , lname : 'Kitpakorn' , posi : 'Fontend Developer' , idcard : 1234 , des: 'ทำงานดีเกินไป'} , {fname: 'May' , lname : 'Hathairat' , posi : 'Backend Developer' , idcard : 5678 , des: 'ทำงานดีเกินไป' } , {fname: 'Gook' , lname : 'Down' , posi : 'Fullstack Developer' , idcard : 9876 , des: 'ทำงานดีเกินไป'}]),
    withState('keyData' , 'setKeyData', undefined),
    withState('firstname' , 'setFirstname', undefined),
    withState('lastname' , 'setLastname', undefined),
    withState('idcard' , 'setIdcard', undefined),
    withProps({
    pageTitle: 'Add Blacklist'
    }),
    withLayout,
    withHandlers({
        handleOptionFnameInput: props => (fname , keyData) => {
            let fnameData = fname.map( (data , i) => {
                return(
                    <option value={data.fname} key={i} />
                )
            })
            return fnameData
        },
        handleOptionLnameInput: props => (lname , keyData) =>{
            let lnameData = lname.map( (data , i) => {
                return(
                    <option value={data.lname} key={i} />
                )
            })
            return lnameData
        },
        handleOptionIdcardInput: props => (idcard , keyData) => {
            let IdcardData = idcard.map( (data ,i) => {
                return(
                    <option value={data.idcard} key={i}/>
                )
            })
            return IdcardData
        },
        onChangeInput: props => () => event => {
            const inputData = event.target.value
            if (event.keyCode === 8) {
                props.setFirstname(undefined)
                props.setLastname(undefined)
                props.setIdcard(undefined)
            }
            else{                
                props.list.map( data => {
                    if(inputData === data.lname){
                        props.setFirstname(data.fname)
                        props.setLastname(data.lname)
                        props.setIdcard(data.idcard)
                    }
                    if(inputData === data.fname){
                        props.setFirstname(data.fname)
                        props.setLastname(data.lname)
                        props.setIdcard(data.idcard)
                    }                    
                    if(inputData === data.idcard){
                        props.setFirstname(data.fname)
                        props.setLastname(data.lname)
                        props.setIdcard(data.idcard)
                    }
                })     
            }
        }
    })
)
  
export default enhance((props) => 
    <div>
        {console.log(props.firstname , props.lastname , props.idcard)}
        {Breadcrumb2Page('Blacklist' , 'Add Blacklist' , '/blacklist/blackList')}
        <Div>
            <center>{TextHeader('Add Blacklist ( เพิ่มรายชื่อแบล็คลิสต์ )')}</center>
            <DivForm>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='ชื่อจริง :'
                            placeholder='ชื่อจริง'
                            list="firstname" 
                            name="firstname"
                            onKeyUp={props.onChangeInput()}
                            defaultValue={props.firstname}
                        />
                        <datalist id="firstname">
                            {props.handleOptionFnameInput(props.list)}
                        </datalist>
                        <Form.Field
                            id='form-input-control-last-name'
                            control={Input}
                            label='นามสกุล :'
                            placeholder='นามสกุล'
                            list="lastname" 
                            name="lastname"
                            onKeyUp={props.onChangeInput()}
                            defaultValue={props.lastname}
                        />
                        <datalist id="lastname">
                            {props.handleOptionLnameInput(props.list)}
                        </datalist>
                    </Form.Group>
                    <Form.Field
                        type="number"
                        control={Input}
                        label='เลขบัตรประจำตัวประชาชน :'
                        placeholder='เลขบัตรประจำตัวประชาชน'
                        list="idcard" 
                        name="idcard"
                        onKeyUp={props.onChangeInput()}
                        defaultValue={props.idcard}
                    />
                    <datalist id="idcard">
                        {props.handleOptionIdcardInput(props.list)}
                    </datalist>
                    <Form.Field
                        id='form-textarea-control-opinion'
                        control={TextArea}
                        label='รายละเอียด/เหตุผล :'
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
    </div>
);