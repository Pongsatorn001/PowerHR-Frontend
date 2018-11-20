import React from 'react'
import { withLayout } from '../hoc'
import { compose, withProps , withState , withHandlers} from 'recompose'
import theme from '../theme/default';
import Link from 'next/link'
import styled from 'styled-components';
import { TextHeaderTable } from '../components/TextHeader'
import { Table , Button , Icon , Modal , Divider , Description , Grid , TextSpan , Select , Image , Header , Comment , Form } from 'semantic-ui-react'

const Div = styled.div `
    position : relative ;
    background : rgb(255, 255, 255);
    box-shadow : rgb(204, 204, 204) 0px 1px 2px;
    margin-right : 13px;
`;

const TablePosition = styled(Table)`
    padding-left : 50px !important;
    padding-right : 50px !important;
    padding-bottom : 20px !important;
    border: none !important;
    background: #fff !important;
`;

const TableHeadcell = styled(Table.HeaderCell)`
    border-color : #fff !important;
`;

const TableBody = styled(Table.Body)`
    background: #fff !important;
    border-top-width: 100px !important;
`;

const TableRow = styled(Table.Row)`
    border-color : #fff ;
    background: #fff ;
`;

const TableCell = styled(Table.Cell)`
    border-top : none !important;
`;

const ButtonEdit = styled(Button)`
    color : #000 !important;
    background : #fff700 !important;
    font-family : 'Kanit', sans-serif !important;
`;

const ButtonAdd = styled(Button)`
    font-family : 'Kanit', sans-serif !important;
`;

const SelectJob = styled(Select)`
    font-size: 16px !important;
    width: 65% !important;
`;

const options = [
    { key: 'p', text: 'ผ่านการสัมภาษณ์', value: 'past' },
    { key: 'w', text: 'รอการสัมภาษณ์', value: 'waiting ' },
    { key: 'b', text: 'Blacklist', value: 'blacklist' },
];

const TextHeader = styled(Header)`
    font-size: 20px !important;
    width: 114% !important;
`;


const SizeTextInput = styled(Form.Input)`
    width: 114% !important;
    height: 5px !important;
`;

const MarginGrid = styled(Grid)`
    margin-left: 10% !important;
`;

const MarginComment = styled(Comment.Group)`
    margin-left: 12% !important;
`;

const ColorModelHeader = styled(Modal.Header)`
    background-color: ${theme.colors.gray}
`;

const enhance = compose(
    withProps({
        pageTitle: 'Resume'
    }),
    withLayout,
    withState('list','setList',[{id: '001', name: 'พงศธร', lastName: 'จันด้วง', rate: '20000', status: 'รอกการสัมภาษณ์'},{id: '002', name: 'กิตปกรณ์', lastName: 'ทองเงิน', rate: '30000', status: 'ผ่านกการสัมภาษณ์'}]),
    withState('closeModel','setCloseModel',true),
    withHandlers({
        handleOnClickCancel: props => l => event => {
            props.setCloseModel(l)
            props.setCloseModel(false)
        },
    })
);

let count = 3
let job_pos_name = 'Resume'
let job_pos_des = `จำนวน Resume ทั้งหมด ${count} ตำแหน่ง`
let job_button_name = 'เพิ่ม Resume'

export default enhance( (props)=> 
    <Div>
        {TextHeaderTable(job_pos_name , job_pos_des , job_button_name)}
        <TablePosition striped>
            <Table.Header>
                <Table.Row>
                    <TableHeadcell>
                        <center>รหัส</center>
                    </TableHeadcell>
                    <TableHeadcell>
                        <center>ชื่อ</center>
                    </TableHeadcell>
                    <TableHeadcell>
                        <center>นามสกุล</center>
                    </TableHeadcell>
                    <TableHeadcell>
                        <center>Reat</center>
                    </TableHeadcell>
                    <TableHeadcell>
                        <center>สถานะ</center>
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
                                <Modal trigger={<center>{l.name}</center>}>
                                    <ColorModelHeader>Resume : คุณ{l.name}&nbsp; {l.lastName}</ColorModelHeader>
                                        <Modal.Content image scrolling>
                                            <Image src='https://s.isanook.com/hm/0/rp/r/w700/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL2htLzAvdWQvMS84MDY5L21haW5fb2ZmaWNlLmpwZw==.jpg' fluid/>
                                        </Modal.Content>
                                        <Modal.Description>
                                            <MarginGrid columns={2}>
                                                <Grid.Column>
                                                    <p><Icon circular inverted name='users' size='large'/> ผลการสัมภาษณ์ HR</p>
                                                    <SelectJob placeholder='เลือกผลการสัมภาษณ์' options={options}/>
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <p><Icon circular inverted name='users' size='large'/> ผลการสัมภาษณ์ Leader</p>
                                                    <SelectJob placeholder='เลือกผลการสัมภาษณ์' options={options}/>
                                                </Grid.Column>
                                            </MarginGrid>
                                            <MarginComment>
                                                <Header as='h3' dividing>
                                                    Comments
                                                </Header>

                                                <Comment>
                                                    <Comment.Avatar src='https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' />
                                                    <Comment.Content>
                                                        <Comment.Author as='a'>HR</Comment.Author>
                                                        <Comment.Metadata>
                                                        <div>Today at 5:42PM</div>
                                                        </Comment.Metadata>
                                                        <Comment.Text>คุณสมบัติทั่วไปผ่าน !!</Comment.Text>
                                                        <Comment.Actions>
                                                            <Comment.Action>แก้ไข</Comment.Action>
                                                            <Comment.Action>ลบ</Comment.Action>
                                                        </Comment.Actions>
                                                    </Comment.Content>
                                                </Comment>

                                                <Comment>
                                                    <Comment.Avatar src='https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' />
                                                    <Comment.Content>
                                                        <Comment.Author as='a'>Leader</Comment.Author>
                                                        <Comment.Metadata>
                                                            <div>Yesterday at 12:30AM</div>
                                                        </Comment.Metadata>
                                                        <Comment.Text>
                                                            <p>เดี่ยวลองสัมภาษณ์ดู ^_^</p>
                                                        </Comment.Text>
                                                        <Comment.Actions>
                                                            <Comment.Action>แก้ไข</Comment.Action>
                                                            <Comment.Action>ลบ</Comment.Action>
                                                        </Comment.Actions>
                                                    </Comment.Content>
                                                    <Comment.Group>
                                                        <Comment>
                                                        <Comment.Avatar src='https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' />
                                                        <Comment.Content>
                                                            <Comment.Author as='a'>HR</Comment.Author>
                                                            <Comment.Metadata>
                                                            <div>Just now</div>
                                                            </Comment.Metadata>
                                                            <Comment.Text>ได้ !!</Comment.Text>
                                                            <Comment.Actions>
                                                                <Comment.Action>แก้ไข</Comment.Action>
                                                                <Comment.Action>ลบ</Comment.Action>
                                                            </Comment.Actions>
                                                        </Comment.Content>
                                                        </Comment>
                                                    </Comment.Group>
                                                </Comment>

                                                <Form reply>
                                                    <SizeTextInput placeholder="แสดงความคิดเห็น"/>
                                                </Form>
                                                <Divider hidden />
                                            </MarginComment>
                                        </Modal.Description>
                                        <Divider hidden />
                                    <Modal.Actions>
                                    <Button onClick={props.handleOnClickCancel(l)}>
                                        <Icon name='close' /> ปิด 
                                    </Button>
                                    </Modal.Actions>
                                </Modal>
                            </TableCell>
                            <TableCell>
                                <center>{l.lastName}</center>
                            </TableCell>
                            <TableCell>
                                <center>{l.rate}</center>
                            </TableCell>
                            <TableCell>
                                <center>{l.status}</center>
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
                    )
                }
            </TableBody>
        </TablePosition>
    </Div>
)