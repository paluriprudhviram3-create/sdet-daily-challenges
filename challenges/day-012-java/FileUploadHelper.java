package com.sdet.helpers;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import java.awt.*;
import java.awt.datatransfer.StringSelection;
import java.awt.event.KeyEvent;
import java.io.File;

public class FileUploadHelper {

    public static void uploadFileViaInput(WebDriver driver, By inputLocator, String absoluteFilePath) {
        WebElement fileInput = driver.findElement(inputLocator);
        // If element is hidden (display:none), unhide it via JS
        ((JavascriptExecutor) driver).executeScript(
            "arguments[0].style.display = 'block'; arguments[0].style.visibility = 'visible';", fileInput);
        fileInput.sendKeys(new File(absoluteFilePath).getAbsolutePath());
    }

    public static void uploadViaRobot(String absoluteFilePath) throws AWTException {
        StringSelection selection = new StringSelection(new File(absoluteFilePath).getAbsolutePath());
        Toolkit.getDefaultToolkit().getSystemClipboard().setContents(selection, null);

        Robot robot = new Robot();
        robot.delay(1000);
        robot.keyPress(KeyEvent.VK_CONTROL);
        robot.keyPress(KeyEvent.VK_V);
        robot.keyRelease(KeyEvent.VK_V);
        robot.keyRelease(KeyEvent.VK_CONTROL);
        robot.delay(500);
        robot.keyPress(KeyEvent.VK_ENTER);
        robot.keyRelease(KeyEvent.VK_ENTER);
    }
}