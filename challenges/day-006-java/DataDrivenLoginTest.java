package com.sdet.tests;

import com.sdet.dataproviders.TestDataProvider;
import com.sdet.pages.LoginPage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class DataDrivenLoginTest {
    private WebDriver driver;

    @BeforeMethod
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.get("https://the-internet.herokuapp.com/login");
    }

    @Test(dataProvider = "loginData", dataProviderClass = TestDataProvider.class)
    public void testLoginWithMultipleDataSets(String username, String password, boolean expectedSuccess) {
        LoginPage loginPage = new LoginPage(driver);
        loginPage.login(username, password);
        Assert.assertEquals(loginPage.isLoginSuccessful(), expectedSuccess);
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) driver.quit();
    }
}