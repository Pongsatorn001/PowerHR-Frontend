import styled from 'styled-components'
import Link from 'next/link'
import { Button , Icon , Header } from 'semantic-ui-react'

const HeaderName = styled(Header)`
    padding-top : 20px !important;
    padding-left : 50px !important;
    font-family: 'Kanit', sans-serif !important;
`;

const HeaderButtonAdd = styled(Header)`
    padding-top : 20px !important;
    padding-right : 36px !important;
`;

const H2 = styled.h2 `
    font-family : 'Kanit', sans-serif !important;
    padding-top : 40px !important;
`

const IconAdd = styled(Icon)`
    padding-left : 8px !important;
`;

const Small = styled.small `
    font-size: 15px !important;
    font-weight: 600;
`
const ButtonAdd = styled(Button)`
    font-family : 'Kanit', sans-serif !important;
`

export  const TextHeader = (name) => {
    return <H2>{name}</H2>
}

export const TextHeaderTable = (name , descrip , button ,  positions , link , queryData) => {
    return (
        <div>
            <HeaderName as='h1' floated='left'>
                {name}&nbsp;<Small>( จำนวนทั้งหมด {descrip} {positions} )</Small>
            </HeaderName>
            <HeaderButtonAdd as='h2' floated='right'>
                <Link href={{ pathname : `${link}` , query : { position : queryData}}}>
                    <ButtonAdd positive animated='fade' size='medium'>
                        <Button.Content visible>
                            {button}
                        </Button.Content>
                        <Button.Content hidden>
                            <IconAdd name='add' />
                        </Button.Content>
                    </ButtonAdd>
                </Link>
            </HeaderButtonAdd>
        </div>
    )
}