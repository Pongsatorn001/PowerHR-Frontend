import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps , withState , withHandlers , lifecycle } from 'recompose'
import styled from 'styled-components'
import Link from 'next/link'
import { Button , Icon , Table , Modal , Header } from 'semantic-ui-react'
import { TextHeaderTable } from '../../components/TextHeader'
import theme from '../../theme/default';
import axios from 'axios'
import { inject, observer } from 'mobx-react'
import { firebase } from '../../firebase/index'

const TablePosition = styled(Table)`
    padding-left : 50px !important;
    padding-right : 50px !important;
    padding-bottom : 20px !important;
    border: none !important;
    background: ${theme.colors.elementBackground} !important;
`
const Panal = styled.p`
  font-size: 18px !important;
`
const IconModal = styled(Icon)`
  font-size: 55px !important;
`
const ModalHeader = styled(Modal.Header)`
    font-family : 'Kanit', sans-serif !important;
    background : #ff6b82 !important;
    color : #fff !important;
    font-size: 18px;
`
const TableBody = styled(Table.Body)`
    background: ${theme.colors.elementBackground} !important;
    border-top-width: 100px !important;
`;

const TableRow = styled(Table.Row)`
    border-color : ${theme.colors.elementBackground} ;
    background: ${theme.colors.elementBackground} ;
    cursor : pointer ;
    &:hover {
        background : #ff84a12b !important;
    };
`;

const TableHeadcell = styled(Table.HeaderCell)`
    border-color : #fff !important;
`;

const TableCell = styled(Table.Cell)`
    border-top : none !important;
`
const Div = styled.div `
    position : relative ;
    background : rgb(255, 255, 255);
    box-shadow : rgb(204, 204, 204) 0px 1px 2px;
    margin-right : 13px;
`;

const ButtonEdit = styled(Button)`
    color : #000 !important;
    background : #fff700 !important;
    font-family : 'Kanit', sans-serif !important;
`;
const ButtonDescription = styled(Button)`
    color : #fff !important;
    background : #0086cb !important;
    font-family : 'Kanit', sans-serif !important;
`;
const ButtonAdd = styled(Button)`
    font-family : 'Kanit', sans-serif !important;
`;

const HeaderContent = styled(Header)`
    font-family : 'Kanit', sans-serif !important;
`;

const enhance = compose(
    withLayout,
    inject('authStore'),
    withState('list','setList',[]),
    withState('headerName' , 'setHeaderName'),
    withState('open' , 'setOpen' , false),
    withState('modalShow' , 'setModalShow' , false),
    withState('delSuccess' , 'setDelsucces' , false),
    withState('watchDescrip' , 'setWatchDescrip' , false),
    withState('idList' , 'setIdList'),
    withState('value' , 'setvalue'),
    withState("rate" , "setRate"),
    withState('startdate' , 'setstartdate'),
    withState('enddate' , 'setenddate'),
    withState('description' , 'setdescription'),
    withState('positionName','setPositionName',[]),
    withState('department_name' , 'setdepartment_name'),
    withProps({
        pageTitle: 'Job Positions'
    }),
    withHandlers({
        initGetJobPositionData: props => () => {
            firebase.database().ref("job_positions_log")
            .once("value").then( snapshot => {
                let result = Object.values(snapshot.val()) 
                props.setList(result)
            })
        }
    }),
    lifecycle({
        async componentDidMount(){
            await this.props.initGetJobPositionData()             
        }
    }),
    withHandlers({
        handleModalOpen: props => (foo , name , id) => event => {
            props.setOpen(foo)
            props.setHeaderName(name)
            props.setIdList(id)
            props.setModalShow(false)
            props.setDelsucces(false)
        },
        handleCheckDisbledDelete: props => (jpid) => {
            firebase.database()
            .ref("apply_jobs")
            .orderByChild("jpb_position_id")
            .equalTo(jpid)
            .once("value").then( snapshot => {
                let data = Object.values(snapshot.val())
                console.log(data.job_position_id);
            })
        },
        handleModalDescription: props => (bool , name , value , startdate , enddate , description , department_name , rate) => event => {
            if (bool === true) {
                const localStartDate = startdate.split('-')
                const localEndDate = enddate.split('-')
                const result_start = new Date(Date.UTC(localStartDate[0],localStartDate[1]-1,localStartDate[2]));
                const result_end = new Date(Date.UTC(localEndDate[0],localEndDate[1]-1,localEndDate[2]));
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                props.setWatchDescrip(bool)
                props.setHeaderName(name)
                props.setvalue(value)
                props.setstartdate(result_start.toLocaleDateString('th-TH', options))
                props.setenddate(result_end.toLocaleDateString('th-TH', options))
                props.setdescription(description)
                props.setdepartment_name(department_name)
                props.setRate(rate)
            }
            else{
                props.setWatchDescrip(bool)
            }
        },
        handleDeleteJob_Position: props => () => event => {
            const id = props.idList
            const url = `http://localhost:4000/job_position/${id}`
            axios.delete(url)
            .then( res => {
                const urlUpdateData = `http://localhost:4000/joinPositionAndDepartment`
                axios.get(urlUpdateData)
                .then( response => {
                    props.setList(response.data)
                    props.setOpen(false)
                    props.setDelsucces(true)
                })
                .catch( err => {
                    console.log(err);
                })
            })
            .catch( err => {
                console.log(err);
            })
        },
        handleModalShow: props => (setModal) => {                        
            if (props.modalShow === true) {
                return(
                    <Modal 
                        size="tiny"
                        open={props.modalShow}
                        dimmer="blurring"
                    >
                        <Modal.Content>
                            <center>
                            <IconModal name="info circle"/><br/><br/>
                            <Panal>
                                ไม่สามารถลบข้อมูลตำแหน่งงาน {props.headerName} ที่เปิดรับนี้ได้<br/>
                                เนื่องจากยังมีการเรียกใช้ข้อมูลตำแหน่งงานที่เปิดรับนี้อยู่ <br/>
                            </Panal>
                            <ButtonAdd color='youtube' onClick={setModal}>
                                <Icon name='close' /> ปิด
                            </ButtonAdd>
                            </center>
                        </Modal.Content>
                    </Modal>
                )
            }
            if (props.delSuccess === true) {
                return(
                    <Modal 
                        size="tiny"
                        open={props.delSuccess}
                        dimmer="blurring"
                      >
                        <Modal.Content>
                            <center>
                                <IconModal name="info circle"/><br/><br/>
                                    <Panal>
                                        ลบตำแหน่งงาน {props.headerName} ที่เปิดรับสำเร็จ<br/>
                                    </Panal>
                                <ButtonAdd positive onClick={setModal}>
                                    <Icon name='checkmark' /> ตกลง
                                </ButtonAdd>
                            </center>
                        </Modal.Content>
                    </Modal>
                )
            }
            else{
                return null
            }
        }
    }),
    observer
)

let job_pos_name = 'ตำแหน่งงานที่เปิดรับสมัคร'
let job_pos_des = `ตำแหน่ง`
let job_button_name = 'เพิ่มตำแหน่งงานที่เปิดรับ'
let link ='/jobPositions/addJobPositions'

export default enhance( (props)=> 
    <Div>
        {TextHeaderTable(job_pos_name , props.list.length , job_button_name ,job_pos_des, link , '' , '' , props.authStore.userData.role)}
        <TablePosition striped>
            <Table.Header>
                <Table.Row>
                    <TableHeadcell>
                        <center>รหัส</center>
                    </TableHeadcell>
                    <TableHeadcell>
                        <center>แผนกที่เปิดรับ</center>
                    </TableHeadcell>
                    <TableHeadcell>
                        <center>ตำแหน่งงานที่เปิดรับ</center>
                    </TableHeadcell>
                    <TableHeadcell>
                        <center>จำนวนที่เปิดรับ</center>
                    </TableHeadcell>
                    {
                        props.authStore.userData.role === 'Admin'
                        ?   <TableHeadcell>
                                <center>จัดการข้อมูล</center>
                            </TableHeadcell>
                        : null
                    }
                </Table.Row>
            </Table.Header>
            {props.handleModalShow(props.handleModalOpen())}
            <TableBody>
                {
                    props.list.map( (data,i)=> {
                        return (
                            <TableRow key={i}>
                                    <TableCell>
                                        <Link href={{ pathname : '../resume/resume' , query : { id : data.job_position_id}}}>
                                            <center><label>{i+1}</label></center>
                                        </Link>
                                    </TableCell>                          
                                    <TableCell>
                                        <Link href={{ pathname : '../resume/resume' , query : { id : data.job_position_id}}}>
                                            <label style={{ marginLeft : '25%' }}>{data.department_name}</label>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={{ pathname : '../resume/resume' , query : { id : data.job_position_id}}}>
                                            <label style={{ marginLeft : '25%' }}>{data.position_name}</label>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                    <Link href={{ pathname : '../resume/resume' , query : { id : data.job_position_id}}}>
                                            <center>{data.value}</center>
                                        </Link>
                                    </TableCell>
                                    {console.log()}
                                    {
                                        props.authStore.userData.role === 'Admin'
                                        ? <TableCell>
                                            <center>
                                                <ButtonDescription animated='fade' size='mini' onClick={props.handleModalDescription(true , data.position_name , data.value , data.startdate , data.enddate , data.description , data.department_name , data.rate)}>
                                                    <Button.Content visible content='ดูรายละเอียด'/>
                                                    <Button.Content hidden >
                                                        <Icon name='search' />
                                                    </Button.Content>
                                                </ButtonDescription>
                                                <Modal 
                                                    size="tiny"
                                                    open={props.watchDescrip}
                                                    dimmer="blurring"
                                                >
                                                    <ModalHeader>รายละเอียดตำแหน่ง {props.headerName}</ModalHeader>
                                                    <Modal.Content>
                                                        <span>
                                                            จำนวนที่เปิดรับสมัคร : <label>{props.value} ตำแหน่ง</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            แผนกที่ทำการเปิดรับสมัคร : <label>{props.department_name}</label><br/><br/>
                                                            วันที่เปิดรับสมัคร : <label>{props.startdate}</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            วันที่สิ้นสุดการรับสมัคร : <label>{props.enddate}</label><br/><br/>
                                                            ค่าตอบแทน : <label>{props.rate}</label><br/><br/>
                                                            รายละเอียดตำแหน่งงาน : <br/>
                                                            <p dangerouslySetInnerHTML={{ __html: props.description }} />
                                                        </span><br/><br/>
                                                        <center>
                                                            <ButtonAdd onClick={props.handleModalDescription(false)}>
                                                                <Icon name='close' /> ปิด
                                                            </ButtonAdd>
                                                        </center>
                                                    </Modal.Content>
                                                </Modal>
                                                <Link href={{ pathname:'/jobPositions/editJobPositions', query: { id : data.job_position_id }}}>
                                                    <ButtonEdit animated='fade' size='mini'>
                                                        <Button.Content visible content='แก้ไข'/>
                                                        <Button.Content hidden >
                                                            <Icon name='edit' />
                                                        </Button.Content>
                                                    </ButtonEdit>
                                                </Link>
                                                <ButtonAdd animated='fade' size='mini' color="youtube" onClick={props.handleModalOpen(true,data.position_name,data.id)} disabled={false}>
                                                    <Button.Content visible content='ลบ'/>
                                                    <Button.Content hidden >
                                                        <Icon name='trash alternate' />
                                                    </Button.Content>
                                                </ButtonAdd>
                                                <Modal 
                                                    size="tiny"
                                                    open={props.open}
                                                    dimmer="blurring"
                                                >
                                                    <HeaderContent icon='archive' content='ลบข้อมูลตำแหน่งใช่หรือไม่ ?' />
                                                        <Modal.Content>
                                                            <p>
                                                                คุณต้องการลบข้อมูลตำแหน่งงาน {props.headerName} ใช่หรือไม่ ?
                                                            </p>
                                                        </Modal.Content>
                                                    <Modal.Actions>
                                                        <ButtonAdd  onClick={props.handleModalOpen(false)}>
                                                            <Icon name='times' /> ยกเลิก
                                                        </ButtonAdd>
                                                        <ButtonAdd color='green' onClick={props.handleDeleteJob_Position()}>
                                                            <Icon name='checkmark' /> ยืนยัน
                                                        </ButtonAdd>
                                                    </Modal.Actions>
                                                </Modal>
                                            </center>
                                        </TableCell>
                                        : null
                                    }
                                    
                            </TableRow>
                        )}
                    )
                }
            </TableBody>
        </TablePosition>
    </Div>
)   