package com.sdet.tests;

import com.sdet.cdp.CdpNetworkMock;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;

public class CdpNetworkTest {

    @Test
    public void testNetworkInterception() {
        WebDriverManager.chromedriver().setup();
        ChromeDriver driver = new ChromeDriver();
        
        CdpNetworkMock.enableNetworkMonitoring(driver);
        driver.get("https://the-internet.herokuapp.com");
        
        driver.quit();
    }
}