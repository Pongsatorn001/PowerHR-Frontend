import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps , withState , withHandlers , lifecycle} from 'recompose'
import styled from 'styled-components'
import { Button , Icon , Table , Modal , Header } from 'semantic-ui-react'
import { TextHeaderTable } from '../../components/TextHeader'
import theme from '../../theme/default';

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

const TableHeadcell = styled(Table.HeaderCell)`
    border-color : ${theme.colors.elementBackground} !important;
`;

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
    withState('list' , 'setlist' , [{fname: 'Tan' , lname : 'Kitpakorn' , posi : 'Fontend Developer' , idcard : 'ทำงานดีเกินไป'} , {fname: 'May' , lname : 'Hathairat' , posi : 'Backend Developer' , idcard : 'ทำงานดีเกินไป' } , {fname: 'Gook' , lname : 'Down' , posi : 'Fullstack Developer' , idcard : 'ทำงานดีเกินไป'}]),
    withState('open' , 'setOpen' , false),
    withProps({
      pageTitle: 'Welcome to PowerHR Admin',
    }),
    withLayout,
    withHandlers({
        handleClickModal: props => (idcard , position) => {            
            return(
                <Modal.Content>
                    <Modal.Description>
                        <p>ตำแหน่ง : {position}</p>
                        <p>รานละเอียด / เหตุผลแบล็คลิสต์ : {idcard}</p>
                    </Modal.Description>
                </Modal.Content>
            )
        },
        handleModalOpen: props => () => event => {
            props.setOpen(true)
        },
        handleModalClose: props => () => event => {
            props.setOpen(false)
        },
        handleDeleteBlacklist: props => () => event => {
            props.setOpen(false)
        }
    }),
)
    
let blacklist_name = 'Blacklist (แบล็คลิสต์)'
let button_name = 'เพิ่มรายชื่อ'
let link = '/blacklist/addBlacklist'

export default enhance((props) => 
    <Div>
        {TextHeaderTable(blacklist_name , `${props.list.length}` , button_name , 'รายชื่อ' , link)}
        <TablePosition striped>
            <Table.Header>
                <Table.Row>
                    <TableHeadcell>
                        <center>ชื่อ</center>
                    </TableHeadcell>
                    <TableHeadcell>
                        <center>นามสกุล</center>
                    </TableHeadcell>
                    <TableHeadcell>
                        <center>ตำแหน่ง</center>
                    </TableHeadcell>
                    <TableHeadcell>
                        <center>จัดการข้อมูล</center>
                    </TableHeadcell>
                </Table.Row>
            </Table.Header>
            <TableBody>
                {props.list.map( (data , i) => {
                    return (
                        <TableRow key={i}>
                            <Modal trigger={
                                <TableCell>
                                    <center>{data.fname}</center>
                                </TableCell>
                            }closeIcon size='small'>
                                <HeaderContent icon='user times' content={`Blacklist : คุณ ${data.fname} ${data.lname}`} />
                                {props.handleClickModal(data.idcard , data.posi)}
                            </Modal>
                            <Modal trigger={
                                <TableCell>
                                    <center>{data.lname}</center>
                                </TableCell>
                            }closeIcon size='small'>
                                <HeaderContent icon='user times' content={`Blacklist : คุณ ${data.fname} ${data.lname}`} />
                                {props.handleClickModal(data.idcard , data.posi)}
                            </Modal>
                            <Modal trigger={
                                <TableCell>
                                    <center>{data.posi}</center>
                                </TableCell>
                            }closeIcon size='small'>
                                <HeaderContent icon='user times' content={`Blacklist : คุณ ${data.fname} ${data.lname}`} />
                                {props.handleClickModal(data.idcard , data.posi)}
                            </Modal>
                            <TableCell>
                                <center>
                                    <Modal 
                                        trigger={
                                            <ButtonAdd animated='fade' size='mini' color="youtube" onClick={props.handleModalOpen()}>
                                                <Button.Content visible content='ลบ'/>
                                                <Button.Content hidden >
                                                    <Icon name='trash alternate' />
                                                </Button.Content>
                                            </ButtonAdd>
                                        }
                                        size="tiny"
                                        onClose={props.handleModalClose()}
                                        closeIcon
                                    >
                                        <HeaderContent icon='archive' content='ลบข้อมูลผู้สมัครไม่ผ่านการคัดเลือกใช่หรือไม่ ?' />
                                        <Modal.Content>
                                            <p>
                                                คุณต้องการลบข้อมูล {data.fname} {data.lname} ตำแหน่ง {data.posi} ใช่หรือไม่ ?
                                            </p>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <ButtonAdd onClick={props.handleModalClose()} >
                                                <Icon name='remove' /> ยกเลิก
                                            </ButtonAdd>
                                            <ButtonAdd color='green' onClick={props.handleDeleteBlacklist(i)}>
                                                <Icon name='checkmark' /> ตกลง
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
);