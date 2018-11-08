import React from 'react'
import { withLayout } from '../hoc'
import { compose, withProps } from 'recompose'

const enhance = compose(
    withProps({
        pageTitle: 'Resume'
    }),
    withLayout
)

export default enhance( ()=> 
    <div>
        This Resume
    </div>
)