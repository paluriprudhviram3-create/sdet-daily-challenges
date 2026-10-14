package com.sdet.tests;

import com.sdet.utils.JsUtils;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class JsExecutorTest {
    private WebDriver driver;

    @BeforeMethod
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://the-internet.herokuapp.com/large");
    }

    @Test
    public void verifyJsScrollAndClick() {
        Assert.assertEquals(JsUtils.getDocumentReadyState(driver), "complete");

        WebElement targetTable = driver.findElement(By.id("large-table"));
        JsUtils.scrollIntoView(driver, targetTable);
        JsUtils.highlightElement(driver, targetTable);

        Assert.assertTrue(targetTable.isDisplayed(), "Table should be scrolled into view and visible!");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}