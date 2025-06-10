import { BaseNode, Button, NoopNodeProps } from 'motia/workbench'
import React from 'react'

/**
 * For more information on how to override UI nodes, check documentation https://www.motia.dev/docs/workbench/ui-steps
 */
export const Node: React.FC<NoopNodeProps> = (data) => {
  const start = () => {
    fetch('/default', { method: 'POST', body: JSON.stringify({ message: 'test' }) })
  }

  return (
    <BaseNode title="Start" variant="noop" {...data} disableTargetHandle>
      <Button data-testid="start-flow-button" onClick={start}>Start Flow</Button>
    </BaseNode>
  )
}
