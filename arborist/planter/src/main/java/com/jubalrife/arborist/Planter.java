package com.jubalrife.arborist;


import com.jubalrife.arborist.data.PatchRunner;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class Planter extends HttpServlet {

    @Override
    public void init() {
        PatchRunner.patchDatabase();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
    }
}
