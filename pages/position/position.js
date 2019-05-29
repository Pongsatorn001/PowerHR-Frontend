import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps , withState , lifecycle , withHandlers } from 'recompose'
import styled from 'styled-components'
import { Button , Icon , Table , Modal , Header } from 'semantic-ui-react'
import Link from 'next/link'
import { TextHeaderTable } from '../../components/TextHeader'
import theme from '../../theme/default';
import { Breadcrumb2Page } from '../../components/Breadcrumb'
import { inject, observer } from 'mobx-react'
import { firebase } from '../../firebase/index'

const TablePosition = styled(Table)`
    padding-left : 50px !important;
    padding-right : 50px !important;
    padding-bottom : 20px !important;
    border: none !important;
    background: ${theme.colors.elementBackground} !important;
`;
const Panal = styled.p`
  font-size: 18px !important;
`
const IconModal = styled(Icon)`
  font-size: 55px !important;
`;
const TableBody = styled(Table.Body)`
    background: ${theme.colors.elementBackground} !important;
    border-top-width: 100px !important;
`;

const TableRow = styled(Table.Row)`
    border-color : ${theme.colors.elementBackground} ;
    background: ${theme.colors.elementBackground} ;
`;

const TableHeadcell = styled(Table.HeaderCell)`
    border-color : ${theme.colors.elementBackground} !important;
`;

const ButtonEdit = styled(Button)`
    color : ${theme.colors.fontBlack} !important;
    background : ${theme.colors.buttonEdit} !important;
    font-family : 'Kanit', sans-serif !important;
`;
const ButtonText = styled(Button)`
  font-family : 'Kanit', sans-serif !important;
`
const TableCell = styled(Table.Cell)`
    border-top : none !important;
`
const Div = styled.div `
    position : relative ;
    background : ${theme.colors.elementBackground};
    box-shadow : ${theme.colors.boxShadow};
    margin-right : 13px;
    margin-top : 20px ;
`
const ButtonAdd = styled(Button)`
    font-family : 'Kanit', sans-serif !important;
`
const HeaderContent = styled(Header)`
    font-family : 'Kanit', sans-serif !important;
`

const enhance = compose(
    withLayout,
    inject('authStore'),
    withState('list' , 'setlist' , []),
    withState('headerName' , 'setHeaderName'),
    withState('open' , 'setOpen' , false),
    withState('modalShow' , 'setModalShow' , false),
    withState('delSuccess' , 'setDelsucces' , false),
    withState('idList' , 'setIdList'),
    withState('departmentName' , 'setDepartmentName'),
    withState('isOpen' , 'setIsOpen' , false),
    withState('message' , 'setMessage'),
    withProps({
        pageTitle: 'Positions'
    }),
    withHandlers({
        initDepartmentData: props => () => {
            firebase.database().ref("departments/" + props.url.query.id)
            .once("value").then( snapshot => {
                let result = Object.assign(snapshot.val())          
                props.setDepartmentName(result.department_name)
            })
        },
        initPositionInDepartment: props => () => {
            firebase.database()
            .ref("positions")
            .orderByChild("department_id")
            .equalTo(props.url.query.id)
            .once("value").then( snapshot => {
                props.setlist(Object.values(snapshot.val()))
            })
        }
    }),
    lifecycle({
        async componentDidMount(){
            await this.props.initDepartmentData()       
            await this.props.initPositionInDepartment()     
        },

    }),
    withHandlers({
        handleDeletePositionName: props => () => event => {
            props.setOpen(false)
            firebase.database().ref("job_positions")
            .orderByChild("position_id")
            .equalTo(props.idList)
            .once("value").then( snapshot => {
                if (snapshot.val()) {
                    props.setMessage('ไม่สามารถลบตำแหน่งงานได้ เนื่องจากมีการเปิดรับสมัครอยู่ในระบบ')
                    props.setIsOpen(true)
                }
                else{
                    const deleteUser = firebase.database().ref('positions/' + props.idList);
                    deleteUser.remove()
                    .then(function() {
                        props.initDepartmentData()
                        props.initPositionInDepartment()
                        props.setIsOpen(true)
                        props.setMessage('ลบข้อมูลตำแหน่งงานสำเร็จ')
                    })
                    .catch(function(error) {
                        console.log("Remove failed: " + error.message)
                    });
                }
            })
            
        },
        handleModalOpen: props => (foo , name , id) => event => {
            props.setOpen(foo)
            props.setHeaderName(name)
            props.setIdList(id)            
            props.setModalShow(false)
            props.setDelsucces(false)
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
                                ไม่สามารถลบข้อมูลตำแหน่งงาน {props.headerName} นี้ได้<br/>
                                เนื่องจากยังมีการเรียกใช้ข้อมูลตำแหน่งงานนี้อยู่ <br/>
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
                                        ลบตำแหน่งงาน {props.headerName} สำเร็จ<br/>
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

let button_name = 'เพิ่มตำแหน่ง'
let link = '/position/addPosition'

export default enhance( (props)=>
    <div>
        {Breadcrumb2Page('แผนกงานในบริษัท' , 'ตำแหน่งงานในแผนก' , `/departments/departments`)}
        <Div>
            {TextHeaderTable(`ตำแหน่งงานในแผนก ${props.departmentName}` , `${props.list.length}` , button_name , 'ตำแหน่ง' , link , props.url.query.id , '' , props.authStore.userData.role )}
            <TablePosition striped>
                <Table.Header>
                    <Table.Row>
                        <TableHeadcell>
                            <center>รหัส</center>
                        </TableHeadcell>
                        <TableHeadcell>
                            <center>ตำแหน่ง</center>
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
                    {props.list.map( (data , i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell>
                                    <center>{i + 1}</center>
                                </TableCell>
                                <TableCell>
                                    <label style={{ marginLeft : '39%' }}>{data.position_name}</label>
                                </TableCell>
                                {
                                    props.authStore.userData.role === 'Admin'
                                    ?   <TableCell>
                                            <center>
                                                <Link href={{ pathname: '/position/editPosition', query: { id : data.position_id } }}>
                                                    <ButtonEdit animated='fade' size='mini'>
                                                        <Button.Content visible content='แก้ไข'/>
                                                        <Button.Content hidden >
                                                            <Icon name='edit' />
                                                        </Button.Content>
                                                    </ButtonEdit>
                                                </Link>
                                                <ButtonAdd animated='fade' size='mini' color="youtube" onClick={props.handleModalOpen(true,data.position_name,data.position_id)}>
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
                                                        <ButtonText  onClick={props.handleModalOpen(false)}>
                                                            <Icon name='times' /> ยกเลิก
                                                        </ButtonText>
                                                        <ButtonAdd color='green' onClick={props.handleDeletePositionName()}>
                                                            <Icon name='checkmark' /> ยืนยัน
                                                        </ButtonAdd>
                                                    </Modal.Actions>
                                                </Modal>
                                            </center>
                                        </TableCell>
                                    : null
                                }
                                        
                            </TableRow>
                        )
                    })}
                </TableBody>
                <Modal 
                    size="tiny"
                    open={props.isOpen}
                    dimmer="blurring"
                >
                <Modal.Content>
                    <center>
                        <IconModal name="info circle"/><br/><br/>
                        <Panal>
                            {props.message}<br/>
                        </Panal>
                        <ButtonAdd onClick={() => props.setIsOpen(false)}>
                            ปิด
                        </ButtonAdd>
                    </center>
                </Modal.Content>
                </Modal>
            </TablePosition>
        </Div>
    </div>
)   