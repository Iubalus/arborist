package com.jubalrife.arborist;


import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.InputStream;

public class Planter extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        InputStream input = Planter.class.getResourceAsStream("/web/dist/index.html");
        if (input == null) {
            resp.getOutputStream().println("Failed to find resource");
            return;
        }
        flushResource(resp, input);
    }

    private static void flushResource(HttpServletResponse resp, InputStream input) throws IOException {
        byte[] buffer = new byte[256];
        int read;
        while ((read = input.read(buffer)) != -1) {
            resp.getOutputStream().write(buffer, 0, read);
        }
    }
}
