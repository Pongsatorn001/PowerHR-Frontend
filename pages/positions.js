import React from 'react'
import { withLayout } from '../hoc'
import { compose, withProps } from 'recompose'
import styled from 'styled-components'
import { Button , Input , Header , Icon , Table } from 'semantic-ui-react'

const HeaderName = styled(Header)`
    padding-top : 20px !important;
    padding-left : 50px !important;
    font-family: 'Kanit', sans-serif !important;
`;

const HeaderButtonAdd = styled(Header)`
    padding-top : 20px !important;
    padding-right : 36px !important;
`;

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

const ButtonEdit = styled(Button)`
    color : #000 !important;
    background : #fff700 !important;
    font-family : 'Kanit', sans-serif !important;
`;

const IconAdd = styled(Icon)`
    padding-left : 8px !important;
`;

const Small = styled.small `
    font-size: 15px !important;
    font-weight: 600;
`

const TableCell = styled(Table.Cell)`
    border-top : none !important;
`
const Div = styled.div `
    position : relative ;
    background : rgb(255, 255, 255);
    box-shadow : rgb(204, 204, 204) 0px 1px 2px;
    margin-right : 13px;
`
const ButtonAdd = styled(Button)`
    font-family : 'Kanit', sans-serif !important;
`

const enhance = compose(
    withProps({
        pageTitle: 'Resume'
    }),
    withLayout
)

export default enhance( ()=> 
    <Div>
        <HeaderName as='h1' floated='left'>
            Positions (ตำแหน่ง)&nbsp;<Small>( จำนวนตำแหน่งงานทั้งหมด 1 ตำแหน่ง )</Small>
        </HeaderName>
        <HeaderButtonAdd as='h2' floated='right'>
            <ButtonAdd positive animated='fade' size='medium'>
                <Button.Content visible>
                    เพิ่มตำแหน่ง
                </Button.Content>
                <Button.Content hidden>
                    <IconAdd name='add' />
                </Button.Content>
            </ButtonAdd>
        </HeaderButtonAdd>
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
                        <center>แก้ไข/ลบ</center>
                    </TableHeadcell>
                </Table.Row>
            </Table.Header>
            <TableBody>
                <TableRow >
                    <TableCell>
                        <center>001</center>
                    </TableCell>
                    <TableCell>
                        <center>Fontend Developer</center>
                    </TableCell>
                    <TableCell>
                        <center>
                            <ButtonEdit animated='fade' size='mini'>
                                <Button.Content visible content='แก้ไข'/>
                                <Button.Content hidden >
                                    <Icon name='edit' />
                                </Button.Content>
                            </ButtonEdit>
                            <ButtonAdd animated='fade' size='mini' color="youtube">
                                <Button.Content visible content='ลบ'/>
                                <Button.Content hidden >
                                    <Icon name='trash alternate' />
                                </Button.Content>
                            </ButtonAdd>
                        </center>
                    </TableCell>
                </TableRow>
                <TableRow >
                    <TableCell>
                        <center>001</center>
                    </TableCell>
                    <TableCell>
                        <center>Fontend Developer</center>
                    </TableCell>
                    <TableCell>
                        <center>
                            <ButtonEdit animated='fade' size='mini'>
                                <Button.Content visible content='แก้ไข'/>
                                <Button.Content hidden >
                                    <Icon name='edit' />
                                </Button.Content>
                            </ButtonEdit>
                            <ButtonAdd animated='fade' size='mini' color="youtube">
                                <Button.Content visible content='ลบ'/>
                                <Button.Content hidden >
                                    <Icon name='trash alternate' />
                                </Button.Content>
                            </ButtonAdd>
                        </center>
                    </TableCell>
                </TableRow>
                <TableRow >
                    <TableCell>
                        <center>001</center>
                    </TableCell>
                    <TableCell>
                        <center>Fontend Developer</center>
                    </TableCell>
                    <TableCell>
                        <center>
                            <ButtonEdit animated='fade' size='mini'>
                                <Button.Content visible content='แก้ไข'/>
                                <Button.Content hidden >
                                    <Icon name='edit' />
                                </Button.Content>
                            </ButtonEdit>
                            <ButtonAdd animated='fade' size='mini' color="youtube">
                                <Button.Content visible content='ลบ'/>
                                <Button.Content hidden >
                                    <Icon name='trash alternate' />
                                </Button.Content>
                            </ButtonAdd>
                        </center>
                    </TableCell>
                </TableRow>    
            </TableBody>
        </TablePosition>
    </Div>
)   