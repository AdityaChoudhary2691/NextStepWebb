package com.aditya.nexepbackend.Model;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SendEmail {
    private String toEmail;
    private  String subject;
    private  String body;
}
