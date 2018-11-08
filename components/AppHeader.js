import { Segment , Header , Button} from 'semantic-ui-react'

const segmentStyle = {
    overflow : 'none',
    background : '#ff84a1',
    borderColor: '#ff84a1',
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
                <p style={fontHeader}>{props.pageTitle}</p>
            </Header>
            <Header floated='right'>
                <Button>Log out</Button>
            </Header>
        </Segment>
    </div>
)