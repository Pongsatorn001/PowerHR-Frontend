import React from 'react'
import { withLayout } from '../hoc'
import { compose, withProps } from 'recompose'
import styled from 'styled-components'
import { Button , Input , Header , Icon , Table } from 'semantic-ui-react'

const HeaderName = styled(Header)`
    padding-top : 30px !important;
    padding-left : 50px !important;
    color : #515151 !important;
`;

const HeaderSearch = styled(Header)`
    padding-top : 20px !important;
    padding-left : 50px !important;
`;

const HeaderButtonAdd = styled(Header)`
    padding-top : 20px !important;
    padding-right : 87px !important;
`;

const TablePosition = styled(Table)`
    padding-left : 50px !important;
    padding-right : 100px !important;
    border: none !important;
    background: #f9f9f9 !important;
`;

const TableBody = styled(Table.Body)`
    background: #fff !important;
    border-top-width: 100px !important;
`;

const TableRow = styled(Table.Row)`
    border-color : #f9f9f9 !important;
`;

const TableHeadcell = styled(Table.HeaderCell)`
    border-color : #f9f9f9 !important;
`;

const ButtonEdit = styled(Button)`
    color : #000 !important;
    background : #ffe14a !important;
`;

const IconAdd = styled(Icon)`
    padding-left : 8px !important;
`;

const enhance = compose(
    withProps({
        pageTitle: 'Resume'
    }),
    withLayout
)

export default enhance( ()=> 
    <div>
        <HeaderName as='h2'>Positions (ตำแหน่ง)</HeaderName>
        <HeaderSearch as='h6' floated='left'>
            <Input icon='search' placeholder='Search...' />
        </HeaderSearch>
        <HeaderButtonAdd as='h2' floated='right'>
            <Button positive animated='vertical' size='medium'>
                <Button.Content visible>เพิ่มตำแหน่ง</Button.Content>
                <Button.Content hidden>
                    <IconAdd name='add' />
                </Button.Content>
            </Button>
        </HeaderButtonAdd>
        <TablePosition>
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
                <TableRow>
                    <Table.Cell>
                        <center>001</center>
                    </Table.Cell>
                    <Table.Cell>
                        <center>Fontend Developer</center>
                    </Table.Cell>
                    <Table.Cell>
                        <center>
                            <Button.Group size='mini'>
                                <ButtonEdit content='แก้ไข' icon="edit" labelPosition='left' />
                                <Button.Or text='or' />
                                <Button color='youtube' content='ลบ' icon="trash alternate" labelPosition='right' />
                            </Button.Group>
                        </center>
                    </Table.Cell>
                </TableRow>
            </TableBody>
        </TablePosition>
    </div>
)