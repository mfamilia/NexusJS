package com.nexusjs.api;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Tweet {
	private String text;

	@XmlElement(name="Text")
	public String getText() {
		return text;
	}

	
	public void setText(String text) {
		this.text = text;
	}
}
