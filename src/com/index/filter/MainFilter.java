package com.index.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * Created by smallgoodboy on 2014/5/26.
 */
public class MainFilter implements Filter {
    static String rootPath = "/DataVisualization/";
    public void destroy() {
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        HttpServletRequest request = (HttpServletRequest) req;
        String contextPath = request.getRequestURI();

        if(contextPath.equals(rootPath)){
            req.getRequestDispatcher("helloworld").forward(req, resp);
        }
        chain.doFilter(req, resp);
    }

    public void init(FilterConfig config) throws ServletException {

    }

}
