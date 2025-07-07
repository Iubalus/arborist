package com.jubalrife.arborist.data;

import com.jubalrife.knucklebones.v1.Persistence;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

public class PatchRunner {

    public static void main(String[] args) {
        patchDatabase();
    }

    public static void patchDatabase() {
        runPatches(
                "000_Patches.sql",
                "001_Author.sql"
        );
    }

    private static void runPatches(String... toRun) {
        List<String> alreadyRun = findAlreadyRun();

        Stream.of(toRun)
              .filter(patchName -> !alreadyRun.contains(patchName))
              .forEach(patchName -> {
                  PersistenceImpl.inTransaction(
                          p -> {
                              p.createNativeQuery(getPatchSQL(patchName)).executeUpdate();
                              p
                                      .createNativeQuery("INSERT INTO Patches (PatchName) VALUES ( :patchName )")
                                      .setParameter("patchName", patchName)
                                      .executeUpdate();
                          },
                          e -> {
                              throw new RuntimeException("Failed to apply patch " + patchName, e);
                          }
                  );
              });
    }

    private static List<String> findAlreadyRun() {
        Long count = PersistenceImpl.findSingle(p -> p.createNativeQuery(
                "SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'Patches'"
        ).findSingleResult());
        if (count == 0) {
            return Collections.emptyList();
        }
        return PersistenceImpl.find(p -> p.createNativeQuery(
                "SELECT PatchName from Patches").findResults()
        );
    }

    static String getPatchSQL(String patchName) {
        InputStream resource = PatchRunner.class.getResourceAsStream("/patches/" + patchName);
        if (resource == null) {
            throw new RuntimeException("Bad patch " + patchName);
        }
        try (resource) {
            return new String(streamToBytes(resource));
        } catch (IOException e) {
            throw new RuntimeException("Bad patch " + patchName, e);
        }
    }

    static byte[] streamToBytes(InputStream i) throws IOException {
        int read;
        ByteArrayOutputStream o = new ByteArrayOutputStream();
        while ((read = i.read()) != -1) {
            o.write(read);
        }
        return o.toByteArray();
    }

}
