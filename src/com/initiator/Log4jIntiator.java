package com.initiator;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

import java.util.Properties;

/**
 * Created by smallgoodboy on 2014/6/4.
 */
public class Log4jIntiator {
    private static Logger logger = Logger.getLogger(Log4jIntiator.class);
    public static String rootCategory = "debug,appender1";
    public static String loggedFile = "C:\\Users\\smallgoodboy\\IdeaProjects\\DataVisualization\\logs\\DV.log";
    public static String maxFileSize = "1024";

    public static void setLog4j(){
        Properties properties = new Properties();
        properties.setProperty("log4j.rootCategory", rootCategory);
        properties.setProperty("log4j.appender.appender1", "org.apache.log4j.FileAppender");
        properties.setProperty("log4j.appender.appender1.File", loggedFile);//the output file ,you can read from other config file
        properties.setProperty("log4j.appender.appender1.layout", "org.apache.log4j.TTCCLayout");
        //properties.setProperty("log4j.appender.R.MaxFileSize", maxFileSize);//去掉K ,只忍数字
        PropertyConfigurator.configure(properties);
    }
}
