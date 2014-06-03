package com.data.mongodb;

/**
 * Created by long on 2014/6/2.
 */
public class MongoConnector {
    private static MongoConnector mongo;

    private MongoConnector(){
        mongo = null;
    }

    public static MongoConnector getInstance(){
        if(mongo==null){
            mongo = new MongoConnector();
        }
        return mongo;
    }
}
