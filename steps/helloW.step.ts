import { Handlers } from "motia"
import { z } from "zod"

exports.config = {
    type: 'api', // "event", "api", or "cron"
    path: '/hello-world',
    method: 'POST',
    name: 'HelloWorld',
    emits: ['saudacao'],
    flows: ['hello-world'],
    bodySchema: z.object({ nome: z.string() }),
    responseSchema: {
        200: z.object({ phrase: z.string() })
    }
}

export const handler: Handlers['HelloWorld'] = async (req, { logger, emit }) => {

    logger.info('Hello World', { body: req.body })

    const phrase = `Olá ${req.body.nome}, são exatamente: ${new Date().toLocaleTimeString()}`

    await emit({
        topic: 'saudacao',
        data: { message: phrase }
    })

    return {
        status: 200,
        body: { phrase }
    }
}