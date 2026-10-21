package com.sdet.helpers;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import java.util.ArrayList;
import java.util.List;

public class WebTableHelper {
    private WebDriver driver;
    private By tableLocator;

    public WebTableHelper(WebDriver driver, By tableLocator) {
        this.driver = driver;
        this.tableLocator = tableLocator;
    }

    public int getRowCount() {
        return driver.findElements(By.xpath(tableLocator.toString().replace("By.xpath: ", "") + "//tbody/tr")).size();
    }

    public String getCellDataByRowAndColumn(int row, int col) {
        String xpath = String.format("%s//tbody/tr[%d]/td[%d]", 
                tableLocator.toString().replace("By.xpath: ", ""), row, col);
        return driver.findElement(By.xpath(xpath)).getText().trim();
    }

    public WebElement getActionBtnForEntity(String entityName, String actionButtonName) {
        // Dynamic XPath Axes traversal: find cell with text, traverse to sibling or parent row, locate action button
        String xpath = String.format("%s//tbody/tr[td[text()='%s']]//button[text()='%s']", 
                tableLocator.toString().replace("By.xpath: ", ""), entityName, actionButtonName);
        return driver.findElement(By.xpath(xpath));
    }

    public List<String> getAllColumnValues(int colIndex) {
        List<WebElement> cells = driver.findElements(By.xpath(
                tableLocator.toString().replace("By.xpath: ", "") + "//tbody/tr/td[" + colIndex + "]"));
        List<String> values = new ArrayList<>();
        for (WebElement cell : cells) {
            values.add(cell.getText().trim());
        }
        return values;
    }
}