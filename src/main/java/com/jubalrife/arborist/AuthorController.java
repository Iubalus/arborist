package com.jubalrife.arborist;

import com.jubalrife.arborist.data.ArboristDB;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@EnableConfigurationProperties(ArboristDB.class)
public class AuthorController {

    private static final String API_VERSION = "v1";

    @Autowired
    ArboristDB db;

    @PostMapping("/author/" + API_VERSION + "/post")
    public void createAuthor(@RequestParam(value = "name") String name) {
        System.out.println("Post " + name);
    }

    @PutMapping("/author/" + API_VERSION + "/put")
    public void updateAuthor(@RequestParam(value = "id") String id, @RequestParam(value = "name") String name) {
        System.out.println("Put " + id + ", " + name);
    }

    @GetMapping("/author/" + API_VERSION + "/get")
    public Object getAuthor(@RequestParam(value = "id") String id) {
        if (id.isEmpty()) {
            return new ErrorResponse("no id provided");
        }
        return new AuthorResponse(id, API_VERSION, "testuser");
    }

    @GetMapping("/author/" + API_VERSION + "/list")
    public List<AuthorResponse> listAuthors() {
        return db.withDatabase(database -> {
            List<AuthorResponse> rtv = new ArrayList<>();
            for (Document author : database
                    .getCollection("author")
                    .find()) {
                rtv.add(new AuthorResponse(
                        String.valueOf(author.get("id")),
                        String.valueOf(author.get("version")),
                        String.valueOf(author.get("name"))
                ));
            }
            return rtv;
        });
    }

    public static class AuthorResponse {
        private final String id;
        private final String apiVersion;
        private final String name;

        public AuthorResponse(String id, String apiVersion, String name) {
            this.id = id;
            this.apiVersion = apiVersion;
            this.name = name;
        }

        public String getId() {
            return id;
        }

        public String getApiVersion() {
            return apiVersion;
        }

        public String getName() {
            return name;
        }
    }

}
