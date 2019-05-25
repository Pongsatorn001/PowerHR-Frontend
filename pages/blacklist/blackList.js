import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps , withState , withHandlers , lifecycle} from 'recompose'
import styled from 'styled-components'
import { Button , Icon , Table , Modal , Header } from 'semantic-ui-react'
import { TextHeaderTable } from '../../components/TextHeader'
import theme from '../../theme/default';
import { inject } from 'mobx-react'
import { firebase } from '../../firebase/index'

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
    withLayout,
    inject('authStore'),
    withState('list' , 'setlist'),
    withState('blacklist' , 'setBlacklist'),
    withProps({
      pageTitle: 'Welcome to PowerHR Admin',
    }),
    withHandlers({
        initGetUserlistData: props => () => {
            firebase.database().ref('users')
            .orderByChild("blacklist")
            .equalTo(true)
            .once("value").then( snapshot => {
                props.setlist(Object.values(snapshot.val()))
                console.log(Object.values(snapshot.val()));
            })
        },
        initGetBlacklistData: props => () => {
            firebase.database().ref('blacklist')
            .once("value").then( snapshot => {
                props.setBlacklist(Object.values(snapshot.val()))
                console.log(Object.values(snapshot.val()));
                
            })
        }
    }),
    lifecycle({
        async componentDidMount(){
            await this.props.initGetUserlistData()
            await this.props.initGetBlacklistData()
        }
    }),
    withHandlers({
        handleClickModal: props => (idcard , reason) => {            
            return(
                <Modal.Content>
                    <Modal.Description>
                        <p>รหัสประจำตัวประชาชน : {idcard}</p>
                        <p>รานละเอียด / เหตุผลแบล็คลิสต์ : {reason}</p>
                    </Modal.Description>
                </Modal.Content>
            )
        },
        handleDeleteBlackList: props => (uid) => {
            const deleteUser = firebase.database().ref('blacklist/' + uid);
            deleteUser.remove()
            .then(function() {
                props.initGetUserlistData()
                props.initGetBlacklistData()
                firebase.database().ref('users/' + uid).update({ blacklist : false})
            })
            .catch(function(error) {
                console.log("Remove failed: " + error.message)
            });
            
        }
    }),
)
    
let blacklist_name = 'แบล็คลิสต์'
let button_name = 'เพิ่มรายชื่อแบล็คลิสต์'
let link = '/blacklist/addBlacklist'

export default enhance((props) => 
    <Div>
        {TextHeaderTable(blacklist_name , props.list && props.list.length , button_name , 'รายชื่อ' , link)}
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
                        <center>รหัสบัครประชาชน</center>
                    </TableHeadcell>
                    <TableHeadcell>
                        <center>จัดการข้อมูล</center>
                    </TableHeadcell>
                </Table.Row>
            </Table.Header>
            <TableBody>
            {
                props.list &&
                    props.list.map( (data , i) => {
                        return (
                            <TableRow key={i}>
                                <Modal trigger={
                                    <TableCell>
                                        <center>{data.firstname}</center>
                                    </TableCell>
                                }closeIcon size='small'>
                                    <HeaderContent icon='user times' content={`แบล็คลิสต์ : คุณ ${data.firstname} ${data.lastname}`} />
                                    {props.handleClickModal(data.idcard , props.blacklist && props.blacklist.map( result => {return result.user_id === data.uid ? result.reason : null}))}
                                </Modal>
                                <Modal trigger={
                                    <TableCell>
                                        <center>{data.lastname}</center>
                                    </TableCell>
                                }closeIcon size='small'>
                                    <HeaderContent icon='user times' content={`แบล็คลิสต์ : คุณ ${data.firstname} ${data.lastname}`} />
                                    {props.handleClickModal(data.idcard , props.blacklist && props.blacklist.map( result => {return result.user_id === data.uid ? result.reason : null}))}
                                </Modal>
                                <Modal trigger={
                                    <TableCell>
                                        <center>{data.idcard}</center>
                                    </TableCell>
                                }closeIcon size='small'>
                                    <HeaderContent icon='user times' content={`แบล็คลิสต์ : คุณ ${data.firstname} ${data.lastname}`} />
                                    {props.handleClickModal(data.idcard , props.blacklist && props.blacklist.map( result => {return result.user_id === data.uid ? result.reason : null}))}
                                </Modal>
                                <TableCell>
                                    <center>
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
                                            <HeaderContent icon='archive' content='ลบข้อมูลผู้สมัครไม่ผ่านการคัดเลือกใช่หรือไม่ ?' />
                                            <Modal.Content>
                                                <p>
                                                    คุณต้องการลบข้อมูล {data.firstname} {data.lastname} รหัสประจำตัวประชาชน {data.idcard} ใช่หรือไม่ ?
                                                </p>
                                            </Modal.Content>
                                            <Modal.Actions>
                                                <ButtonAdd color='green' onClick={() => props.handleDeleteBlackList(data.uid)}>
                                                    <Icon name='checkmark' /> ยืนยัน
                                                </ButtonAdd>
                                            </Modal.Actions>
                                        </Modal>
                                    </center>
                                </TableCell>
                            </TableRow>
                        )
                    })
            }
            </TableBody>
        </TablePosition>
    </Div>
);