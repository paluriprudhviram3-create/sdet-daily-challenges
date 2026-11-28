package com.sdet.tests;

import com.sdet.auditing.BrokenLinkScanner;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;
import java.util.List;

public class BrokenLinksTest {

    @Test
    public void testPageBrokenLinks() {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.get("https://the-internet.herokuapp.com/status_codes");

        List<String> broken = BrokenLinkScanner.findBrokenLinks(driver);
        System.out.println("Discovered broken links: " + broken);
        Assert.assertNotNull(broken);
        driver.quit();
    }
}