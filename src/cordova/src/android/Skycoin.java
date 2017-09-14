package net.skycoin.cordova.skycoin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaArgs;
import org.json.JSONException;

import android.os.Environment;

import mobile.*;

public class Skycoin extends CordovaPlugin {
    @Override
    public boolean execute(String action, CordovaArgs args, final CallbackContext callbackContext) throws JSONException {
        if ("GetAddresses".equals(action)) {
            try {
                String res = Mobile.getAddresses(args.getString(0), args.getInt(1));
                System.out.println(res);
                callbackContext.success(res);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("GetAddresses failed");
            };

            return true;
        } else if ("GetBalances".equals(action)) {
            final String addresses = args.getString(0);
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    try {
                        String res = null;
                        res = Mobile.getBalances(addresses);
                        System.out.println(res);
                        callbackContext.success(res);
                    } catch (Exception e) {
                        e.printStackTrace();
                        callbackContext.error("GetBalances failed");
                    }
                }
            });

            return true;
        } else if ("PostTransaction".equals(action)) {
            final String seed = args.getString(0);
            final Integer addresses = args.getInt(1);
            final String destinationAddress = args.getString(2);
            final Integer amount = args.getInt(3);
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    try {
                        String res = null;
                        res = Mobile.postTransaction(seed, addresses, destinationAddress, amount);
                        System.out.println(res);
                        callbackContext.success(res);
                    } catch (Exception e) {
                        e.printStackTrace();
                        callbackContext.error("PostTransaction failed");
                    }
                }
            });

            return true;
        }
        return super.execute(action, args, callbackContext);
    }
}
