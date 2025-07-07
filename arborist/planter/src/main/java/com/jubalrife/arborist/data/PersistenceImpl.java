package com.jubalrife.arborist.data;

import com.jubalrife.knucklebones.v1.Persistence;
import com.jubalrife.knucklebones.v1.PersistenceFactory;
import org.h2.jdbcx.JdbcConnectionPool;

import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;

public class PersistenceImpl {

    private static PersistenceFactory FACTORY;

    public static Persistence create() {
        if (FACTORY == null) {
            FACTORY = new PersistenceFactory(JdbcConnectionPool.create(
                    "jdbc:h2:/var/arborist/arborist",
                    "arborist",
                    null
            ));
        }
        return FACTORY.create();
    }

    public static void inTransaction(Consumer<Persistence> wrap) {
        try (Persistence p = create()) {
            wrap.accept(p);
        }
    }

    @SuppressWarnings("unchecked")
    public static <DesiredType> List<DesiredType> findFromTransaction(Function<Persistence, List<Object>> operation) {
        try (Persistence p = create()) {
            return (List<DesiredType>) operation.apply(p);
        }
    }

    @SuppressWarnings("unchecked")
    public static <DesiredType> DesiredType findSingleFromTransaction(Function<Persistence, Object> operation) {
        try (Persistence p = create()) {
            return (DesiredType) operation.apply(p);
        }
    }
}
