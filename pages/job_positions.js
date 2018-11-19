import React from 'react'
import { withLayout } from '../hoc'
import { compose, withProps } from 'recompose'
import styled from 'styled-components'
import { Button , Header , Icon , Table , Modal , Image, Grid , Select , Divider , Comment , Form , Input} from 'semantic-ui-react'

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
    background : #ffe14a !important;
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
const options = [
    { key: 'p', text: 'ผ่านการสัมภาษณ์', value: 'past' },
    { key: 'w', text: 'รอการสัมภาษณ์', value: 'waiting ' },
    { key: 'b', text: 'Blacklist', value: 'blacklist' },
]

const Description = styled(Modal.Description)`
    margin-left: 10% !important;
`;

const TextSpan = styled.span`
    font-size: 16px !important;
    margin-left: 2% !important;
`;

const SelectJob = styled(Select)`
    font-size: 16px !important;
    width: 71% !important;
`;

const TextHeader = styled(Header)`
    font-size: 20px !important;
    width: 114% !important;
`;

const SizeTextInput = styled(Form.Input)`
    width: 114% !important;
    height: 5px !important;
`;

const enhance = compose(
    withProps({
        pageTitle: 'Resume'
    }),
    withLayout
)

export default enhance( ()=> 
    <Div>
        <HeaderName as='h1' floated='left'>
            Job Positions (ตำแหน่งงานที่เปิดรับสมัคร)&nbsp;<Small>( จำนวนตำแหน่งงานที่เปิดรับสมัครทั้งหมด 1 ตำแหน่ง )</Small>
        </HeaderName>
        <HeaderButtonAdd as='h2' floated='right'>
            <Button positive animated='fade' size='medium' style={{"font-family": "'Kanit', sans-serif !important;"}}>
                <Button.Content visible>เพิ่มตำแหน่งงานที่เปิดรับ</Button.Content>
                <Button.Content hidden>
                    <IconAdd name='add' />
                </Button.Content>
            </Button>
        </HeaderButtonAdd>
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
                    <TableRow >
                            <TableCell>
                                <center>001</center>
                            </TableCell>
                            <TableCell>
                                <Modal trigger={<center><p>Fontend Developer</p></center>}>
                                    <Modal.Header><h2>Resume: คุณ Fontend Developer</h2></Modal.Header>
                                        <center> <Image src='https://react.semantic-ui.com/images/wireframe/image.png' wrapped fluid/> </center>
                                        <Divider hidden />
                                        <Description>
                                            <Grid divided='vertically'>
                                                <Grid.Row columns={2}>
                                                    <Grid.Column>
                                                        <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='mini' verticalAlign='middle' circular/> <TextSpan>ผลการสัมภาษณ์ HR</TextSpan>
                                                        <Divider hidden />
                                                        <SelectJob placeholder='เลือกผลการสัมภาษณ์' options={options}/>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='mini' verticalAlign='middle' circular/> <TextSpan>ผลการสัมภาษณ์ Leader</TextSpan>
                                                        <Divider hidden />
                                                        <SelectJob placeholder='เลือกผลการสัมภาษณ์' options={options}/>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                            <Comment.Group>
                                                <TextHeader dividing  style={{"font-family": "'Kanit', sans-serif !important;"}}>
                                                    ความคิดเห็นทั้งหมด <Icon disabled name='comments outline' />
                                                </TextHeader>

                                                <Comment>
                                                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' circular />
                                                        <Comment.Content>
                                                            <Comment.Author as='a'>Leader</Comment.Author>
                                                            <Comment.Metadata>
                                                                <div>Today at 5:42PM</div>
                                                            </Comment.Metadata>
                                                            <Comment.Text>How artistic!</Comment.Text>
                                                            <Comment.Actions>
                                                                <a>แก้ไข</a> <a>ลบ</a>
                                                            </Comment.Actions>
                                                        </Comment.Content>
                                                        <Divider hidden />
                                                        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' circular />
                                                        <Comment.Content>
                                                            <Comment.Author as='a'>Leader</Comment.Author>
                                                            <Comment.Metadata>
                                                                <div>Today at 5:42PM</div>
                                                            </Comment.Metadata>
                                                            <Comment.Text>How artistic!</Comment.Text>
                                                            <Comment.Actions>
                                                                <a>แก้ไข</a> <a>ลบ</a>
                                                            </Comment.Actions>
                                                        </Comment.Content>
                                                </Comment>

                                                <Form reply>
                                                    <SizeTextInput placeholder='กรุณาแสดงความคิดเห็น' rows={2}/>
                                                </Form>
                                                <Divider hidden />
                                            </Comment.Group>
                                            <Divider hidden />
                                        </Description>
                                    <Modal.Actions>
                                        <Button>
                                            <Icon disabled name='cancel' /> ยกเลิก
                                        </Button>
                                        <Button positive>
                                            <Icon disabled name='check' /> ยืนยัน
                                        </Button>
                                    </Modal.Actions>
                                </Modal>
                            </TableCell>
                            <TableCell>
                                <center>2</center>
                            </TableCell>
                            <TableCell>
                                <center>
                                    <Button.Group size='mini'>
                                        <ButtonEdit content='แก้ไข' icon="edit" labelPosition='left' />
                                        <Button.Or text='or' />
                                        <Button color='youtube' content='ลบ' icon="trash alternate" labelPosition='right' />
                                    </Button.Group>
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
                        <center>2</center>
                    </TableCell>
                    <TableCell>
                        <center>
                            <Button.Group size='mini'>
                                <ButtonEdit content='แก้ไข' icon="edit" labelPosition='left' />
                                <Button.Or text='or' />
                                <Button color='youtube' content='ลบ' icon="trash alternate" labelPosition='right' />
                            </Button.Group>
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
                        <center>2</center>
                    </TableCell>
                    <TableCell>
                        <center>
                            <Button.Group size='mini'>
                                <ButtonEdit content='แก้ไข' icon="edit" labelPosition='left' />
                                <Button.Or text='or' />
                                <Button color='youtube' content='ลบ' icon="trash alternate" labelPosition='right' />
                            </Button.Group>
                        </center>
                    </TableCell>
                </TableRow>
            </TableBody>
        </TablePosition>
    </Div>
)   