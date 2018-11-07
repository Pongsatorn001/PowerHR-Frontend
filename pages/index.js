import React from 'react'
import { withApp, withLayout } from '../hoc'
import { Button } from 'semantic-ui-react'
import { compose, withProps } from 'recompose'
import { inject, observer } from 'mobx-react'

const enhance = compose(
    withProps({
      pageTitle: 'Welcome to Antinode B2C Admin'
    }),
    withLayout
  )
  
  export default enhance(() => <div>You are logged in.</div>);