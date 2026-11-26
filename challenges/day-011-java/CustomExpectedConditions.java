package com.sdet.waits;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;

public class CustomExpectedConditions {

    public static ExpectedCondition<Boolean> elementHasAttributeValue(final By locator, final String attribute, final String value) {
        return new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(WebDriver driver) {
                try {
                    WebElement element = driver.findElement(locator);
                    String attrVal = element.getAttribute(attribute);
                    return attrVal != null && attrVal.contains(value);
                } catch (Exception e) {
                    return false;
                }
            }

            @Override
            public String toString() {
                return String.format("attribute '%s' to contain '%s' for element located by: %s", attribute, value, locator);
            }
        };
    }

    public static ExpectedCondition<Boolean> jQueryAndJsLoaded() {
        return new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(WebDriver driver) {
                JavascriptExecutor js = (JavascriptExecutor) driver;
                boolean jsReady = "complete".equals(js.executeScript("return document.readyState"));
                boolean jQueryReady = Boolean.TRUE.equals(js.executeScript(
                    "return (typeof jQuery === 'undefined') || (jQuery.active === 0)"));
                return jsReady && jQueryReady;
            }
        };
    }
}