import React from 'react'
import { withLayout } from '../hoc'
import { compose, withProps } from 'recompose'

const enhance = compose(
  withProps({
    pageTitle: 'Welcome to PowerHR Admin'
  }),
  withLayout
)
  
export default enhance(() => <div>You are logged in.</div>);