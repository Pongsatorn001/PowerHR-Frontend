import React from 'react'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { AppMenubar, AppHeader } from '../components'
import { inject } from 'mobx-react'
import { ToastMessage, ToastContainer } from 'react-toastr'
import { withApp } from './'
import styled from 'styled-components'
import Box from '../components/Box'
import theme from '../theme/default'

const PageWrapper = styled(Box) `
    min-height: 100vh;
    margin-left: 210px; 
    min-width: 550px;
`

const ContentWrapper = styled(Box) `
    padding: ${theme.dimens.xl} ${theme.dimens.md} ${theme.dimens.md} ${theme.dimens.xl} ;
    backgroud-color: lightgray;
`

export default function withLayout(WrappedComponent) {
    return ((props) => (
        <div>
            <AppMenubar {...props}/>
            <PageWrapper alignStretch>
                <AppHeader {...props}/>
                <ContentWrapper>
                    <WrappedComponent {...props}/>
                </ContentWrapper>
            </PageWrapper>
        </div>
    ))
}