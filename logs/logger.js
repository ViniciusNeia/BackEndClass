import { appendFile } from 'fs';

function formatMessage(type, message, data = '') {
  return `[${new Date().toISOString()}] [${type}] ${message}${data ? ` - ${JSON.stringify(data)}` : ''}\n`;
}

function LogA(action, data){
    const log = formatMessage('ACT', action, data);
    appendFile('./logs/system.log', log, (err) =>
    {
        if (err) console.error('Erro ao gravar log', err);
    })
}
function LogE(context, err){
    const log = formatMessage('ERR', context, err.message);
    appendFile('./logs/system.log', log, (err) =>
    {
        if (err) console.error('Erro ao gravar log', err);
    })
}


export { LogA, LogE };