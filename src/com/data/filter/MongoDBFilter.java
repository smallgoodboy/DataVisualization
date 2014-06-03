package com.data.filter;

import com.data.mongodb.MongoConnector;

/**
 * Created by long on 2014/6/3.
 */
public class MongoDBFilter {
    private static MongoDBFilter filter;
    private MongoConnector mongodb;

    private MongoDBFilter(){
        filter = null;
        mongodb = MongoConnector.getInstance();
    }

    public static MongoDBFilter getInstance(){
        if(filter == null){
            filter = new MongoDBFilter();
        }
        return filter;
    }
}
