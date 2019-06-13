import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps , withState , withHandlers , lifecycle } from 'recompose'
import theme from '../../theme/default';
import styled from 'styled-components';
import { TextHeaderTable } from '../../components/TextHeader'
import { Table , Breadcrumb , Button , Icon , Modal , Divider , Grid , Input , Select , Header , Comment , Form , Radio , value } from 'semantic-ui-react'
import { Breadcrumb2Page } from '../../components/Breadcrumb'
import { inject, observer } from 'mobx-react'
import { firebase } from '../../firebase/index'

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
    withLayout,
    inject('authStore'),
    withProps({
        pageTitle: 'Resume'
    }),
    withState('redio' , 'setRedio' , true),
    withState('list','setList'),
    withState('users','setUsers'),
    withState('comment','setComment',[{nameComment: 'HR', textComment: 'คุณสมบัติทั่วไปผ่าน'},{nameComment: 'Leader', textComment: 'เรียกสัมภาษณ์ได้เลย'}]),
    withState('hrChecked','setHrChecked'),
    withState('leaderChecked', 'setLeaderChecked'),
    withState('openModel','setOpenModel', false),
    withState('openModelLastName','setOpenModelLastName', false),
    withState('openModelRate','setOpenModelRate', false),
    withState('openModelStatus','setOpenModelStatus', false),
    withState('hrOpenModelEditStatus', 'setHrOpenModelEditStatus', false),
    withState('leaderOpenModelEditStatus', 'setLeaderOpenModelEditStatus', false),
    withState('resume_pdf' , 'setResume_pdf'),
    withState('resume_firstname' , 'setResume_firstname'),
    withState('resume_lastname' , 'setResume_lastname'),
    withState('resume_pdf' , 'setResume_pdf'),
    withState('resumeData' , 'setResumeData'),
    withHandlers({
        initGetResumeInJobsPosition: props => () => {
            firebase.database()
            .ref("apply_jobs")
            .orderByChild("job_position_id")
            .equalTo(props.url.query.id)
            .once("value").then( snapshot => {
                props.setList(Object.values(snapshot.val()))
            })
        },
        initGetUserData: props => () => {
            firebase.database().ref('users')
            .orderByChild("role")
            .equalTo("user")
            .once("value").then( snapshot => {
                props.setUsers(Object.values(snapshot.val()))
            })
        },
        handleOnChangeHrStatus: props => (hrChecked) => event => {
            props.setHrChecked(hrChecked)
        },
        handleOnChangeLeaderStatus: props => (leaderChecked) => event => {
            props.setLeaderChecked(leaderChecked)
        },

    }),
    withHandlers({
        handleSubmitChangeStatus: props => (applyJobId , leaderStatus) => {
            if (props.hrChecked <= 2) {
                firebase.database().ref('apply_jobs/' + applyJobId).update({ 
                    hr_status : props.hrChecked,
                    status : props.hrChecked
                })
                props.initGetResumeInJobsPosition()
                props.initGetUserData()
                props.setHrOpenModelEditStatus(false)
                props.setOpenModelRate(false)
            }
            else if (props.hrChecked === 3 && !leaderStatus) {
                firebase.database().ref('apply_jobs/' + applyJobId).update({ 
                    hr_status : props.hrChecked,
                    status : 2
                })
                props.initGetResumeInJobsPosition()
                props.initGetUserData()
                props.setHrOpenModelEditStatus(false)
                props.setOpenModelRate(false)
            }
            else if (props.hrChecked === 3 && leaderStatus === 3) {
                firebase.database().ref('apply_jobs/' + applyJobId).update({ 
                    hr_status : 3,
                    leader_status : 3,
                    status : 3
                })
                props.initGetResumeInJobsPosition()
                props.initGetUserData()
                props.setHrOpenModelEditStatus(false)
                props.setOpenModelRate(false)
            }
            else{
                firebase.database().ref('apply_jobs/' + applyJobId).update({ 
                    hr_status : 4,
                    status : 4,
                    leader_status: null
                })
                props.initGetResumeInJobsPosition()
                props.initGetUserData()
                props.setHrOpenModelEditStatus(false)
                props.setOpenModelRate(false)
            }
            
        },
        handleSubmitLeaderChangeStatus: props => (applyJobId) => {
            firebase.database().ref('apply_jobs/' + applyJobId).update({ 
                leader_status : props.leaderChecked,
                status : props.leaderChecked === 3 && props.hrChecked === 3 ? 3 : props.hrChecked <= 2 ? 2 : 4
            })
            props.initGetResumeInJobsPosition()
            props.initGetUserData()
            props.setLeaderOpenModelEditStatus(false)
            props.setOpenModelRate(false)
        },
    }),
    lifecycle({
        async componentDidMount(){
            await this.props.initGetResumeInJobsPosition()
            await this.props.initGetUserData()
            
        }
    }),
    withHandlers({
        handleClickChange : props => () => event => {
            props.setRedio(false)
        },
        handleClickModal: props => (resumeData) => {  
            return(
                <Modal.Description>
                    <MarginGrid columns={2}>
                        <Grid.Column>
                            <p><Icon circular inverted name='users' size='large'/> HR สถานะของผู้สมัคร</p>
                            <Modal 
                                trigger={
                                    <ButtonEdit animated='fade' size='tiny' onClick={()=> props.setHrOpenModelEditStatus(true)} disabled={props.authStore.userData.role === 'Leader' ? true : false}>
                                        <Button.Content visible content='แก้ไข'/>
                                        <Button.Content hidden >
                                            <Icon name='edit' />
                                        </Button.Content>
                                    </ButtonEdit>
                                }
                                open={props.hrOpenModelEditStatus}
                                dimmer="blurring"
                            >
                                <ColorModelHeader icon='archive' content='แก้ไขผลการสมัคร : ฝ่ายบุคคลระดับผู้จัดการ' />
                                <Modal.Content>
                                <Form>
                                    {
                                        resumeData && resumeData.status < 2
                                        ?   <div>
                                                <Form.Field>
                                                    <Radio
                                                        label='ไม่ผ่านการพิจารณา'
                                                        name='HrSelectStatus'
                                                        checked={props.hrChecked ? props.hrChecked === 1 : null}
                                                        onChange={props.handleOnChangeHrStatus(1)}
                                                    />
                                                </Form.Field>
                                                <Form.Field>
                                                    <Radio
                                                        label='เรียกสัมภาษณ์'
                                                        name='HrSelectStatus'
                                                        checked={props.hrChecked ? props.hrChecked === 2 : null}
                                                        onChange={props.handleOnChangeHrStatus(2)}
                                                    />
                                                </Form.Field>
                                            </div>
                                        :   <div>
                                                <Form.Field>
                                                    <Radio
                                                        label='ผ่านการสัมภาษณ์'
                                                        name='HrSelectStatus'
                                                        checked={props.hrChecked ? props.hrChecked === 3 :null}
                                                        onChange={props.handleOnChangeHrStatus(3)}
                                                    />
                                                </Form.Field>
                                                <Form.Field>
                                                    <Radio
                                                        label='ไม่ผ่านการสัมภาษณ์'
                                                        name='HrSelectStatus'
                                                        checked={props.hrChecked ? props.hrChecked === 4 : null}
                                                        onChange={props.handleOnChangeHrStatus(4)}
                                                    />
                                                </Form.Field>
                                            </div>
                                    }
                                </Form>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red' onClick={()=> props.setHrOpenModelEditStatus(false)}>
                                        <Icon name='remove' /> ยกเลิก
                                    </Button>
                                    <Button color='green' onClick={()=> props.handleSubmitChangeStatus(resumeData.apply_job_id,resumeData.leader_status)}>
                                        <Icon name='checkmark' /> บันทึก
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                            &nbsp;| {
                                        resumeData &&
                                            resumeData.hr_status === 1
                                                ? "ไม่ผ่านการพิจารณา"
                                                : resumeData && resumeData.hr_status === 2
                                                    ? "เรียกสัมภาษณ์"
                                                    : resumeData && resumeData.hr_status === 3
                                                        ? "ผ่านการสัมภาษณ์"
                                                        : resumeData && resumeData.hr_status === 4
                                                            ? "ไม่ผ่านการสัมภาษณ์"
                                                            : "รอการสัมภาษณ์"
                                    }
                        </Grid.Column>
                        <Grid.Column>
                            <p><Icon circular inverted name='users' size='large'/> Leader เลือกสถานะของผู้สมัคร</p>
                            <Modal trigger={
                                        <ButtonEdit 
                                            animated='fade' 
                                            size='tiny' 
                                            onClick={()=> props.setLeaderOpenModelEditStatus("true")}
                                            disabled={resumeData && resumeData.status < 2 || resumeData && resumeData.status === 4 && resumeData.leader_status ? true : false}
                                        >
                                            <Button.Content visible content='แก้ไข'/>
                                            <Button.Content hidden >
                                                <Icon name='edit' />
                                            </Button.Content>
                                        </ButtonEdit>
                                            
                                        }
                                        open={props.leaderOpenModelEditStatus}
                                        dimmer="blurring"
                                    >
                                <ColorModelHeader icon='archive' content='แก้ไขผลการสมัคร : หัวหน้างานแต่ละตำแหน่งงาน' />
                                <Modal.Content>
                                <Form>
                                    <Form.Field>
                                        <Radio
                                            label='ผ่านการสัมภาษณ์'
                                            name='radioGroup'
                                            checked={props.leaderChecked ? props.leaderChecked === 3 : null}
                                            onChange={props.handleOnChangeLeaderStatus(3)}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Radio
                                            label='ไม่ผ่านการสัมภาษณ์'
                                            name='radioGroup'
                                            checked={props.leaderChecked ? props.leaderChecked === 4 : null}
                                            onChange={props.handleOnChangeLeaderStatus(4)}
                                        />
                                    </Form.Field>
                                </Form>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red' onClick={()=> props.setLeaderOpenModelEditStatus(false)}>
                                        <Icon name='remove' /> ยกเลิก
                                    </Button>
                                    <Button color='green' onClick={() => props.handleSubmitLeaderChangeStatus(resumeData.apply_job_id)}>
                                        <Icon name='checkmark' /> บันทึก
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                            &nbsp;| {
                                        resumeData &&
                                            resumeData.leader_status === 3
                                            ? "ผ่านการสัมภาษณ์"
                                            : resumeData && resumeData.leader_status === 4
                                                ? "ไม่ผ่านการสัมภาษณ์"
                                                : "พิจารณาการสัมภาษณ์"
                                    }
                        </Grid.Column>
                    </MarginGrid>
                    <MarginComment>
                        <TextHeader as='h3' dividing> ความคิดเห็นทั้งหมด </TextHeader>
                            {
                                props.comment.map( (dataComment , i) =>
                                    <Comment key={i}>
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
        handleSetData: props => (dataResume) => {
            props.setOpenModelRate(true)
            props.setResume_pdf(dataResume.resume_pdf)
            props.setResumeData(dataResume)
            props.users.map( user => {
                if (user.uid === dataResume.uid) {
                    props.setResume_firstname(user.firstname)
                    props.setResume_lastname(user.lastname)
                }
            })
        }
    }),
    observer
);


let job_pos_name = 'ประวัติผู้สมัคร'
let job_pos_des = 'คน'
let job_button_name = 'เพิ่มประวัติผู้สมัคร'
let link ='/resume/addResume'

export default enhance( (props)=> 
    <div>
        {Breadcrumb2Page('ตำแหน่งานที่เปิดรับสมัคร' , 'ประวัติผู้สมัคร' , '/jobPositions/jobPositions')}
        <Divider hidden />
            <Div>
                {TextHeaderTable(job_pos_name ,props.list ?  props.list.length : 0 , job_button_name , job_pos_des, link , props.url.query.id , true , props.authStore.userData.role)}
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
                                <center>Rate (บาท)</center>
                            </TableHeadcell>
                            <TableHeadcell>
                                <center>สถานะ</center>
                            </TableHeadcell>
                            <TableHeadcell>
                                <center>ดูรายละเอียด</center>
                            </TableHeadcell>
                        </Table.Row>
                    </Table.Header>
                    <TableBody>
                        {
                            props.list && props.list.map( (dataResume, i)=>
                                props.users &&
                                props.users.map( user => {
                                    return ( 
                                        user.uid === dataResume.uid && user.blacklist === false
                                        ?   <TableRow key={i}><TableCell>
                                                <label style={{ marginLeft : '35%' }} onClick={() => props.setOpenModel("true")}>
                                                {
                                                    user.uid === dataResume.uid ? user.firstname : null
                                                }
                                                </label>
                                                </TableCell>
                                                <TableCell>
                                                <label style={{ marginLeft : '35%'}} onClick={() => props.setOpenModelLastName("true")}>
                                                {
                                                    user.uid === dataResume.uid ? user.lastname : null
                                                }
                                                </label>
                                                </TableCell>
                                                <TableCell>
                                                    <label style={{ marginLeft : '35%' }} onClick={() => props.setOpenModelRate("true")}>
                                                        {dataResume.rate}
                                                    </label>
                                                </TableCell>
                                                <TableCell>
                                                <label style={{ marginLeft : '35%'}} onClick={() => props.setOpenModelStatus("true")}>
                                                {
                                                    dataResume.status === 1
                                                    ? "ไม่ผ่านการพิจารณา"
                                                    : dataResume.status === 2
                                                        ? "เรียกสัมภาษณ์"
                                                        : dataResume.status === 3
                                                            ? "ผ่านการสัมภาษณ์"
                                                            : dataResume.status === 4
                                                                ? "ไม่ผ่านการสัมภาษณ์"
                                                                : "รอการสัมภาษณ์"
                                                }
                                                </label>
                                                </TableCell>
                                                <TableCell>
                                                    <center>
                                                            <ButtonAdd animated='fade' size='mini' color="blue" onClick={() => props.handleSetData(dataResume)}>
                                                                <Button.Content visible content='คลิ๊ก'/>
                                                                <Button.Content hidden >
                                                                    <Icon name='search' />
                                                                </Button.Content>
                                                            </ButtonAdd>
                                                    </center>
                                                </TableCell>
                                            </TableRow>
                                        : null
                                )})
                            )
                        }
                        <Modal open={props.openModelRate} dimmer="blurring">
                            <ColorModelHeader>Resume : คุณ
                                {
                                    props.resume_firstname
                                }
                                &nbsp; 
                                {
                                    props.resume_lastname
                                }
                            </ColorModelHeader>
                            <Modal.Content>
                                <Sizeiframe src={props.resume_pdf}></Sizeiframe>
                            </Modal.Content>
                            {props.handleClickModal(props.resumeData)}
                            <Divider hidden />
                            <Modal.Actions>
                            <ButtonClose onClick={()=> props.setOpenModelRate(false)}>
                                <Icon name='close' /> ปิด 
                            </ButtonClose>
                            </Modal.Actions>
                        </Modal>
                    </TableBody>
                </TablePosition>
                {   !props.list ? <div><center>ไม่มีข้อมูลการสมัครงาน</center><br/><br/></div> : null}
                
            </Div>
    </div>
)