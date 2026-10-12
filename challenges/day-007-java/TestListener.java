package com.sdet.listeners;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.testng.ITestListener;
import org.testng.ITestResult;

public class TestListener implements ITestListener {

    @Override
    public void onTestFailure(ITestResult result) {
        Object currentClass = result.getInstance();
        WebDriver driver = ((BaseTest) currentClass).getDriver();

        if (driver != null) {
            String base64Screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BASE64);
            System.out.println("[SDET Failure Listener] Captured Screenshot for test: " + result.getName());
        }
    }
}