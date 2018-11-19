import { Segment , Header , Icon , Dropdown} from 'semantic-ui-react'
import styled from 'styled-components'

const SegmentHeader = styled(Segment) `
    overflow : none !important;
    background : #ff84a1 !important;
    border-color : #ff84a1 !important;
    padding-bottom : 0px !important;
    border-radius : 0px !important;
`;

const TextHeader = styled(Header)`
    margin-bottom : 14px !important;
    font-family: 'Kanit', sans-serif !important;
`;

const Text = styled.text `
    color : white !important;
    font-size : 16px !important;
    margin-right : 8px !important;
`;

const Icons = styled(Icon) `
    font-size: 2em !important;
    color : white 
`;

const DropdownButton = styled(Dropdown)`
    margin-left : 4px !important;  
    color : white
`;

const DropdownMenu = styled(Dropdown.Menu)`
    margin-left : 11px !important;  
    margin-top : 1px !important; 
`;

const name = 'Tan Kitpakorn'

export default (props) => (
    <div>
        <SegmentHeader clearing >
            <TextHeader as='h4' floated='right'>
                <div>
                    <Text>Welcome,</Text>
                    <Icons name='user circle'/>
                    <DropdownButton simple item text={name} >
                        <DropdownMenu>
                            <Dropdown.Item icon='sign-out' text="Logout" />
                        </DropdownMenu>
                    </DropdownButton>
                </div>
            </TextHeader>
        </SegmentHeader>
    </div>
)