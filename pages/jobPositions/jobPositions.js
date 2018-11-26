import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps , withState , withHandlers} from 'recompose'
import styled from 'styled-components'
import Link from 'next/link'
import { Button , Icon , Table , Modal , Header } from 'semantic-ui-react'
import { TextHeaderTable } from '../../components/TextHeader'
import theme from '../../theme/default';

const enhance = compose(
    withProps({
        pageTitle: 'Job Positions'
    }),
    withLayout,
    withState('list','setList',[{id: '001', nameJobPositions: 'Fontend Developer', ReceivingNumber: '2'},{id: '002', nameJobPositions: 'UX/UI Design', ReceivingNumber: '5'}]),
    withState('open' , 'setOpen' , false),
    withHandlers({
        handleModalOpen: props => () => event => {
            props.setOpen(true)
        },
        handleModalClose: props => () => event => {
            props.setOpen(false)
        },
        handleDeleteJobPositions: props => () => event => {
            props.setOpen(false)
        }
    }),
)

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

const ButtonAdd = styled(Button)`
    font-family : 'Kanit', sans-serif !important;
`;

const HeaderContent = styled(Header)`
    font-family : 'Kanit', sans-serif !important;
`;



let job_pos_name = 'ตำแหน่งงานที่เปิดรับสมัคร ( Job Positions )'
let job_pos_des = `ตำแหน่ง`
let job_button_name = 'เพิ่มตำแหน่งงานที่เปิดรับ'
let link ='/jobPositions/addJobPositions'

export default enhance( (props)=> 
    <Div>
        {TextHeaderTable(job_pos_name , props.list.length , job_button_name ,job_pos_des, link)}
        <TablePosition striped>
            <Table.Header>
                <Table.Row>
                    <TableHeadcell>
                        <center>รหัส</center>
                    </TableHeadcell>
                    <TableHeadcell>
                        <center>ตำแหน่งงานที่เปิดรับ</center>
                    </TableHeadcell>
                    <TableHeadcell>
                        <center>จำนวนที่เปิดรับ</center>
                    </TableHeadcell>
                    <TableHeadcell>
                        <center>แก้ไข/ลบ</center>
                    </TableHeadcell>
                </Table.Row>
            </Table.Header>
            <TableBody>
                {
                    props.list.map( (data,i)=> {
                        return (
                            <TableRow key={i}>                          
                                    <TableCell>
                                        <Link href={{ pathname : '../resume/resume' , query : { position : data.nameJobPositions}}}>
                                            <center>{i+1}</center>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                    <Link href={{ pathname : '../resume/resume' , query : { position : data.nameJobPositions}}}>
                                            <center>{data.nameJobPositions}</center>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                    <Link href={{ pathname : '../resume/resume' , query : { position : data.nameJobPositions}}}>
                                            <center>{data.ReceivingNumber}</center>
                                        </Link>
                                    </TableCell>
                                
                                    <TableCell>
                                    <center>
                                        <Link href={{ pathname:'/jobPositions/editJobPositions', query: { nameJobPositions : data.nameJobPositions , ReceivingNumber : data.ReceivingNumber }}}>
                                            <ButtonEdit animated='fade' size='mini'>
                                                <Button.Content visible content='แก้ไข'/>
                                                <Button.Content hidden >
                                                    <Icon name='edit' />
                                                </Button.Content>
                                            </ButtonEdit>
                                        </Link>
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
                                                // onClose={props.handleModalClose()}
                                                closeIcon
                                            >
                                                <HeaderContent icon='archive' content='ลบตำแหน่งงานที่เปิดรับสมัคร' />
                                                    <Modal.Content>
                                                        <p>
                                                            คุณต้องการลบตำแหน่ง <b> {data.nameJobPositions} </b> ใช่หรือไม่ ?
                                                        </p>
                                                    </Modal.Content>
                                                <Modal.Actions>
                                                    <ButtonAdd onClick={props.handleModalClose()}>
                                                        <Icon name='remove' /> ยกเลิก
                                                    </ButtonAdd>
                                                    <ButtonAdd color='green' onClick={props.handleDeleteJobPositions(i)}>
                                                        <Icon name='checkmark' /> ตกลง
                                                    </ButtonAdd>
                                                </Modal.Actions>
                                            </Modal>
                                    </center>
                                </TableCell>
                            </TableRow>
                        )}
                    )
                }
            </TableBody>
        </TablePosition>
    </Div>
)   