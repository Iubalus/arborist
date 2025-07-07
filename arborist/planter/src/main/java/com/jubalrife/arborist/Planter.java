package com.jubalrife.arborist;


import com.jubalrife.arborist.data.PatchRunner;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class Planter extends HttpServlet {

    @Override
    public void init() throws ServletException {
        PatchRunner.patchDatabase();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
    }
}
