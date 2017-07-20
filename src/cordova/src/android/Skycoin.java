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
        Config c = Mobile.newConfig();
        c.setServerAddr("121.41.103.148:8080");
        c.setWalletDirPath(Environment.getExternalStorageDirectory().toString() + "/superwallet");
        Mobile.init(c);
        System.out.println("Looking");
        if ("createwallet".equals(action)) {
            System.out.println("Found");
            try {
                System.out.println("Trying");
                String seeda = Mobile.newSeed();
                String res = Mobile.newWallet(args.getString(0), seeda);
                System.out.println("Success");
                System.out.println(res);
                callbackContext.success(res);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("创建钱包失败！");
                return true;
            }
        } else if ("createaddress".equals(action)) {
            final String a = args.getString(0);
            final Integer b = args.getInt(1);

            String res = null;
            try {
                System.out.println(a);
                System.out.println(b);
                res = Mobile.newAddress(a, b);
                System.out.println(res);
                callbackContext.success(res);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("创建钱包地址失败！");
            }
            ;

            return true;
        } else if ("getaddressinwallet".equals(action)) {
            String res = null;
            try {
                res = Mobile.getAddresses(args.getString(0));
                System.out.println(res);
                callbackContext.success(res);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("获取钱包地址失败！");
            }
            return true;
        } else if ("getpubkeyandseckeypairofaddress".equals(action)) {
            String res = null;
            try {
                res = Mobile.getKeyPairOfAddr(args.getString(0), args.getString(1));
                callbackContext.success(res);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("获取钱包地址公钥与私钥失败！");
            }
            return true;
        } else if ("getbalance".equals(action)) {
            final String coin = args.getString(0);
            final String address = args.getString(1);
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    try {
                        String res = null;
                        res = Mobile.getBalance(coin, address);
                        System.out.println(res);
                        callbackContext.success(res);
                    } catch (Exception e) {
                        e.printStackTrace();
                        callbackContext.error("getbalance failed");
                    }
                }
            });

            return true;
        } else if ("sendskycoin".equals(action)) {
            String res = null;
            try {
                res = Mobile.send(args.getString(0), args.getString(1), args.getString(2), args.getString(3), null);
                callbackContext.success(res);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("skycoin转账失败！");
            }
            return true;
        } else if ("getblanceofwalletid".equals(action)) {
            final String coin = args.getString(0);
            final String wallet = args.getString(1);
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    try {
                        String res = null;
                        res = Mobile.getWalletBalance(coin, wallet);
                        System.out.println(res);
                        callbackContext.success(res);
                    } catch (Exception e) {
                        e.printStackTrace();
                        callbackContext.error("getbalanceofwalletid failed");
                    }
                }
            });
        }
        return super.execute(action, args, callbackContext);
    }
}
