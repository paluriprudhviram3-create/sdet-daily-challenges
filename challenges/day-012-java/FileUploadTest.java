package com.sdet.tests;

import com.sdet.helpers.FileUploadHelper;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import java.io.File;
import java.io.FileWriter;

public class FileUploadTest {
    private WebDriver driver;
    private File tempFile;

    @BeforeMethod
    public void setUp() throws Exception {
        tempFile = File.createTempFile("sdet_upload_test", ".txt");
        try (FileWriter writer = new FileWriter(tempFile)) {
            writer.write("SDET Automated Upload Verification Content");
        }
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://the-internet.herokuapp.com/upload");
    }

    @Test
    public void verifyFileUpload() {
        FileUploadHelper.uploadFileViaInput(driver, By.id("file-upload"), tempFile.getAbsolutePath());
        driver.findElement(By.id("file-submit")).click();

        String uploadedText = driver.findElement(By.id("uploaded-files")).getText().trim();
        Assert.assertEquals(uploadedText, tempFile.getName());
    }

    @AfterMethod
    public void tearDown() {
        if (tempFile != null) tempFile.delete();
        if (driver != null) driver.quit();
    }
}