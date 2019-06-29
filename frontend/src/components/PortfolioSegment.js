import React from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'

const PortfolioSegment = () => (
  <Segment placeholder>
    <Header icon>
      <Icon name='chart line' />
      No transactions are listed.
    </Header>
    <Button primary>Add Document</Button>
  </Segment>
)

export default PortfolioSegment
