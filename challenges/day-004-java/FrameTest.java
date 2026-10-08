package com.sdet.tests;

import com.sdet.utils.FrameWindowManager;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class FrameTest {

    @Test
    public void verifyIframeEditorText() {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.get("https://the-internet.herokuapp.com/iframe");
        
        FrameWindowManager manager = new FrameWindowManager(driver);
        manager.switchToFrameByIdOrName("mce_0_ifr");
        
        driver.findElement(By.id("tinymce")).clear();
        driver.findElement(By.id("tinymce")).sendKeys("SDET Java Selenium Automation");
        
        manager.switchToDefaultContent();
        Assert.assertEquals(driver.findElement(By.tagName("h3")).getText(), "An iFrame containing the TinyMCE WYSIWYG Editor");
        
        driver.quit();
    }
}