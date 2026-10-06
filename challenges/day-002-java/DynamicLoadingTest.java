package com.sdet.tests;

import com.sdet.utils.SyncUtils;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class DynamicLoadingTest {

    @Test
    public void verifyDynamicElementLoading() {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.get("https://the-internet.herokuapp.com/dynamic_loading/1");
        
        driver.findElement(By.cssSelector("#start button")).click();
        
        WebElement finishText = SyncUtils.waitForElementWithPolling(driver, By.id("finish"), 15, 500);
        Assert.assertEquals(finishText.getText(), "Hello World!");
        
        driver.quit();
    }
}