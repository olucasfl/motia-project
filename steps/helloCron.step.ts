import { Handlers, FlowContext } from "motia"

exports.config = {
    type: 'cron',
    name: 'PeriodicJob',
    description: 'Runs every 10 seconds and emits a timestamp',
    cron: '*/60 * * * * *',
    emits: ['cron-ticked'],
    flows: ['cron-example'],
};

export const handler: Handlers['PeriodicJob'] = async ({ emit }: FlowContext<{ topic: 'cron-ticked', data: { message: string } }>) => {
    await emit({
        topic: 'cron-ticked',
        data: { message: `São exatamente: ${new Date().toLocaleTimeString()}` }
    });
}