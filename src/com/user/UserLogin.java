package com.user;

/**
 * Created by smallgoodboy on 2014/6/4.
 */
public class UserLogin {

    /**
     * Call database methods to check user name and password.
     * @param userName String user name.
     * @param password Encrypt password.
     * @return If the user-password pair match, 1
     *          user not exist,  0
     *          don't match,    -1
     */
    public static int login(String userName, String password){
        if(userName.equals("123@123")&&password.equals("123")){
            return 1;
        }else{
            return 0;
        }
    }
}
