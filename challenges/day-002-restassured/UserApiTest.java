package com.sdet.api.tests;

import io.restassured.RestAssured;
import io.restassured.module.jsv.JsonSchemaValidator;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class UserApiTest {

    @BeforeClass
    public void setup() {
        RestAssured.baseURI = "https://api.example.com/v1";
    }

    @Test
    public void verifyUserPayloadAndSchema() {
        given()
            .header("Authorization", "Bearer sdet_secret_token")
            .contentType("application/json")
        .when()
            .get("/users/101")
        .then()
            .statusCode(200)
            .contentType("application/json")
            .body("id", equalTo(101))
            .body("role", equalTo("SDET_ENGINEER"))
            .body(JsonSchemaValidator.matchesJsonSchemaInClasspath("user-schema.json"));
    }
}