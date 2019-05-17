import * as SockJs from 'sockjs-client';
import * as Stomp from 'stompjs';
import api from './../config/apiConfig';

const ResponseService = {};

ResponseService.stomp = null;

ResponseService.connect = function() {
    let socket = new SockJs(api.BASE_URL + '/gs-guide-websocket');
    this.stomp = Stomp.over(socket);
    this.stomp.connect({}, function () {
        ResponseService.stomp.subscribe('/responses/onAdd', ResponseService.callback);
    })
};

ResponseService.send = function (message) {
  ResponseService.stomp.send("/app/responses", {}, JSON.stringify(message));
};

export default ResponseService;