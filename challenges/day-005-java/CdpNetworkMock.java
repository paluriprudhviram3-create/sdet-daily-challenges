package com.sdet.cdp;

import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.devtools.DevTools;
import org.openqa.selenium.devtools.v118.network.Network;
import java.util.Optional;

public class CdpNetworkMock {

    public static void enableNetworkMonitoring(ChromeDriver driver) {
        DevTools devTools = driver.getDevTools();
        devTools.createSession();
        devTools.send(Network.enable(Optional.empty(), Optional.empty(), Optional.empty()));
        
        devTools.addListener(Network.requestWillBeSent(), request -> {
            System.out.println("[Intercepted Request] URL: " + request.getRequest().getUrl());
        });
    }
}