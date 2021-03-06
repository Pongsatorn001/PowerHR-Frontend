import { Menu , Dropdown } from 'semantic-ui-react'
import Link from 'next/link'
import styled from 'styled-components'

const H1 = styled.h1 `
    margin-top : 1rem !important;
    color : #ffffff ;
    cursor : pointer ;
    font-family: 'Kanit', sans-serif !important;
`

const MenuBar = styled(Menu) `
    background : #ff84a1 !important;
`;

const P = styled.p `
    font-size : 14px ;
    color : #ffffff8c ;
    margin-top : -0.5rem ;
    margin-bottom : 1.5rem !important ;
    font-family: 'Kanit', sans-serif !important;
`;

const DropdownMenu = styled(Dropdown) `
    &:hover {
        background : #f96387 !important;
        active : #f96387 !important;
    }
    color : rgb(255,255,255,1) !important;
    font-family: 'Kanit', sans-serif !important;
`;

const HR = styled.hr `
    background : #ffffff ;
    width : 160px ;
    margin-bottom : 1.5rem !important ;
`;

const DropdownMenu_Menu = styled(Dropdown.Menu) `
    margin-top: -40px !important;
    font-size : 15px !important;
    .ui.menu .ui.dropdown .menu>.item &:hover {
        background : #f96387 !important;
        color : #ffffff !important;
    }
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
            <DropdownMenu simple item text='การจัดการข้อมูลผู้สมัคร'>
                <DropdownMenu_Menu>
                    <Link href={`/positions`}>
                        <Dropdown.Item icon='sitemap' text="ตำแหน่ง (Positions)" />
                    </Link>
                    <Link href={`/resume`}>
                        <Dropdown.Item icon='address card outline' text='ตำแหน่งงาน (Job Positions)' />
                    </Link>
                    <Link href={`/resume`}>
                        <Dropdown.Item icon='delete' text='Black List' />                   
                    </Link>
                </DropdownMenu_Menu>
            </DropdownMenu>
        </MenuBar>
    </div>
)