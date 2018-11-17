import { Segment , Header , Button} from 'semantic-ui-react'
import {btn_primary} from './Button'

const segmentStyle = {
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
                <p style={fontHeader}>{props.pageTitle}</p>
            </Header>
            <Header floated='right'>
                {btn_primary('LogOut')}
            </Header>
        </Segment>
    </div>
)