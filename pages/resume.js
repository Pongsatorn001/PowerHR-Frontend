import React from 'react'
import { withLayout } from '../hoc'
import { compose, withProps } from 'recompose'
import theme from '../theme/default';
import styled from 'styled-components';
import { Table } from 'semantic-ui-react'

const enhance = compose(
    withProps({
        pageTitle: 'Resume'
    }),
    withLayout
)

const H1 = styled.h1`
    color: ${theme.colors.textTitle};
    margin-left: 88px;
    font-size: 30px;
    margin-top: 55px;
`

const Suggestion = styled.p`
    color: ${theme.colors.gray};
    margin-left: 88px;
    font-size: 20px;
    margin-top: 9px;
`

const TablePositionResume = styled.table`
    margin-left: 88px;
    width: 50%;
    border: 1;
`

const DetailTable = [
    'Fontend Developer',
    'Blackend Developer',
]

const Row = styled.table`
    background-color: ${theme.colors.gray};
`

export default enhance( ()=> 
    <div>
        <H1>Resume</H1>
        <Suggestion>กรุณาเลือกตำแหน่งงานที่ต้องการดู Resume</Suggestion>

        
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ตำแหน่ง</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {DetailTable.map(Detail => (
                        <Table.Row>
                            <Table.Cell>{Detail}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        


        
    </div>
)