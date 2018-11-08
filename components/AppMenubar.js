import { Menu } from 'semantic-ui-react'
import Link from 'next/link'

const textmenu = {
    marginTop : '1rem',
}

const menuBackground = {
    background : '#fb7171',
}

const textVersion = {
    fontSize : '12px',
    color :'#ffffff',
    marginTop : '-0.5rem',
    marginBottom : '2rem'
}
export default (props) => (
    <div>
        <Menu inverted vertical fixed="left" style={menuBackground}>
            <center>
                <h1 style={textmenu}>PowerHR</h1>
                <p style={textVersion}>Version 0.0.1</p>
            </center>
            <Menu.Item >
                <Link href={`/`}>
                    <a>Home</a>
                </Link>
            </Menu.Item>
            <Menu.Item >
                <Link href={`/resume`}>
                    <a>Resume</a>
                </Link>
            </Menu.Item>
        </Menu>
    </div>
)