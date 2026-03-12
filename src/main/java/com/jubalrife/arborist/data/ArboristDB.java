package com.jubalrife.arborist.data;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.function.Function;

@ConfigurationProperties(prefix = "db")
public class ArboristDB {

    private String name;
    private String mongo_uri;

    public <DesiredType> DesiredType withDatabase(Function<MongoDatabase, DesiredType> operation) {
        try (MongoClient mongoClient = MongoClients.create(mongo_uri)) {
            return operation.apply(mongoClient.getDatabase(name));
        }
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMongo_uri() {
        return mongo_uri;
    }

    public void setMongo_uri(String mongo_uri) {
        this.mongo_uri = mongo_uri;
    }
}
