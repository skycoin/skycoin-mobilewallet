# Skycoin Mobile Wallet

## IMPORTANT: This is a work-in-progress

To-do:
* Add design
* Add support for iOS

## Installation

To create Ionic projects, you'll need to install the latest version of the CLI and Cordova. Before you do that, you'll need a recent version of Node.js. [Download the installer](https://nodejs.org/) for Node.js LTS 6 or greater and then proceed to install the Ionic CLI and Cordova for native app development:

```bash
$ npm install -g ionic cordova
```

> You may need to add "sudo" in front of these commands to install the utilities globally.

Next you will need to install all libraries specific for the application:

```bash
$ npm install
```

To test your installation so far, you can execute the mobile app locally. Please be aware that any native plug-ins will not work here, nor will the application behave normally.

```bash
$ ionic serve
```
 
To actually run/build the Android version of the mobile app, please refer to the [Cordova Android Platform guide](https://cordova.apache.org/docs/en/latest/guide/platforms/android/).

## Usage

Start the app on your Android device by running:

  ionic cordova run android
  
Compile a new build by running:

  ionic cordova build android

## Cordova plugin

The Skycoin mobile wallet uses the [Cordova Skycoin Liteclient plugin](https://github.com/montycrypto/cordova-skycoin)

## Creating a release build

Release builds have to be signed with the original keystore. If you feel you require this keystore, please contact Synth.

The Android application is built using the Ionic CLI. This will require a variety of Android-related downloads. Please follow tutorials on how to build for Android with Ionic for more information.

I find using a release build file to be helpful, see for more information: https://forum.ionicframework.com/t/how-to-automatically-sign-android-applications-with-the-ionic-cli/87449


