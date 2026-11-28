package com.sdet.auditing;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class BrokenLinkScanner {

    public static int checkUrlResponseCode(String urlStr) {
        try {
            URL url = new URL(urlStr);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("HEAD");
            conn.setConnectTimeout(3000);
            conn.connect();
            return conn.getResponseCode();
        } catch (Exception e) {
            return 500;
        }
    }

    public static List<String> findBrokenLinks(WebDriver driver) {
        List<WebElement> links = driver.findElements(By.tagName("a"));
        List<String> broken = new ArrayList<>();
        for (WebElement link : links) {
            String href = link.getAttribute("href");
            if (href != null && href.startsWith("http")) {
                int code = checkUrlResponseCode(href);
                if (code >= 400) {
                    broken.add(href + " -> HTTP " + code);
                }
            }
        }
        return broken;
    }
}