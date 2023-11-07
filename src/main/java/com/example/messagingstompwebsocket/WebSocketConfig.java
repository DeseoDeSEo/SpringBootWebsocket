package com.example.messagingstompwebsocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

	@Override
	public void configureMessageBroker(MessageBrokerRegistry config) {
//		메세지 브로커를설정하는 역할( 서버와 클라이언트 간의 메세지 전달을 중개함)
//		topic주제를 구독하는 클라이언트에게 메세지를 전달하기 위해 메시지 브로커 활성화
		config.enableSimpleBroker("/topic"); 
//		/app으로 시작하는 목적지를 처리하는데 사용.
		config.setApplicationDestinationPrefixes("/app");
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
//		addendpoint()를 이용해서 엔드 포인트를 등록한다.
//		endpoint: 클라이언트와 서버 간의 실시간 통신을 시작하는 지점.
		registry.addEndpoint("/gs-guide-websocket");
	}

}
