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
       // Config c = Mobile.newConfig();
         c.setServerAddr("121.41.103.148:8080");
        //c.setServerAddr("139.129.46.29:8080");
        c.setWalletDirPath(Environment.getExternalStorageDirectory().toString() + "/superwallet");
        Mobile.init(c);
        System.out.println("Looking");
        if("createwallet".equals(action)){
            System.out.println("Found");
            try {
                System.out.println("Trying");
                String  seeda = Mobile.newSeed();
                String  res = Mobile.newWallet(args.getString(0), seeda);
                System.out.println("Success");
                System.out.println(res);
                callbackContext.success(res);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("创建钱包失败！");
                return true;
            }
        }else if("createaddress".equals(action)){
            final  String a = args.getString(0);
            final Integer b = args.getInt(1);

            String res = null;
            try {
                System.out.println(a);
                System.out.println(b);
                res = Mobile.newAddress(a,b);
                System.out.println(res);
                callbackContext.success(res);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("创建钱包地址失败！");
            };

            return true;
        }else if("getaddressinwallet".equals(action)){
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
        }else if("getpubkeyandseckeypairofaddress".equals(action)){
            String res = null;
            try {
                res = Mobile.getKeyPairOfAddr(args.getString(0), args.getString(1));
                callbackContext.success(res);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("获取钱包地址公钥与私钥失败！");
            }
            return true;
        }else if("getbalance".equals(action)){
            String res = null;
            try {
                res = Mobile.getBalance(args.getString(0), args.getString(1));
                System.out.println(res);
                callbackContext.success(res);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("获取钱包余额失败！");
            }
            return true;
        }else if("sendskycoin".equals(action)){
            String res = null;
            try {
                res = Mobile.send(args.getString(0), args.getString(1),args.getString(2),args.getString(3),null);
                callbackContext.success(res);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("skycoin转账失败！");
            }
            return true;
        }else if("getblanceofwalletid".equals(action)){
            String res = null;
            String resa = null;
            System.out.println(action);
            System.out.println(args.getString(0)+"-----"+args.getString(1));
            //Log.i("information",action);
            try{
               // res = Mobile.getBalance("suncoin", "2ZeAf2qcUU2QedQnWzAA6EAzZjRTYYzmbcm");
                res = Mobile.getWalletBalance(args.getString(0), args.getString(1));
                // Mobile.getWalletBalance()
               // resa = Mobile.getAddresses("suncoin_grace dinosaur account enjoy veteran diesel lecture decide weird cheap until sleep");
				System.out.println("太阳币："+res);
                callbackContext.success(res);
				//Log.i("information",action);
				//Log.i("information",action);
            }catch (Exception e){
                e.printStackTrace();
                callbackContext.error("获取余额失败！");
            }
        }
        //System.out.println(action);
        return super.execute(action, args, callbackContext);
    }
}
