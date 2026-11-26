package com.sdet.tests;

import com.sdet.waits.CustomExpectedConditions;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import java.time.Duration;

public class CustomWaitTest {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        driver.get("https://the-internet.herokuapp.com/dynamic_controls");
    }

    @Test
    public void testCustomAttributeWait() {
        // Click enable button and wait for input element to NOT have 'disabled' attribute or change state
        driver.findElement(By.cssSelector("#input-example button")).click();
        
        boolean ready = wait.until(CustomExpectedConditions.jQueryAndJsLoaded());
        Assert.assertTrue(ready, "Page JS and AJAX queries should be fully resolved");

        boolean messageDisplayed = wait.until(CustomExpectedConditions.elementHasAttributeValue(
            By.id("message"), "id", "message"));
        Assert.assertTrue(messageDisplayed, "Message element attribute condition fulfilled");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}