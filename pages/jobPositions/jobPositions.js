import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps , withState , withHandlers} from 'recompose'
import styled from 'styled-components'
import Link from 'next/link'
import { Button , Icon , Table } from 'semantic-ui-react'
import { TextHeaderTable } from '../../components/TextHeader'

const enhance = compose(
    withProps({
        pageTitle: 'Job Positions'
    }),
    withLayout,
    withState('list','setList',[{id: '001', nameJobPositions: 'Fontend Developer', ReceivingNumber: '2'},{id: '002', nameJobPositions: 'Fontend Developer', ReceivingNumber: '5'}]),
    withState('closeModel','setCloseModel',false),
    withHandlers({
        handleOnClickCancel: props => l => event => {
            props.setCloseModel(false)
        },
    })
)

const TablePosition = styled(Table)`
    padding-left : 50px !important;
    padding-right : 50px !important;
    padding-bottom : 20px !important;
    border: none !important;
    background: #fff !important;
`;

const TableBody = styled(Table.Body)`
    background: #fff !important;
    border-top-width: 100px !important;
`;

const TableRow = styled(Table.Row)`
    border-color : #fff ;
    background: #fff ;
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
                    props.list.map( (l)=>
                        <TableRow key={l.id}>
                            <TableCell>
                                <center>{l.id}</center>
                            </TableCell>
                            <TableCell>
                                <Link href="/jobPositions/resume">
                                    <center>{l.nameJobPositions}</center>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <center>{l.ReceivingNumber}</center>
                            </TableCell>
                            <TableCell>
                                <center>
                                    <Link href="/jobPositions/editJobPositions">
                                        <ButtonEdit animated='fade' size='mini'>
                                            <Button.Content visible content='แก้ไข'/>
                                            <Button.Content hidden >
                                                <Icon name='edit' />
                                            </Button.Content>
                                        </ButtonEdit>
                                    </Link>
                                    <ButtonAdd animated='fade' size='mini' color="youtube">
                                        <Button.Content visible content='ลบ'/>
                                        <Button.Content hidden >
                                            <Icon name='trash alternate' />
                                        </Button.Content>
                                    </ButtonAdd>
                                </center>
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </TablePosition>
    </Div>
)   