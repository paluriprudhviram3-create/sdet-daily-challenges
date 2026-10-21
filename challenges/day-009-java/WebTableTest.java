package com.sdet.tests;

import com.sdet.helpers.WebTableHelper;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import java.util.List;

public class WebTableTest {
    private WebDriver driver;

    @BeforeMethod
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://the-internet.herokuapp.com/tables");
    }

    @Test
    public void verifyDynamicWebTableExtraction() {
        WebTableHelper table = new WebTableHelper(driver, By.xpath("//table[@id='table1']"));

        int rows = table.getRowCount();
        Assert.assertTrue(rows > 0, "Table rows should be greater than zero");

        // Verify specific cell via XPath Axes
        List<String> lastNames = table.getAllColumnValues(1);
        Assert.assertTrue(lastNames.contains("Smith"), "Table should contain Smith");

        // Locate Edit link for John Smith using following-sibling/ancestor row scoping
        WebElement editAction = driver.findElement(By.xpath(
                "//table[@id='table1']//tbody/tr[td[text()='Smith']]//a[text()='edit']"));
        Assert.assertTrue(editAction.isDisplayed(), "Edit action for Smith must be visible");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}