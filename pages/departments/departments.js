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

const Panal = styled.p`
  font-size: 18px !important;
`
const IconModal = styled(Icon)`
  font-size: 55px !important;
`;
const TablePosition = styled(Table)`
    padding-left : 50px !important;
    padding-right : 50px !important;
    padding-bottom : 20px !important;
    border: none !important;
    background: ${theme.colors.elementBackground} !important;
`;
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
const TableNotData = styled(Table.Row)`
    border-color : ${theme.colors.elementBackground} ;
    background: ${theme.colors.elementBackground} ;
`;
const TableHeadcell = styled(Table.HeaderCell)`
    border-color : ${theme.colors.elementBackground} !important;
`;
const HeaderNoneData = styled(Table.HeaderCell)`
    border-color : ${theme.colors.elementBackground} !important;
    padding-top : 3% !important;
    padding-bottom : 3% !important;
`;
const ButtonEdit = styled(Button)`
    color : ${theme.colors.fontBlack} !important;
    background : ${theme.colors.buttonEdit} !important;
    font-family : 'Kanit', sans-serif !important;
`
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
    withState('noneData' , 'setNoneData' , false),
    withState('headerName' , 'setHeaderName'),
    withState('open' , 'setOpen' , false),
    withState('modalShow' , 'setModalShow' , false),
    withState('idList' , 'setIdList'),
    withState('delSuccess' , 'setDelsucces' , false),
    withState('dataInDepartment' , 'setDataInDepartment'),
    withProps({
        pageTitle: 'Departments'
    }),
    withHandlers({
        initGetDepartment: props => () => {
            let department = firebase.database().ref().child('departments')
            .once("value")
            .then( snapshot => {
                if (snapshot.val()) {
                    props.setlist(Object.values(snapshot.val()))
                    props.setNoneData(false)
                }
                else{
                    props.setNoneData(true)
                }
            })
            .catch( err => {
                console.log(err , 'err');
            })
        }
    }),
    lifecycle({
        async componentDidMount(){
            await this.props.initGetDepartment()
            console.log(this.props.authStore);                   
        },
    }),
    withHandlers({
        handleDeleteDepartmentName: props => () => event => {
            const deleteUser = firebase.database().ref('departments/' + props.idList);
            deleteUser.remove()
            .then(function() {
                props.initGetDepartment()
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
                                ไม่สามารถลบแผนก {props.headerName} นี้ได้<br/>
                                เนื่องจากมีข้อมูลตำแหน่งงานอยู่ในแผนก <br/>
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
                                        ลบแผนก {props.headerName} สำเร็จ<br/>
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

let department_name = 'แผนกงานในบริษัท'
let button_name = 'เพิ่มแผนกงาน'
let link = '/departments/addDepartments'

export default enhance( (props)=> 
    <Div>
        {TextHeaderTable(department_name , `${props.list.length}` , button_name , 'แผนก' , link)}
        <TablePosition striped>
            <Table.Header>
                <Table.Row>
                    <TableHeadcell>
                        <center>รหัส</center>
                    </TableHeadcell>
                    <TableHeadcell>
                        <center>แผนกงานในบริษัท</center>
                    </TableHeadcell>
                    <TableHeadcell>
                        <center>จัดการข้อมูล</center>
                    </TableHeadcell>
                </Table.Row>
            </Table.Header>
            {props.handleModalShow(props.handleModalOpen())}
            <TableBody>
                {
                    !props.noneData
                        ?   props.list.map( (data , i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <Link href={{ pathname : '../position/position' , query : { id : data.department_id }}}>
                                                <center>{i + 1}</center>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={{ pathname : '../position/position' , query : { id : data.department_id }}}>
                                                <label style={{ marginLeft : '39%' }}>{data.department_name}</label>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <center>
                                                <Link href={{ pathname: '/departments/editDepartments', query: { id : data.department_id } }}>
                                                    <ButtonEdit animated='fade' size='mini'>
                                                        <Button.Content visible content='แก้ไข'/>
                                                        <Button.Content hidden >
                                                            <Icon name='edit' />
                                                        </Button.Content>
                                                    </ButtonEdit>
                                                </Link>
                                                <ButtonAdd animated='fade' size='mini' color="youtube" onClick={props.handleModalOpen(true,data.department_name,data.department_id)}>
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
                                                        <ButtonAdd color='green' onClick={props.handleDeleteDepartmentName()}>
                                                            <Icon name='checkmark' /> ยืนยัน
                                                        </ButtonAdd>
                                                    </Modal.Actions>
                                                </Modal>
                                            </center>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        :   <TableNotData>
                                <HeaderNoneData/>
                                <HeaderNoneData>
                                    <center>――――  ไม่มีข้อมูลในระบบ  ――――</center>
                                </HeaderNoneData>
                                <HeaderNoneData/>
                            </TableNotData>
                }
            </TableBody>
        </TablePosition>
    </Div>
) 