import { Menu , Dropdown } from 'semantic-ui-react'
import Link from 'next/link'
import styled from 'styled-components'

const H1 = styled.h1 `
    margin-top : 1rem !important;
    color : #ffffff ;
    cursor : pointer ;
`

const MenuBar = styled(Menu) `
    background : #ff84a1 !important;
`;

const P = styled.p `
    font-size : 13px ;
    color : #ffffff8c ;
    margin-top : -0.5rem ;
    margin-bottom : 1.5rem !important ;
`;

const DropdownMenu = styled(Dropdown) `
    &:hover {
        background : #f96387 !important;
        active : #f96387 !important;
    }
`;

const HR = styled.hr `
    background : #ffffff ;
    width : 160px ;
    margin-bottom : 1.5rem !important ;
`;

const DropdownMenu_Menu = styled(Dropdown.Menu) `
    border-color : #ff84a1 !important;
    background : #f96387 !important;
`;

const DropdownMenu_item = styled(Dropdown.Item)`
    color : #000000 !important;
`;

export default (props) => (
    <div>
        <MenuBar inverted vertical fixed="left" >
            <center>
                <Link href={`/`}>
                    <H1>PowerHR</H1>
                </Link>
                <P>Version 0.0.1</P>
            </center>
            <HR size="1" color="white"></HR>
            <DropdownMenu item text='การจัดการข้อมูลผู้สมัคร'>
                <DropdownMenu_Menu>
                    <DropdownMenu_item icon='sitemap' >
                        <Link href={`/resume`}>
                            <a>ตำแหน่ง (Positions)</a>
                        </Link>
                    </DropdownMenu_item>
                    <DropdownMenu_item icon='address card outline' text='ตำแหน่งงาน (Job Positions)' >
                    
                    </DropdownMenu_item>
                    <DropdownMenu_item icon='delete' text='Black List' >
                    
                    </DropdownMenu_item>
                </DropdownMenu_Menu>
            </DropdownMenu>
            {/* <Menu.Item >
                <Link href={`/`}>
                    <a>Home</a>
                </Link>
            </Menu.Item>
            <Menu.Item >
                <Link href={`/resume`}>
                    <a>Resume</a>
                </Link>
            </Menu.Item> */}
        </MenuBar>
    </div>
)