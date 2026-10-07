package com.sdet.tests;

import com.sdet.helpers.ActionHelper;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class UserInteractionsTest {

    @Test
    public void verifyHoverAndDragDrop() {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.get("https://the-internet.herokuapp.com/hovers");
        
        ActionHelper helper = new ActionHelper(driver);
        WebElement avatar = driver.findElement(By.cssSelector(".figure"));
        helper.hoverOverElement(avatar);
        
        WebElement caption = driver.findElement(By.cssSelector(".figcaption h5"));
        Assert.assertTrue(caption.isDisplayed());
        
        driver.quit();
    }
}