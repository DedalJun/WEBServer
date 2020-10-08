package com.main;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MainServlet extends HttpServlet {
    Printer3D printer;

    @Override
    public void init() throws ServletException {
        super.init();
        printer = Printer3D.getInstance();
    }

    public void doPost(HttpServletRequest req, HttpServletResponse res)
            throws java.io.IOException {
        res.setContentType("text/html");

        String action = req.getParameter("action");

        switch(action){
            case "connect":{
                printer.setPortname(Printer3D.showavaliableports()[0]);
                printer.initconnection();
                res.getWriter().write("Connecting to printer \n" + printer.getInput());
                break;
            }
            case "update":{
                res.getWriter().write("HEv - " + printer.getInput());
                break;
            }
            case "command":{
                String command = req.getParameter("coom");
                printer.sendcommand(command);
                res.getWriter().write("Sending command: " + command);
                break;
            }
            case "check":{
                res.getWriter().write(printer.getStatus());
                break;
            }
            case "disconnect":{
                printer.disconnect();
                res.getWriter().write(printer.getInput());
                break;
            }
            default:{
                res.getWriter().write("Undefined command. Please, try again");
            }
        }
    }

    public void doGet(HttpServletRequest req, HttpServletResponse res)
            throws java.io.IOException {
        doPost(req, res);
    }
}