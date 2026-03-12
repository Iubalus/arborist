package com.jubalrife.arborist;

import com.jubalrife.arborist.data.ArboristDB;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.mongodb.client.model.Filters.eq;

@SpringBootApplication
@RestController
@EnableConfigurationProperties(ArboristDB.class)
public class ArboristApplication {

    @Autowired
    ArboristDB db;

    @GetMapping("/hello")
    public String demo(@RequestParam(value = "name", defaultValue = "World") String name) {
        Document doc = db.withDatabase(database -> database
                .getCollection("test")
                .find(eq("name", "Fred"))
                .first()
        );
        String result;
        if (doc != null) {
            result = doc.toJson();
        } else {
            result = "Nothing found";
        }
        return String.format("Hello %s!", result);
    }

    public static void main(String[] args) {
        SpringApplication.run(ArboristApplication.class, args);
    }

}
