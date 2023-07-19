@echo off
set appid=com.jlnr2

if "%1" == "" (
    cd android
    echo build debug apk
    gradlew assembleDebug -PreactNativeArchitectures=armeabi-v7a
    echo output: android/app/build/outputs/apk/debug/app-debug.apk
    cd ..
)

if "%1" == "release" (
    cd android
    set appid=com.jlnr2Release
    echo build release apk
    gradlew assembleRelease -PreactNativeArchitectures=armeabi-v7a
    echo output: android/app/build/outputs/apk/release/app-release.apk
    set appid=com.jlnr2
    cd ..
) 

if "%1" == "bundle" (
    cd android
    echo build bundle release
    gradlew bundleRelease -PreactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64
    echo output: echo output: android/app/build/outputs/bundle/release/app-release.aab
    cd ..
)

