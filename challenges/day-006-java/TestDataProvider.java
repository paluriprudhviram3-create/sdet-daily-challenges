package com.sdet.dataproviders;

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
}