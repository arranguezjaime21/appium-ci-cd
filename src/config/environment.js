import 'dotenv/config';

export const environment = { 
    appiumPort: Number(process.env.APPIUM_PORT),
    deviceName: process.env.DEVICE_NAME,
    appPackage: process.env.APP_PACKAGE,
    appActivity: process.env.APP_ACTIVITY
}