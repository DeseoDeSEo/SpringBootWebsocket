package com.example.messagingstompwebsocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {


	@MessageMapping("/hello") //hello목적지로 메세지를 보낼 때 이 메서드 호출.
	@SendTo("/topic/greetings") // 반환값은 topic/greeting 토픽으로 전송되도록 지정함.(모든 구독자에게 방송되는 토픽으로 전달됨)
	public Greeting greeting(HelloMessage message) throws Exception {
		Thread.sleep(1000); // simulated delay
//		Greeting 객체를 생성한 후, 1초동안 지연을 시뮬레이션 하고 응답을 보냄.
		return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
	} // html excape하여 보안 문제를 방지. (사용자가 입력한 이름이 html특수문자로 구성되어있더라도 안전하게 출력됨.)

}
