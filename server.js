'use strict';

const feathers = require('feathers');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');

const app = feathers()
  .configure(rest())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }));

class MessageService {
  constructor() {
    this.messages = [
      {id: 1, title: 'hello', isDone: false},
      {id: 2, title: 'learn feathers', isDone: false}
    ];
  }

  find(params) {
    return Promise.resolve(this.messages);
  }

  create(data, params) {
    this.messages.push(data);

    return Promise.resolve(data);
  }
}

app.use('/messages', new MessageService());

app.service('messages').on('created', message =>
  console.log('Created message', message)
);

// post new item
// curl 'http://localhost:3030/messages/' -H 'Content-Type: application/json' --data-binary '{ "text": "Learning Feathers!" }'


app.listen(3030, () => {
  console.log('listening....');
});
