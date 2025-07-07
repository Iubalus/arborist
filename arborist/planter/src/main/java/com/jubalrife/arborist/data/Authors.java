package com.jubalrife.arborist.data;

import com.jubalrife.knucklebones.v1.annotation.GeneratedValue;
import com.jubalrife.knucklebones.v1.annotation.Id;
import com.jubalrife.knucklebones.v1.annotation.Table;

import java.util.List;

public class Authors {

    public void save(Author author) {
        PersistenceImpl.inTransaction(p -> p.insert(author));
    }

    public List<Authors> listAll() {
        return PersistenceImpl.find(
                p -> p
                        .createNativeQuery("SELECT AuthorId, FirstName, LastName FROM Authors")
                        .findResults()
        );
    }

    @Table(name = "Authors")
    public static class Author {
        @Id
        @GeneratedValue
        public Integer authorId;
        public String firstName;
        public String lastName;
    }
}
