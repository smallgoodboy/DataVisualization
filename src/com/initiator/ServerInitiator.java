package com.initiator;

import org.apache.log4j.Logger;

/**
 * Created by smallgoodboy on 2014/6/4.
 */
public class ServerInitiator {

    private static Logger logger = Logger.getLogger(ServerInitiator.class);

    public ServerInitiator(){
        initLogger();
    }

    private int initNeo4j(){
        return 1;
    }

    private int initConfig(){
        return 1;
    }

    private int initMongoDB(){
        return 1;
    }

    private int initUserData(){
        return 1;
    }

    private int staticFileChecker(){
        return 1;
    }

    private int initLogger(){
        Log4jIntiator.setLog4j();
        return 1;
    }

    public static void registerServlet(javax.servlet.http.HttpServlet servlet){

    }
}
