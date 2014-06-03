package com.index.servlet;

import javax.servlet.http.HttpSession;
import java.io.*;

/**
 * Created by smallgoodboy on 2014/5/26.
 */
public class DataVisIndexServlet extends javax.servlet.http.HttpServlet {

    int counter = 0;
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        // TODO Auto-generated method stub
        System.out.println("123");
        System.out.println(request.getParameter("userName"));
        System.out.println(request.getParameter("passWd"));
        if(!(request.getParameter("userName").equals("123@123") &&
                request.getParameter("passWd").equals("123"))){
            response.getWriter().write("who are you?");
            return;
        }
        //
        if(request.getParameter("userName")!=null)
        {
            HttpSession session = request.getSession();//没有Session就新建一个
            session.setAttribute("abc",
                    request.getParameter("userName"));//在服务器端存储"键-值对"
            session.setMaxInactiveInterval(30*60);//timeout of the session
        }
        response.setContentType("text/html;charset=GBK");
        response.getWriter().write("welcome");
    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        System.out.println(counter++);
        HttpSession session = request.getSession(false);
        File file;
        if(session!=null){
            file = new File("J:\\Users\\long\\IdeaProjects\\DataVisualization\\web\\websrc\\DSL\\index\\try.html");
        }else{
            file = new File("J:\\Users\\long\\IdeaProjects\\DataVisualization\\web\\websrc\\DSL\\index\\yy.html");
        }

        String content = "";
        BufferedReader reader = null;
        InputStreamReader isr = new InputStreamReader(new FileInputStream(file), "UTF-8");
        reader = new BufferedReader(isr);
        String tempString = null;
        // 一次读入一行，直到读入null为文件结束
        while ((tempString = reader.readLine()) != null) {
            // 显示行号
//            System.out.println("line " + line + ": " + tempString);
//            line++;
            content += tempString;
            content += "\n";
        }
        reader.close();
//        AsyncContext asyncCtx = request.startAsync();
//        asyncCtx.addListener(new AppAsyncListener());
//        asyncCtx.setTimeout(20000);
//        new ThreadSender(response, content, asyncCtx);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().write(content);
        response.flushBuffer();

//        System.out.println(request.isAsyncStarted());
//        System.out.println(request.isAsyncSupported());
//        ThreadSender ts = new ThreadSender(content, asyncCtx);
//        Thread t1 = new Thread(ts);
//		t1.start();
    }
}
