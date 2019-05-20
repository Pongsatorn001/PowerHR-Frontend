import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps , withState , lifecycle , withHandlers } from 'recompose'
import styled from 'styled-components'
import { Button , Icon , Table , Modal , Header } from 'semantic-ui-react'
import Link from 'next/link'
import { TextHeaderTable } from '../../components/TextHeader'
import theme from '../../theme/default';
import axios from 'axios'
import { Breadcrumb2Page } from '../../components/Breadcrumb'

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
    withState('list' , 'setlist' , []),
    withState('headerName' , 'setHeaderName'),
    withState('open' , 'setOpen' , false),
    withState('modalShow' , 'setModalShow' , false),
    withState('delSuccess' , 'setDelsucces' , false),
    withState('idList' , 'setIdList'),
    withState('departmentName' , 'setDepartmentName'),
    withProps({
        pageTitle: 'Positions'
    }),
    withLayout,
    lifecycle({
        async componentDidMount(){
            const url = `http://localhost:4000/joinDepartment/${this.props.url.query.id}`
            const res = await axios.get(url)
            this.props.setlist(res.data)

            const urlDepartment = `http://localhost:4000/departments/${this.props.url.query.id}`
            const response = await axios.get(urlDepartment)
            this.props.setDepartmentName(response.data[0].department_name)            
        },

    }),
    withHandlers({
        handleDeletePositionName: props => () => event => {
            const id = props.idList
            const url = `http://localhost:4000/positions/${id}`
            axios.delete(url)
            .then( res => {
                const url = `http://localhost:4000/joinDepartment/${props.url.query.id}`
                axios.get(url)
                .then( response => {
                    props.setlist(response.data)
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
    })
)

let button_name = 'เพิ่มตำแหน่ง'
let link = '/position/addPosition'

export default enhance( (props)=>
    <div>
        {Breadcrumb2Page('แผนกงานในบริษัท' , 'ตำแหน่งงานในแผนก' , `/departments/departments`)}
        <Div>
            {TextHeaderTable(`ตำแหน่งงานในแผนก ${props.departmentName}` , `${props.list.length}` , button_name , 'ตำแหน่ง' , link , props.url.query.id)}
            <TablePosition striped>
                <Table.Header>
                    <Table.Row>
                        <TableHeadcell>
                            <center>รหัส</center>
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
                                    <center>{i + 1}</center>
                                </TableCell>
                                <TableCell>
                                    <center>{data.position_name}</center>
                                </TableCell>
                                <TableCell>
                                    <center>
                                        <Link href={{ pathname: '/position/editPosition', query: { id : data.id } }}>
                                            <ButtonEdit animated='fade' size='mini'>
                                                <Button.Content visible content='แก้ไข'/>
                                                <Button.Content hidden >
                                                    <Icon name='edit' />
                                                </Button.Content>
                                            </ButtonEdit>
                                        </Link>
                                        <ButtonAdd animated='fade' size='mini' color="youtube" onClick={props.handleModalOpen(true,data.position_name,data.id)}>
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
                            </TableRow>
                        )
                    })}
                </TableBody>
            </TablePosition>
        </Div>
    </div>
)   