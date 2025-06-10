import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: ApiRouteConfig = {
  type: 'api',
  name: 'ApiTrigger',
  description: 'default template api trigger',

  method: 'POST',
  path: '/default',

  /**
   * This API Step emits events to topic `test-state`
   */
  emits: ['test-state'],

  /** 
   * Expected request body for type checking and documentation
   */
  bodySchema: z.object({ nome: z.string(), idade: z.number(), email: z.string().email(), telefone: z.string().regex(/^\d{11}$/) }),

  /** 
   * Expected response body for type checking and documentation
   */
  responseSchema: {
    200: z.object({ nome: z.string(), idade: z.number(), email: z.string().email(), telefone: z.string().regex(/^\d{11}$/) })
  },

  /** 
   * We're using virtual subscribes to virtually connect noop step
   * to this step.
   *
   * Noop step is defined in noop.step.ts
   */
  virtualSubscribes: ['/default'],

  /**
   * The flows this step belongs to, will be available in Workbench
   */
  flows: ['default'],
}

export const handler: Handlers['ApiTrigger'] = async (req, { logger, emit }) => {
  /** 
   * Avoid usage of console.log, use logger instead
   */
  logger.info('Step 01 – Processing API Step', { body: req.body })

  /**
   * Emit events to the topics to process asynchronously
   */
  await emit({
    topic: 'test-state',
    data: { 'message': req.body.nome },
  })

  /**
   * Return data back to the client
   */
  return {
    status: 200,
    body: { nome: req.body.nome, idade: req.body.idade, email: req.body.email, telefone: req.body.telefone },
  }
}
