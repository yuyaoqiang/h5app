export default {
    socket: null,
    config: null,
    connect: function(receive) {
        var _this = this;
        if (_this.socket != null) {
            return;
        }
        $.ajax({
            //url: "/login/lms-config.mvc",
            url: "/userInfo/lms-config.mvc",
            type: "get",
            dataType: "json",
            success: function(data) {
                if (data == null) {
                    return;
                }
                _this.config = data;
                if (_this.config.messageNetProtocol == "SOCKET") {
                    _this.init();
                }

                _this.receive = receive;


            }
        });
    },
    isInitiativeClose: false,
    maxTryReconnectTimes: 20,
    tryReconnectTimes: 0,
    tryReconnect: function() {
        var _this = this;
        _this.tryReconnectTimes++;
        if (_this.tryReconnectTimes > _this.maxTryReconnectTimes) {
            return;
        }
        setTimeout(function() {
            console.info("websocket reconnect,times:" + _this.tryReconnectTimes);
            _this.close();
            _this.connect();
        }, 3000)
    },
    receive: null,

    send: function(message) {
        if (!window.WebSocket) {
            return;
        }
        var socket = this.socket;
        if (socket.readyState == WebSocket.OPEN) {
            socket.send(message);
        } else {
            console.error("websocket not connect");
        }
    },
    heartbeatInterval: null,
    startHeartbeat: function() {
        var _this = this;
        _this.heartbeatInterval = setInterval(function() {
            _this.send("hb");
        }, 3000);
        console.log("websocket hearbeat started")

    },
    stopHeartbeat: function() {
        if (this.heartbeatInterval != null) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
            console.log("websocket hearbeat stoped")
        }
    },
    init: function() {
        var _this = this;
        var config = _this.config;

        if (!window.WebSocket) {
            window.WebSocket = window.MozWebSocket;
        }

        if (window.WebSocket) {
            if (config.socketConnectToken == null) {
                console.error("socketConnectToken is null");
                return;
            }

            var socket = new WebSocket(config.messageNetUrl + "?p=" + config.platform + "@" + config.token + "@" + config.socketConnectToken);


            socket.onmessage = function(event) {
                //console.log(event.data, 666)

                if (_this.receive != null) {
                    _this.receive(event.data);
                }
            };
            socket.onerror = function() {
                console.log("websocket error")
            };
            socket.onopen = function(event) {
                _this.tryReconnectTimes = 0;
                //启动心跳
                _this.startHeartbeat();
                console.log("websocket connected")

            };
            socket.onclose = function(event) {
                _this.stopHeartbeat();
                console.log("websocket closed")

                //如果不是主动关闭 则需尝试重连
                if (_this.isInitiativeClose == false) {
                    _this.tryReconnect();
                }
            };

            _this.socket = socket;
        } else {
            console.error("你的浏览器不支持 WebSocket！");
        }
    },
    close() {
        var _this = this;
        if (_this.socket != null) {
            _this.socket.close();
            _this.socket = null;
        }
        _this.stopHeartbeat();
    }
}