const unirest = require('unirest');
const args = require('minimist')(process.argv.slice(2));

if(typeof args.token == 'undefined'){
    console.log('Вы должны указать ключ --token с токеном доступа к API. Его можно получить на странице ' +
        'https://pddimp.yandex.ru/api2/admin/get_token');
    return;
}

const token = args.token;
console.log('Token: ' + token);

const methods = {
    addadmin: function(){
        unirest.post('https://pddimp.yandex.ru/api2/admin/deputy/add')
            .headers({
                PddToken: token
            })
            .send({
                domain: '', // домен
                login: '@yandex.ru' // почта вместе с @yandex.ru
            })
            .end((res) => console.log(res.body || res.raw_body));
    }
};

let command = args._[0];
console.log('Command: ' + command);

if(typeof command !== 'undefined' && typeof methods[command] !== 'undefined'){
    methods[command]();
}
else
    console.log('Команда не указана');