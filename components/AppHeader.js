import { Segment , Header , Button} from 'semantic-ui-react'

const segmentStyle = {
    marginLeft: '15rem ',
    overflow : 'none',
    background : '#ffc5c5',
    borderColor: '#ffc5c5',
    paddingBottom : '0px',
    borderRadius : '0px'
}

const fontHeader = {
    fontSize : '25px',
}

export default (props) => (
    <div>
        <Segment clearing style={segmentStyle}>
            <Header floated='left'>
                <p style={fontHeader}>Welcome</p>
            </Header>
            <Header floated='right'>
                <Button>Log out</Button>
            </Header>
        </Segment>
    </div>
)