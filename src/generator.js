export const sdetChallenges = [
  {
    id: "day-001",
    dayName: "Day 1",
    title: "Java Selenium Page Object Model (POM) with PageFactory & Explicit Waits",
    category: "Java Selenium Framework Design",
    difficulty: "Intermediate",
    tags: ["Java", "Selenium", "TestNG", "POM", "PageFactory", "SDET"],
    description: "Build a robust Page Object Model in Java using Selenium PageFactory and WebdriverWait to handle dynamic AJAX elements cleanly.",
    codeFilename: "LoginPage.java",
    testFilename: "LoginTest.java",
    codeContent: `package com.sdet.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class LoginPage {
    private WebDriver driver;
    private WebDriverWait wait;

    @FindBy(id = "username")
    private WebElement usernameInput;

    @FindBy(id = "password")
    private WebElement passwordInput;

    @FindBy(id = "loginBtn")
    private WebElement loginButton;

    @FindBy(css = ".flash.success")
    private WebElement successBanner;

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        PageFactory.initElements(driver, this);
    }

    public void login(String user, String pass) {
        wait.until(ExpectedConditions.visibilityOf(usernameInput)).sendKeys(user);
        passwordInput.sendKeys(pass);
        loginButton.click();
    }

    public boolean isLoginSuccessful() {
        return wait.until(ExpectedConditions.visibilityOf(successBanner)).isDisplayed();
    }
}`,
    testContent: `package com.sdet.tests;

import com.sdet.pages.LoginPage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class LoginTest {
    private WebDriver driver;
    private LoginPage loginPage;

    @BeforeMethod
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://the-internet.herokuapp.com/login");
        loginPage = new LoginPage(driver);
    }

    @Test
    public void verifyValidUserLogin() {
        loginPage.login("tomsmith", "SuperSecretPassword!");
        Assert.assertTrue(loginPage.isLoginSuccessful(), "Login banner should be displayed!");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}`,
    readmeContent: `# Java Selenium POM & PageFactory

## 💡 Concept
Page Object Model (POM) separates page locator strategy and interactions from test assertions. Utilizing PageFactory simplifies element initialization.
`
  },
  {
    id: "day-002",
    dayName: "Day 2",
    title: "Java Selenium Dynamic Waits & FluentWait Custom Conditions",
    category: "Java Selenium Advanced Automation",
    difficulty: "Intermediate",
    tags: ["Java", "Selenium", "FluentWait", "Synchronization", "SDET"],
    description: "Master synchronization using FluentWait with custom polling intervals and ignoring specific exceptions like StaleElementReferenceException.",
    codeFilename: "SyncUtils.java",
    testFilename: "DynamicLoadingTest.java",
    codeContent: `package com.sdet.utils;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import java.time.Duration;

public class SyncUtils {

    public static WebElement waitForElementWithPolling(WebDriver driver, By locator, int timeoutSeconds, int pollingMs) {
        Wait<WebDriver> wait = new FluentWait<>(driver)
                .withTimeout(Duration.ofSeconds(timeoutSeconds))
                .pollingEvery(Duration.ofMillis(pollingMs))
                .ignoring(NoSuchElementException.class)
                .ignoring(StaleElementReferenceException.class);

        return wait.until(d -> d.findElement(locator));
    }
}`,
    testContent: `package com.sdet.tests;

import com.sdet.utils.SyncUtils;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class DynamicLoadingTest {

    @Test
    public void verifyDynamicElementLoading() {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.get("https://the-internet.herokuapp.com/dynamic_loading/1");
        
        driver.findElement(By.cssSelector("#start button")).click();
        
        WebElement finishText = SyncUtils.waitForElementWithPolling(driver, By.id("finish"), 15, 500);
        Assert.assertEquals(finishText.getText(), "Hello World!");
        
        driver.quit();
    }
}`,
    readmeContent: `# Java Selenium FluentWait & Synchronization

## 💡 Concept
AvoidThread.sleep()! FluentWait allows setting dynamic timeout durations and polling frequencies while ignoring transient exceptions.
`
  },
  {
    id: "day-003",
    dayName: "Day 3",
    title: "Java Selenium Action Class: Drag & Drop, Mouse Hover & Double Click",
    category: "Java Selenium User Interactions",
    difficulty: "Intermediate",
    tags: ["Java", "Selenium", "ActionsClass", "UserInteractions", "SDET"],
    description: "Automate complex user gestures including mouse hovers, drag-and-drop actions, and context clicks using Selenium Actions builder.",
    codeFilename: "ActionHelper.java",
    testFilename: "UserInteractionsTest.java",
    codeContent: `package com.sdet.helpers;

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
}`,
    testContent: `package com.sdet.tests;

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
}`,
    readmeContent: `# Java Selenium Actions API

## 💡 Concept
The Actions class allows SDETs to synthesize complex user inputs such as drag-and-drop, context clicks (right click), and hover actions.
`
  },
  {
    id: "day-004",
    dayName: "Day 4",
    title: "Java Selenium Multi-Window & iFrame Context Switching Engine",
    category: "Java Selenium Window & Frame Handling",
    difficulty: "Intermediate",
    tags: ["Java", "Selenium", "iFrames", "WindowHandles", "SDET"],
    description: "Handle complex web applications containing nested iFrames, shadow DOM elements, and multi-tab window handle transitions.",
    codeFilename: "FrameWindowManager.java",
    testFilename: "FrameTest.java",
    codeContent: `package com.sdet.utils;

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
}`,
    testContent: `package com.sdet.tests;

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
}`,
    readmeContent: `# Java Selenium iFrame & Window Switching

## 💡 Concept
Selenium driver operates on a single window/frame context at a time. Using \`switchTo().frame()\` and \`switchTo().window()\` ensures seamless context switching.
`
  },
  {
    id: "day-005",
    dayName: "Day 5",
    title: "Java Selenium Chrome DevTools Protocol (CDP) Network Mocking",
    category: "Java Selenium Advanced CDP",
    difficulty: "Advanced",
    tags: ["Java", "Selenium4", "CDP", "NetworkMocking", "SDET"],
    description: "Intercept and mock network HTTP responses directly inside Java Selenium 4 tests using Chrome DevTools Protocol.",
    codeFilename: "CdpNetworkMock.java",
    testFilename: "CdpNetworkTest.java",
    codeContent: `package com.sdet.cdp;

import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.devtools.DevTools;
import org.openqa.selenium.devtools.v118.network.Network;
import java.util.Optional;

public class CdpNetworkMock {

    public static void enableNetworkMonitoring(ChromeDriver driver) {
        DevTools devTools = driver.getDevTools();
        devTools.createSession();
        devTools.send(Network.enable(Optional.empty(), Optional.empty(), Optional.empty()));
        
        devTools.addListener(Network.requestWillBeSent(), request -> {
            System.out.println("[Intercepted Request] URL: " + request.getRequest().getUrl());
        });
    }
}`,
    testContent: `package com.sdet.tests;

import com.sdet.cdp.CdpNetworkMock;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;

public class CdpNetworkTest {

    @Test
    public void testNetworkInterception() {
        WebDriverManager.chromedriver().setup();
        ChromeDriver driver = new ChromeDriver();
        
        CdpNetworkMock.enableNetworkMonitoring(driver);
        driver.get("https://the-internet.herokuapp.com");
        
        driver.quit();
    }
}`,
    readmeContent: `# Java Selenium 4 Chrome DevTools Protocol (CDP)

## 💡 Concept
Selenium 4 enables native integration with Chrome DevTools Protocol, allowing real-time request manipulation and network logging.
`
  },
  {
    id: "day-006",
    dayName: "Day 6",
    title: "Java Selenium Dynamic Data-Driven Testing with TestNG @DataProvider",
    category: "Java Selenium Data-Driven Testing",
    difficulty: "Intermediate",
    tags: ["Java", "Selenium", "TestNG", "DataProvider", "Excel", "SDET"],
    description: "Feed external test data sets dynamically into Java Selenium tests using TestNG @DataProvider and Excel POI integration.",
    codeFilename: "TestDataProvider.java",
    testFilename: "DataDrivenLoginTest.java",
    codeContent: `package com.sdet.dataproviders;

import org.testng.annotations.DataProvider;

public class TestDataProvider {

    @DataProvider(name = "loginData")
    public static Object[][] getLoginCredentials() {
        return new Object[][] {
            { "validUser", "SuperSecretPassword!", true },
            { "invalidUser", "wrongPass", false },
            { "lockedUser", "SuperSecretPassword!", false }
        };
    }
}`,
    testContent: `package com.sdet.tests;

import com.sdet.dataproviders.TestDataProvider;
import com.sdet.pages.LoginPage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class DataDrivenLoginTest {
    private WebDriver driver;

    @BeforeMethod
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.get("https://the-internet.herokuapp.com/login");
    }

    @Test(dataProvider = "loginData", dataProviderClass = TestDataProvider.class)
    public void testLoginWithMultipleDataSets(String username, String password, boolean expectedSuccess) {
        LoginPage loginPage = new LoginPage(driver);
        loginPage.login(username, password);
        Assert.assertEquals(loginPage.isLoginSuccessful(), expectedSuccess);
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) driver.quit();
    }
}`,
    readmeContent: `# Java Selenium Data-Driven Testing

## 💡 Concept
Decoupling test logic from test data using TestNG DataProviders enables running identical browser workflows across multiple data sets.
`
  },
  {
    id: "day-007",
    dayName: "Day 7",
    title: "Java Selenium Failure Telemetry: Auto-ScreenCapture & ExtentReports",
    category: "Java Selenium Test Reporting & Listener Framework",
    difficulty: "Advanced",
    tags: ["Java", "Selenium", "TestNG", "ExtentReports", "ScreenCapture", "SDET"],
    description: "Implement TestNG ITestListener to capture base64 screenshot evidence on test failure and embed it into Extent HTML reports.",
    codeFilename: "TestListener.java",
    testFilename: "ScreenshotUtils.java",
    codeContent: `package com.sdet.listeners;

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
}`,
    testContent: `package com.sdet.utils;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

public class ScreenshotUtils {
    public static String getBase64Screenshot(WebDriver driver) {
        return ((TakesScreenshot) driver).getScreenshotAs(OutputType.BASE64);
    }
}`,
    readmeContent: `# Java Selenium Failure Telemetry & Listeners

## 💡 Concept
Automatic failure evidence collection (screenshots & logs) via TestNG listeners drastically speeds up root cause analysis in CI/CD execution runs.
`
  },
  {
    id: "day-008",
    dayName: "Day 8",
    title: "Java Selenium JavaScriptExecutor: DOM Manipulation, Smooth Scroll & Shadow DOM",
    category: "Java Selenium Advanced DOM",
    difficulty: "Intermediate",
    tags: ["Java", "Selenium", "JavaScriptExecutor", "DOM", "SDET"],
    description: "Utilize JavaScriptExecutor in Java Selenium to trigger synchronous JavaScript execution, handle hidden elements, perform pixel/element scrolling, and interact with open Shadow DOM boundaries.",
    codeFilename: "JsUtils.java",
    testFilename: "JsExecutorTest.java",
    codeContent: `package com.sdet.utils;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class JsUtils {

    public static void clickElementByJs(WebDriver driver, WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].click();", element);
    }

    public static void scrollIntoView(WebDriver driver, WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", element);
    }

    public static void highlightElement(WebDriver driver, WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].style.border='3px solid red';", element);
    }

    public static String getDocumentReadyState(WebDriver driver) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        return (String) js.executeScript("return document.readyState;");
    }
}`,
    testContent: `package com.sdet.tests;

import com.sdet.utils.JsUtils;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class JsExecutorTest {
    private WebDriver driver;

    @BeforeMethod
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://the-internet.herokuapp.com/large");
    }

    @Test
    public void verifyJsScrollAndClick() {
        Assert.assertEquals(JsUtils.getDocumentReadyState(driver), "complete");

        WebElement targetTable = driver.findElement(By.id("large-table"));
        JsUtils.scrollIntoView(driver, targetTable);
        JsUtils.highlightElement(driver, targetTable);

        Assert.assertTrue(targetTable.isDisplayed(), "Table should be scrolled into view and visible!");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}`,
    readmeContent: `# Java Selenium JavaScriptExecutor Mastery

## 💡 Concept
When standard Selenium WebDriver clicks fail due to overlay spinners, sticky headers, or click interception, \`JavascriptExecutor\` directly injects JavaScript into the browser engine.

## 🚀 Key Takeaways
- Use \`arguments[0].click()\` as a fallback for click-intercepted elements.
- Implement smooth element scrolling with \`arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'})\`.
- Check full page load synchronization using \`document.readyState === 'complete'\`.
- Highlight elements dynamically during debugging or failure capture.
`
  },
  {
    id: "day-009",
    dayName: "Day 9",
    title: "Java Selenium Dynamic WebTable Pagination & Custom XPath Axes Traversal",
    category: "Java Selenium Complex WebTables",
    difficulty: "Advanced",
    tags: ["Java", "Selenium", "WebTables", "XPath", "Pagination", "SDET"],
    description: "Design an enterprise-grade WebTable reader in Java Selenium that leverages XPath axes (following-sibling, ancestor, parent) to locate target rows and perform automated multi-page table traversal.",
    codeFilename: "WebTableHelper.java",
    testFilename: "WebTableTest.java",
    codeContent: `package com.sdet.helpers;

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
}`,
    testContent: `package com.sdet.tests;

import com.sdet.helpers.WebTableHelper;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import java.util.List;

public class WebTableTest {
    private WebDriver driver;

    @BeforeMethod
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://the-internet.herokuapp.com/tables");
    }

    @Test
    public void verifyDynamicWebTableExtraction() {
        WebTableHelper table = new WebTableHelper(driver, By.xpath("//table[@id='table1']"));

        int rows = table.getRowCount();
        Assert.assertTrue(rows > 0, "Table rows should be greater than zero");

        // Verify specific cell via XPath Axes
        List<String> lastNames = table.getAllColumnValues(1);
        Assert.assertTrue(lastNames.contains("Smith"), "Table should contain Smith");

        // Locate Edit link for John Smith using following-sibling/ancestor row scoping
        WebElement editAction = driver.findElement(By.xpath(
                "//table[@id='table1']//tbody/tr[td[text()='Smith']]//a[text()='edit']"));
        Assert.assertTrue(editAction.isDisplayed(), "Edit action for Smith must be visible");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}`,
    readmeContent: `# Java Selenium Dynamic WebTable Automation & XPath Axes

## 💡 Concept
Enterprise applications present large tables with dynamic sorting, filtering, and pagination. Hardcoded row indices (\`tr[3]/td[2]\`) break frequently when table data shifts.

## 🚀 Key Takeaways
- Use **relative XPath axes** (\`ancestor::tr\`, \`following-sibling::td\`) to anchor searches against known cell values (e.g. Username/Email) rather than fixed indices.
- Encapsulate table parsing into reusable helper utilities (\`WebTableHelper\`) that handle column maps and multi-page pagination.
- Extract tabular data into structured Java collections (\`List<Map<String, String>>\`) for clean assertion handling.
`
  },
  {
    id: "day-010",
    dayName: "Day 10",
    title: "Java Selenium Thread-Safe WebDriver Architecture with ThreadLocal for Parallel Testing",
    category: "Java Selenium Framework Architecture",
    difficulty: "Advanced",
    tags: ["Java", "Selenium", "ThreadLocal", "ParallelTesting", "TestNG", "SDET"],
    description: "Design a production-grade Thread-Safe Driver Factory using Java ThreadLocal to safely execute parallel test suites in TestNG across multiple browser threads without driver collision.",
    codeFilename: "DriverManager.java",
    testFilename: "ParallelTest.java",
    codeContent: `package com.sdet.driver;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;

public class DriverManager {

    private static final ThreadLocal<WebDriver> driverThreadLocal = new ThreadLocal<>();

    private DriverManager() {
        // Prevent direct instantiation
    }

    public static WebDriver getDriver() {
        return driverThreadLocal.get();
    }

    public static void setDriver(String browser) {
        WebDriver driver;
        if (browser.equalsIgnoreCase("firefox")) {
            WebDriverManager.firefoxdriver().setup();
            driver = new FirefoxDriver();
        } else {
            WebDriverManager.chromedriver().setup();
            ChromeOptions options = new ChromeOptions();
            options.addArguments("--disable-notifications", "--remote-allow-origins=*");
            driver = new ChromeDriver(options);
        }
        driver.manage().window().maximize();
        driverThreadLocal.set(driver);
    }

    public static void quitDriver() {
        WebDriver driver = driverThreadLocal.get();
        if (driver != null) {
            driver.quit();
            driverThreadLocal.remove(); // Prevent memory leaks in thread pools
        }
    }
}`,
    testContent: `package com.sdet.tests;

import com.sdet.driver.DriverManager;
import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

public class ParallelTest {

    @BeforeMethod
    @Parameters({"browser"})
    public void setUp(String browser) {
        DriverManager.setDriver(browser != null ? browser : "chrome");
    }

    @Test
    public void testHerokuAppHomePage() {
        DriverManager.getDriver().get("https://the-internet.herokuapp.com");
        String heading = DriverManager.getDriver().findElement(By.tagName("h1")).getText();
        Assert.assertEquals(heading, "Welcome to the-internet");
    }

    @Test
    public void testDynamicLoadingHeading() {
        DriverManager.getDriver().get("https://the-internet.herokuapp.com/dynamic_loading");
        String heading = DriverManager.getDriver().findElement(By.tagName("h3")).getText();
        Assert.assertEquals(heading, "Dynamically Loaded Page Elements");
    }

    @AfterMethod
    public void tearDown() {
        DriverManager.quitDriver();
    }
}`,
    readmeContent: `# Java Selenium Thread-Safe WebDriver Architecture (ThreadLocal)

## 💡 Concept
When running test suites in parallel with TestNG (\`parallel="methods"\` or \`parallel="tests"\`), a static \`WebDriver driver;\` instance causes race conditions: multiple threads overwrite each other's driver session, leading to erratic browser closures and crashes.

## 🚀 Key Takeaways
- Use \`ThreadLocal<WebDriver>\` to isolate each WebDriver instance to its own executing thread.
- Always invoke \`threadLocal.remove()\` inside \`quitDriver()\` to prevent thread pool memory leaks.
- Enables high-speed parallel test execution in CI/CD without shared state contention.
`
  },
  {
    id: "day-011",
    dayName: "Day 11",
    title: "Java Selenium Custom ExpectedConditions & AJAX/DOM Attribute State Waiters",
    category: "Java Selenium Advanced Synchronization",
    difficulty: "Advanced",
    tags: ["Java", "Selenium", "ExpectedConditions", "CustomWaits", "AJAX", "SDET"],
    description: "Build custom ExpectedCondition implementations in Java Selenium to synchronize against complex AJAX state transitions, custom DOM attributes, and animated element stabilization.",
    codeFilename: "CustomExpectedConditions.java",
    testFilename: "CustomWaitTest.java",
    codeContent: `package com.sdet.waits;

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
}`,
    testContent: `package com.sdet.tests;

import com.sdet.waits.CustomExpectedConditions;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import java.time.Duration;

public class CustomWaitTest {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        driver.get("https://the-internet.herokuapp.com/dynamic_controls");
    }

    @Test
    public void testCustomAttributeWait() {
        // Click enable button and wait for input element to NOT have 'disabled' attribute or change state
        driver.findElement(By.cssSelector("#input-example button")).click();
        
        boolean ready = wait.until(CustomExpectedConditions.jQueryAndJsLoaded());
        Assert.assertTrue(ready, "Page JS and AJAX queries should be fully resolved");

        boolean messageDisplayed = wait.until(CustomExpectedConditions.elementHasAttributeValue(
            By.id("message"), "id", "message"));
        Assert.assertTrue(messageDisplayed, "Message element attribute condition fulfilled");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}`,
    readmeContent: `# Java Selenium Custom ExpectedConditions

## 💡 Concept
Built-in Selenium \`ExpectedConditions\` (e.g. \`visibilityOfElementLocated\`) often fall short when dealing with single-page applications (SPAs) where elements exist but undergo asynchronous CSS or attribute changes.

## 🚀 Key Takeaways
- Implement \`ExpectedCondition<T>\` interface to define tailored synchronization conditions.
- Implement \`toString()\` on custom conditions to produce clear failure diagnostic messages when timeouts occur.
- Eliminate flaky timing errors with active jQuery/XHR/Fetch request detectors.
`
  }
];

export function getNextChallenge(currentDayIndex = 0) {
  const index = currentDayIndex % sdetChallenges.length;
  return sdetChallenges[index];
}

