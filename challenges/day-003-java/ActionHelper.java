package com.sdet.helpers;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;

public class ActionHelper {
    private Actions actions;

    public ActionHelper(WebDriver driver) {
        this.actions = new Actions(driver);
    }

    public void hoverOverElement(WebElement element) {
        actions.moveToElement(element).perform();
    }

    public void dragAndDrop(WebElement source, WebElement target) {
        actions.dragAndDrop(source, target).perform();
    }

    public void doubleClick(WebElement element) {
        actions.doubleClick(element).perform();
    }
}