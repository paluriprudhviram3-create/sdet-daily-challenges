package com.sdet.utils;

import org.openqa.selenium.WebDriver;
import java.util.Set;

public class FrameWindowManager {
    private WebDriver driver;

    public FrameWindowManager(WebDriver driver) {
        this.driver = driver;
    }

    public void switchToChildWindow() {
        String parentHandle = driver.getWindowHandle();
        Set<String> allHandles = driver.getWindowHandles();

        for (String handle : allHandles) {
            if (!handle.equals(parentHandle)) {
                driver.switchTo().window(handle);
                break;
            }
        }
    }

    public void switchToFrameByIdOrName(String frameIdentifier) {
        driver.switchTo().frame(frameIdentifier);
    }

    public void switchToDefaultContent() {
        driver.switchTo().defaultContent();
    }
}