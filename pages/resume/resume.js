import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps , withState , withHandlers} from 'recompose'
import theme from '../../theme/default';
import styled from 'styled-components';
import Link from 'next/link'
import { TextHeaderTable } from '../../components/TextHeader'
import { Table , Breadcrumb , Button , Icon , Modal , Divider , Grid , Input , Select , Header , Comment , Form , Radio } from 'semantic-ui-react'
import { Breadcrumb2Page } from '../../components/Breadcrumb'

const Div = styled.div `
    position : relative ;
    background : ${theme.colors.elementBackground};
    box-shadow : ${theme.colors.boxShadow};
    margin-right : 13px;
`;

const TablePosition = styled(Table)`
    padding-left : 50px !important;
    padding-right : 50px !important;
    padding-bottom : 20px !important;
    border: none !important;
    background: ${theme.colors.elementBackground} !important;
`;

const TableHeadcell = styled(Table.HeaderCell)`
    border-color : ${theme.colors.elementBackground} !important;
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

const TableCell = styled(Table.Cell)`
    border-top : none !important;
`;

const ButtonEdit = styled(Button)` 
    color : ${theme.colors.fontBlack} !important;
    background : ${theme.colors.buttonEdit} !important;
    font-family : 'Kanit', sans-serif !important;
`;

const ButtonAdd = styled(Button)`
    font-family : 'Kanit', sans-serif !important;
`;

const SelectJob = styled(Select)`
    font-size: 16px !important;
    width: 65% !important;
`;

const TextHeader = styled(Header)`
    font-weight: 500 !important;
    font-size: 20px !important;
    width: 100% !important;
    font-family: 'Kanit', sans-serif !important;
`;


const SizeTextInput = styled(Form.Input)`
    width: 100% !important;
    height: 5px !important;
`;

const MarginGrid = styled(Grid)`
    margin-left: 10% !important;
`;

const MarginComment = styled(Comment.Group)`
    margin-left: 12% !important;
`;

const ColorModelHeader = styled(Modal.Header)`
    font-weight: 500 !important;
    font-family: 'Kanit', sans-serif !important;
    color: ${theme.colors.elementBackground} !important;
    background-color: ${theme.colors.ping} !important;
`;

const HeaderContent = styled(Header)`
    font-family : 'Kanit', sans-serif !important;
`;

const ButtonClose = styled(Button)`
    font-family : 'Kanit', sans-serif !important;
`;

const Sizeiframe = styled.iframe`
    width: 100% !important;
    height: 500px !important;
    border: 0 !important;
`;

const EditComment = styled(Input)`
    width: 100% !important;
`;

const enhance = compose(
    withProps({
        pageTitle: 'Resume'
    }),
    withLayout,
    withState('list','setList',[{id: '001', file: 'https://www.mogen.co.th/imgadmins/resume/20180226150849.pdf', name: 'พงศธร', lastName: 'จันด้วง', rate: '20000', status: 'รอการสัมภาษณ์'},{id: '002', file: 'https://www.mogen.co.th/imgadmins/resume/20180226150849.pdf', name: 'กิตปกรณ์', lastName: 'ทองเงิน', rate: '30000', status: 'ผ่านการสัมภาษณ์'}]),
    withState('comment','setComment',[{nameComment: 'HR', textComment: 'คุณสมบัติทั่วไปผ่าน'},{nameComment: 'Leader', textComment: 'เรียกสัมภาษณ์ได้เลย'}]),
    withState(''),
    withHandlers({
        handleChange : props => () => event => {
            
        },
        handleClickModal: props => () => {            
            return(
                <Modal.Description>
                    <MarginGrid colu    mns={2}>
                        <Grid.Column>
                            <p><Icon circular inverted name='users' size='large'/> ผลการสัมภาษณ์ HR </p>
                                <Form>
                                    <Form.Field>
                                        <Radio 
                                            label='ผ่านการสัมภาษณ์' 
                                            value='this'
                                            
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Radio 
                                            label='ผ่านการสัมภาษณ์' 
                                            value='that'
                                        />
                                    </Form.Field>
                                </Form>
                            {/* <SelectJob placeholder='เลือกผลการสัมภาษณ์' options={props.option}></SelectJob> */}
                        </Grid.Column>
                        <Grid.Column>
                            <p><Icon circular inverted name='users' size='large'/> ผลการสัมภาษณ์ Leader </p>
                            <SelectJob placeholder='เลือกผลการสัมภาษณ์' options={props.option}/>
                        </Grid.Column>
                    </MarginGrid>
                    <MarginComment>
                        <TextHeader as='h3' dividing> ความคิดเห็นทั้งหมด </TextHeader>
                            {
                                props.comment.map( (dataComment) =>
                                    <Comment>
                                        <Comment.Avatar src='https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' />
                                            <Comment.Content>
                                                <Comment.Author as='a'>{dataComment.nameComment}</Comment.Author>
                                                    <Comment.Metadata>
                                                        <div>Today at 5:42PM</div>
                                                    </Comment.Metadata>
                                                    <Comment.Text>{dataComment.textComment}</Comment.Text>
                                                        <Comment.Actions>
                                                            <Comment.Action>
                                                                <Modal trigger={<p>แก้ไข</p>} size="tiny" closeIcon centered={false}>
                                                                    <Header icon='archive' content='แก้ไขความคิดเห็น' />
                                                                        <Modal.Content>
                                                                            <p>
                                                                                แสดงความคิดเห็น: <br/>
                                                                                    <EditComment placeholder='แสดงความคิดเห็น' defaultValue={dataComment.textComment} />
                                                                            </p>
                                                                        </Modal.Content>
                                                                        <Modal.Actions>
                                                                            <Button color='red'>
                                                                                <Icon name='remove' /> ยกเลิก
                                                                            </Button>
                                                                            <Button color='green'>
                                                                                <Icon name='checkmark' /> ตกลง
                                                                            </Button>
                                                                        </Modal.Actions>
                                                                </Modal>
                                                            </Comment.Action>
                                                            <Comment.Action>
                                                                <Modal trigger={<p>ลบ</p>} size="tiny" closeIcon centered={false}>
                                                                    <Header icon='archive' content='ลบความคิดเห็นใช่หรือไม่ ?' />
                                                                    <Modal.Content>
                                                                        <p>
                                                                            คุณต้องการลบข้อมูลความเห็น: <b>" {dataComment.textComment} "</b> ใช่หรือไม่ ?
                                                                        </p>
                                                                    </Modal.Content>
                                                                    <Modal.Actions>
                                                                        <Button color='red'>
                                                                                <Icon name='remove' /> ยกเลิก
                                                                        </Button>
                                                                        <Button color='green'>
                                                                            <Icon name='checkmark' /> ตกลง
                                                                        </Button>
                                                                    </Modal.Actions>
                                                                </Modal>
                                                            </Comment.Action>
                                                        </Comment.Actions>
                                            </Comment.Content>
                                    </Comment>
                                                )
                            }
                            <Form reply>
                                <SizeTextInput placeholder="แสดงความคิดเห็น"/>
                            </Form>
                            <Divider hidden />
                    </MarginComment>
                </Modal.Description>
            )
        },
    }),
);


let job_pos_name = 'ประวัติผู้สมัคร ( Resume )'
let job_pos_des = 'คน'
let job_button_name = 'เพิ่มประวัติผู้สมัคร'
let link ='/resume/addResume'

export default enhance( (props)=> 
    <div>
        {Breadcrumb2Page('ตำแหน่งานที่เปิดรับสมัคร' , 'ประวัติส่วนตัวผู้สมัคร' , '/jobPositions/jobPositions')}
        <Divider hidden />
        <Div>
        {TextHeaderTable(job_pos_name , props.list.length , job_button_name , job_pos_des, link , props.url.query.position)}
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
                        <center>Rate</center>
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
                    props.list.map( (dataResume, i)=>
                        <TableRow key={i}>
                            <TableCell>
                                <Modal trigger={<center>{i+1}</center>}>
                                    <ColorModelHeader>Resume : คุณ{dataResume.name}&nbsp; {dataResume.lastName}</ColorModelHeader>
                                    <Modal.Content>
                                        <Sizeiframe src={dataResume.file}></Sizeiframe>
                                    </Modal.Content>
                                    {props.handleClickModal()}
                                    <Divider hidden />
                                    <Modal.Actions>
                                    <ButtonClose>
                                        <Icon name='close' /> ปิด 
                                    </ButtonClose>
                                    </Modal.Actions>
                                </Modal>
                            </TableCell>
                            <TableCell>
                                <Modal trigger={<center>{dataResume.name}</center>}>
                                    <ColorModelHeader>Resume : คุณ{dataResume.name}&nbsp; {dataResume.lastName}</ColorModelHeader>
                                    <Modal.Content>
                                        <Sizeiframe src={dataResume.file}></Sizeiframe>
                                    </Modal.Content>
                                    {props.handleClickModal()}
                                    <Divider hidden />
                                    <Modal.Actions>
                                    <ButtonClose>
                                        <Icon name='close' /> ปิด 
                                    </ButtonClose>
                                    </Modal.Actions>
                                </Modal>
                            </TableCell>
                            <TableCell>
                                <Modal trigger={<center>{dataResume.lastName}</center>}>
                                    <ColorModelHeader>Resume : คุณ{dataResume.name}&nbsp; {dataResume.lastName}</ColorModelHeader>
                                    <Modal.Content>
                                        <Sizeiframe src={dataResume.file}></Sizeiframe>
                                    </Modal.Content>
                                    {props.handleClickModal()}
                                    <Divider hidden />
                                    <Modal.Actions>
                                    <ButtonClose>
                                        <Icon name='close' /> ปิด 
                                    </ButtonClose>
                                    </Modal.Actions>
                                </Modal>
                            </TableCell>
                            <TableCell>
                                <Modal trigger={<center>{dataResume.rate}</center>}>
                                    <ColorModelHeader>Resume : คุณ{dataResume.name}&nbsp; {dataResume.lastName}</ColorModelHeader>
                                    <Modal.Content>
                                        <Sizeiframe src={dataResume.file}></Sizeiframe>
                                    </Modal.Content>
                                    {props.handleClickModal()}
                                    <Divider hidden />
                                    <Modal.Actions>
                                    <ButtonClose>
                                        <Icon name='close' /> ปิด 
                                    </ButtonClose>
                                    </Modal.Actions>
                                </Modal>
                            </TableCell>
                            <TableCell>
                                <Modal trigger={<center>{dataResume.status}</center>}>
                                    <ColorModelHeader>Resume : คุณ{dataResume.name}&nbsp; {dataResume.lastName}</ColorModelHeader>
                                    <Modal.Content>
                                        <Sizeiframe src={dataResume.file}></Sizeiframe>
                                    </Modal.Content>
                                    {props.handleClickModal()}
                                    <Divider hidden />
                                    <Modal.Actions>
                                    <ButtonClose>
                                        <Icon name='close' /> ปิด 
                                    </ButtonClose>
                                    </Modal.Actions>
                                </Modal>
                            </TableCell>
                            <TableCell>
                                <center>
                                    <Link href={{ pathname:'/resume/editResume', query: { id : dataResume.id }}}>
                                        <ButtonEdit animated='fade' size='mini'>
                                            <Button.Content visible content='แก้ไข'/>
                                            <Button.Content hidden >
                                                <Icon name='edit' />
                                            </Button.Content>
                                        </ButtonEdit>
                                    </Link>
                                        <Modal 
                                            trigger={
                                                <ButtonAdd animated='fade' size='mini' color="youtube">
                                                    <Button.Content visible content='ลบ'/>
                                                    <Button.Content hidden >
                                                        <Icon name='trash alternate' />
                                                    </Button.Content>
                                                </ButtonAdd>
                                            }
                                            size="tiny"
                                            closeIcon
                                        >
                                            <HeaderContent icon='archive' content='ลบข้อมูลผู้สมัคร' />
                                                <Modal.Content>
                                                    <p>
                                                        คุณต้องการลบข้อมูล <b>{dataResume.name} {dataResume.lastName}</b> ใช่หรือไม่ ?
                                                    </p>
                                                </Modal.Content>
                                            <Modal.Actions>
                                                <ButtonAdd>
                                                    <Icon name='remove' /> ยกเลิก
                                                </ButtonAdd>
                                                <ButtonAdd color='green'>
                                                    <Icon name='checkmark' /> ตกลง
                                                </ButtonAdd>
                                            </Modal.Actions>
                                        </Modal>
                                    </center>
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </TablePosition>
        </Div>
    </div>
)