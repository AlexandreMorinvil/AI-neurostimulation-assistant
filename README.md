This project was conceived for our team's final project at Polytechnique Montreal for our Bachelor of Computer Engineering.  
  
The project is an Android Application that was conceived in order to help the company NeuralDrive with their work. It functions using 2 to 3 separate system, these being:   
-A smart watch attached to a patient's arm that contains our watch application  
-A smart tablet used by a doctor that contains our tablet application  
-A possible server that runs on a separate computer.  
  
##Prerequisites  
-[Linux operating system]  
-[Android Studio and Android SDK] (https://developer.android.com/studio)  
-[JDK latest version] (https://www.oracle.com/ca-en/java/technologies/downloads/)  
-[Node JS latest version] (https://nodejs.org)  
-[Npm]  
-[Python version ____] (https://www.python.org/downloads/)  
<!-- -[Insert here for watch app]  
-[Insert here for watch app] -->  
  
##Base dependencies  
###React Native app  
-All dependencies for the Android application can be install using either of the following commands in the Tablet/NeuralDrive folder:  
&emsp;-npm install  
&emsp;-yarn install  
  
###Python Dependencies  
-The following dependencies can be downloaded individually or using the following command in the server/server foldier:  
&emsp;-pip install -r requirements.txt  
-[cflib] (v0.1.16)  
-[Flask] (v2.0.1)  
-[Flask-Cors] (v3.0.10)  
-[psycopg2-binary] (v2.9.1)  
-[Controller] (v0.1.0)  
-[flask_socketio]  
-[gpy]  
-[matplotlib]  
-[numpy]  
  
###Smart Watch dependencies  
  
  
##How to run the system  
  
###Android Emulator Setup  
1. In Android Studio, open the Android Virtual Device Manager by selecting Tools > AVD Manager.  
2. To setup the smartwatch emulator click Create Virtual Device.  
3. In the Category pane, select Wear OS and choose a hardware profile. Click Next.  
4. Select a system image to download. Select the image with API Level 30, and the Target "Android 11.0 (Wear OS)". Click Next and then click Finish.    
5. To setup the tablet emulator click Create Virtual Device.    
6. In the Category pane, select Tablet and choose a hardware profile. Click Next.  
7. Select a system image to download. Select the image with API Level 31, and the Target "Android 12.0". Click Next and then click Finish.  
8. Close the Android Virtual Device Manager.  
9. In the Android Studio toolbar, select the AVD you just created from the target device drop-down menu, then click Run.  
  
###Tablet application  
1. Download the needed dependencies    
2. Setup the android emulator or plug in the smart tablet on which the application needs to be downloaded  
3. Run the following command in the Tablet/NeuralDrive folder: npx react-native start  
4. Run the following command in the Tablet/NeuralDrive folder: npx react-native run-android  
5. Application will be installed inside the Emulated Tablet or the physical tablet  
  
###Smart watch application  
Deploying an app to a watch:  
Enable adb debugging on the watch:  
1. Open the Settings menu on the watch.  
2. Scroll to the bottom of the menu. If no Developer options item is provided, tap System and then About.  
3. Tap the build number 7 times. A dialog will appear confirming that you are now a developer.  
4. From the Settings menu, tap Developer options.  
5. Enable ADB debugging.  
Connect the watch:  
#Debug Over Wi-Fi:  
1. Open the watch's Settings.  
2. Tap Connectivity > Wi-Fi.  
3. Choose a network and enter its password if necessary.  
Enable Wi-Fi debugging  
4. Open the watch's Settings.  
5. Tap Developer options > Debug over Wi-Fi.  
6. After a moment the screen will display the watch's IP address (for example 192.168.1.100). 
On Android Studio  
7. Open the Device Manager  
8. Click on Physical  
9. Click on Pair using Wi-Fi  
10. Click on Pair using pairing code  
11. Pair the watch to Android studio  
(If needed) Connect the debugger to the watch (in a terminal)  
7. Connect your watch and development machine to the same network.  
8. Navigate to your Android/sdk/platform-tools  
9. Connect the debugger to the watch using the watch's IP address. For example, if the IP address is 192.168.1.100, the adb connect command and its response will look like this (a port number, 5555 is added to the address):  
&emsp;- adb connect 192.168.1.100:5555  
&emsp;- connected to 192.168.1.100:5555  
  
###Separate server  
1. Download the needed dependencies  
2. Run the following command in the server/server folder: python3 server.py  
3. The server will start running on the device  
  
  
##Folder Structure  
  
The project follows the following structure  
-server:   
&emsp;-server:  
&emsp;&emsp;-algorithm: This folder contains the algorithm that was provided by Neuraldrive that does the backend calculations for our application  
&emsp;&emsp;-database: This folder contains the code to make our database run  
&emsp;&emsp;-interface:  
&emsp;&emsp;-venv:  
&emsp;-server-interface:  
-Tablet/NeuralDrive:  
&emsp;-android:  
&emsp;-ios:  
&emsp;-node_modules:  
&emsp;-src: This folder contains the codes that runs all of tablet application  
&emsp;&emsp;-assets: This folder contains the assets such as images, icons and etc. used by our tablet application  
&emsp;&emsp;-class:   
&emsp;&emsp;-components: This folder contains the components that are used throughout the application  
&emsp;&emsp;-const:  
&emsp;&emsp;-services: This folder contains the services of our application that permits us to connect to the backend and setup the patients information  
&emsp;&emsp;-styles: This folder contains the information that permits us to setup the colours and aesthetics of the application  
&emsp;&emsp;-views: This folder contains the various pages of our application such as the setting page, main page and etc.  
-watch_app:  
&emsp;-AlwaysOnNeuralDrive:  
&emsp;&emsp;-app:  
&emsp;&emsp;&emsp;-src/main:  
&emsp;&emsp;&emsp;-alwayson: This folder contains the MainActivity.kt file that implements the ambient mode support and the sensor event listener support, and the SettingsActivity.kt file that implements the setting page to allow the IP address to be entered and saved  
&emsp;&emsp;&emsp;&emsp;-res: This folders contains all the layout components of the watch application  
&emsp;&emsp;&emsp;&emsp;-AndroidManifest.xml: This file contains all the permissions to allow the app to use all its features  
  
  
   
  
##Possible issues  
  
-If you encounter this error "React-Native: Error: spawnSync adb ENOENT at Object.spawnSync" while running the command "npx react-native run-android", the solution is to first run the following command in the same folder: "adb reverse tcp:8081 tcp:8081"  
