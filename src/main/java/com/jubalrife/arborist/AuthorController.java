package com.jubalrife.arborist;

import com.jubalrife.arborist.data.ArboristDB;
import com.mongodb.BasicDBObject;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.eq;

@RestController
@EnableConfigurationProperties(ArboristDB.class)
public class AuthorController {

    private static final String API_VERSION = "v1";

    @Autowired
    ArboristDB db;

    @PostMapping("/author/" + API_VERSION + "/create")
    public Object createAuthor(@RequestBody CreateAuthorRequest request) {
        return db.withDatabase(database -> {
            Document document = new Document();
            document.put("name", request.getName());
            document.put("apiVersion", API_VERSION);
            InsertOneResult result = database.getCollection("author").insertOne(document);
            if (result.wasAcknowledged()) {
                return new AuthorResponse(
                        String.valueOf(document.get("_id")),
                        API_VERSION,
                        String.valueOf(request.getName())
                );
            } else {
                return new ErrorResponse("Failed to create");
            }
        });
    }

    @PutMapping("/author/" + API_VERSION + "/update")
    public Object updateAuthor(@RequestBody UpdateAuthorRequest request) {
        return db.withDatabase(database -> {
            BasicDBObject toUpdate = new BasicDBObject();
            toUpdate.append("name", request.getName());
            toUpdate.append("apiVersion", API_VERSION);
            UpdateResult result = database.getCollection("author").updateOne(
                    eq("_id", new ObjectId(request.getAuthorId())),
                    new BasicDBObject("$set", toUpdate)
            );
            if (result.wasAcknowledged()) {
                return new AuthorResponse(
                        request.getAuthorId(),
                        API_VERSION,
                        String.valueOf(request.getName())
                );
            } else {
                return new ErrorResponse("Failed to save");
            }
        });
    }

    @GetMapping("/author/" + API_VERSION + "/get")
    public Object getAuthor(@RequestParam(value = "id") String id) {
        return db.withDatabase(database -> {
            Document author = database
                    .getCollection("author")
                    .find(eq("_id", new ObjectId(id)))
                    .first();
            if (author == null) {
                return new ErrorResponse("No such author exists");
            }
            return new AuthorResponse(
                    String.valueOf(author.get("_id")),
                    String.valueOf(author.get("apiVersion")),
                    String.valueOf(author.get("name"))
            );
        });
    }

    @GetMapping("/author/" + API_VERSION + "/list")
    public List<AuthorResponse> listAuthors() {
        return db.withDatabase(database -> {
            List<AuthorResponse> rtv = new ArrayList<>();
            for (Document author : database
                    .getCollection("author")
                    .find()) {
                rtv.add(new AuthorResponse(
                        String.valueOf(author.get("_id")),
                        String.valueOf(author.get("apiVersion")),
                        String.valueOf(author.get("name"))
                ));
            }
            return rtv;
        });
    }

    public static class UpdateAuthorRequest {
        private String name;
        private String authorId;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getAuthorId() {
            return authorId;
        }

        public void setAuthorId(String authorId) {
            this.authorId = authorId;
        }
    }

    public static class CreateAuthorRequest {
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    public static class AuthorResponse {
        private final String authorId;
        private final String apiVersion;
        private final String name;

        public AuthorResponse(String authorId, String apiVersion, String name) {
            this.authorId = authorId;
            this.apiVersion = apiVersion;
            this.name = name;
        }

        public String getAuthorId() {
            return authorId;
        }

        public String getApiVersion() {
            return apiVersion;
        }

        public String getName() {
            return name;
        }
    }

}
