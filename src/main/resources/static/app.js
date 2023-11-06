const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8081/gs-guide-websocket'
});
/*StompJS는 javaScript의 STOMP프로토콜을 사용하여 웹 소켓을 통해 서버와 통신할 때 도움이 되는 도구.*/
stompClient.onConnect = (frame) => { /*클라이언트가 웹 소켓 연결에 성공했을 때 실행되는 콜백함수*/
    setConnected(true);/* setConnected함수를 호출하여 연결상태를 'true'로 설정. 연결 상태를 추적하고 업데이트 하는데 사용. */
    console.log('Connected: ' + frame);/*연결 성공하면 console에 다음 내용 출력, 연결 프레임은 웹 소켓 연결에 대한 정보를 포함하는 객체*/
    stompClient.subscribe('/topic/greetings', (greeting) => { 
		/*'/topic/greetings'라는 주제를 구독하도록 클라이언트를 설정하고 해당 주제로부터 수신되는 메세지를 처리하는 콜백함수 정의 */
		/*콜백 함수 내부에는 'showGreeting'함수 호출해서 메시지 내용 표시*/
        showGreeting(JSON.parse(greeting.body).content);
        /*greeting : StompJS을 통해 수신된 메시지 객체
        이 객체의 'body' 속성에 메시지 본문 있음. json을 파싱하여 그 중 content 속성의 값을 추출함.*/
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.publish({
        destination: "/app/hello",
        body: JSON.stringify({'name': $("#name").val()})
    });
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendName());
});

