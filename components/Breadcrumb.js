import styled from 'styled-components'
import Link from 'next/link'
import { Breadcrumb } from 'semantic-ui-react'

export const Breadcrumb2Page = (home , pre , path) => (
    <Breadcrumb size='large'>
        <Link href={path}>
            <Breadcrumb.Section link>{home}</Breadcrumb.Section>
        </Link>
        <Breadcrumb.Divider icon='right chevron' />
        <Breadcrumb.Section active>{pre}</Breadcrumb.Section>
    </Breadcrumb>
)