import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps , withState , lifecycle , withHandlers } from 'recompose'
import styled from 'styled-components'
import { Button , Icon , Table , Modal , Header } from 'semantic-ui-react'
import Link from 'next/link'
import { TextHeaderTable } from '../../components/TextHeader'
import theme from '../../theme/default';
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
    font-family : 'Kanit', sans-serif !important;
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
    withProps({
        pageTitle: 'Users'
    }),
    withHandlers({
        initUserData: props => () => {
            firebase.database()
            .ref("users")
            .orderByChild('role')
            .startAt('Admin').endAt('Leader')
            .once("value").then( snapshot => {
                props.setlist(Object.values(snapshot.val()))
            })
        }
    }),
    lifecycle({
        async componentDidMount(){
            await this.props.initUserData()
        },

    }),
    withHandlers({
        handleDeleteUser: props => () => event => {
            const deleteUser = firebase.database().ref('users/' + props.idList);
            deleteUser.remove()
            .then(function() {
                props.initUserData()
                props.setOpen(false)
            })
            .catch(function(error) {
                console.log("Remove failed: " + error.message)
            });
            
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
                                        ลบผู้ใช้งาน {props.headerName} สำเร็จ<br/>
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

let button_name = 'เพิ่มผู้ใช้งานในระบบ'
let link = '/user/adduser'

export default enhance( (props)=>
    <div>
        <Div>
            {TextHeaderTable(`รายชื่อผู้ใช้งานในระบบ` , `${props.list.length}` , button_name , 'คน' , link)}
            <TablePosition striped>
                <Table.Header>
                    <Table.Row>
                        <TableHeadcell>
                            <center>ชื่อ</center>
                        </TableHeadcell>
                        <TableHeadcell>
                            <center>ตำแหน่ง</center>
                        </TableHeadcell>
                        <TableHeadcell>
                            <center>จัดการข้อมูล</center>
                        </TableHeadcell>
                    </Table.Row>
                </Table.Header>
                {props.handleModalShow(props.handleModalOpen())}
                <TableBody>
                    {props.list.map( (data , i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell>
                                    <label style={{ marginLeft : '35%' }}>{data.name}</label>
                                </TableCell>
                                <TableCell>
                                    <center>{data.role}</center>
                                </TableCell>
                                <TableCell>
                                    <center>
                                        <Link href={{ pathname: '/user/edituser', query: { id : data.uid } }}>
                                            <ButtonEdit animated='fade' size='mini'>
                                                <Button.Content visible content='แก้ไข'/>
                                                <Button.Content hidden >
                                                    <Icon name='edit' />
                                                </Button.Content>
                                            </ButtonEdit>
                                        </Link>
                                        <ButtonAdd animated='fade' size='mini' color="youtube" onClick={props.handleModalOpen(true,data.name,data.uid)} disabled={data.role === 'Admin' && data.uid === props.authStore.userData.uid ? true : false}>
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
                                                        คุณต้องการลบผู้ใช้งาน <b>{props.headerName}</b> ออกจากระบบใช่หรือไม่ ?
                                                    </p>
                                                </Modal.Content>
                                            <Modal.Actions>
                                                <ButtonText  onClick={props.handleModalOpen(false)}>
                                                    <Icon name='times' /> ยกเลิก
                                                </ButtonText>
                                                <ButtonAdd color='green' onClick={props.handleDeleteUser()}>
                                                    <Icon name='checkmark' /> ยืนยัน
                                                </ButtonAdd>
                                            </Modal.Actions>
                                        </Modal>
                                    </center>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </TablePosition>
        </Div>
    </div>
)   