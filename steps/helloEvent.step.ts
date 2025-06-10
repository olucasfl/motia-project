import { EventConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: EventConfig = {
    type: 'event',
    name: 'TimeEvent',
    description: 'Shows what`s time is it',
    subscribes: ['saudacao', 'cron-ticked'],
    emits: [],
    input: z.object({ message: z.string() }),
    flows: ['hello-world'],
}

export const handler: Handlers['TimeEvent'] = async (input, { logger }) => {
    logger.info(input.message)
}