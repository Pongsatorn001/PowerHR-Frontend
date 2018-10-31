import Menu_item from './Menu'
import Header from './Header'
import { Menu, Grid } from 'semantic-ui-react'

const Layout = (props) => (
    <div>
        <Header/>
        <Grid divided='vertically'>
            <Grid.Row columns={2}>
                <Grid.Column>
                    <Menu pointing secondary vertical>
                        <Menu_item/>
                    </Menu>
                </Grid.Column>
                <Grid.Column>
                    {props.children}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
  )
  
  export default Layout