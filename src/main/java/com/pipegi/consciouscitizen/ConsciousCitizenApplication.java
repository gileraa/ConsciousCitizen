package com.pipegi.consciouscitizen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude =  {DataSourceAutoConfiguration.class })
public class ConsciousCitizenApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConsciousCitizenApplication.class, args);
    }

}
