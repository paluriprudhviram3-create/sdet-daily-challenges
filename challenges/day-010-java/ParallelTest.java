package com.sdet.tests;

import com.sdet.driver.DriverManager;
import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

public class ParallelTest {

    @BeforeMethod
    @Parameters({"browser"})
    public void setUp(String browser) {
        DriverManager.setDriver(browser != null ? browser : "chrome");
    }

    @Test
    public void testHerokuAppHomePage() {
        DriverManager.getDriver().get("https://the-internet.herokuapp.com");
        String heading = DriverManager.getDriver().findElement(By.tagName("h1")).getText();
        Assert.assertEquals(heading, "Welcome to the-internet");
    }

    @Test
    public void testDynamicLoadingHeading() {
        DriverManager.getDriver().get("https://the-internet.herokuapp.com/dynamic_loading");
        String heading = DriverManager.getDriver().findElement(By.tagName("h3")).getText();
        Assert.assertEquals(heading, "Dynamically Loaded Page Elements");
    }

    @AfterMethod
    public void tearDown() {
        DriverManager.quitDriver();
    }
}