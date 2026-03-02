# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Community Bible application — a Spring Boot REST API backend using Java 21, Spring Data JPA, and an H2 embedded database.

## Build & Run Commands

```bash
# Build the project
./gradlew build

# Run the application
./gradlew bootRun

# Run all tests
./gradlew test

# Run a single test class
./gradlew test --tests "com.bible.BibleApplicationTests"

# Clean build artifacts
./gradlew clean
```

## Tech Stack

- **Java 21** with Spring Boot 4.0.1
- **Spring Web MVC** for REST controllers
- **Spring Data JPA** with **H2** embedded database (runtime)
- **Lombok** for boilerplate reduction (`@Getter`, `@Setter`, `@Builder`, etc.)

## Project Structure

Standard Spring Boot layout under `src/main/java/com/bible/`:

```
src/main/java/com/bible/
├── BibleApplication.java        # Main entry point (@SpringBootApplication)
src/main/resources/
├── application.properties       # App config (currently minimal)
src/test/java/com/bible/
└── BibleApplicationTests.java   # Integration test base
```

Future code should follow standard layering: `controller/` → `service/` → `repository/` (extending `JpaRepository`) → `entity/`.

## Configuration

- `src/main/resources/application.properties` — currently only sets `spring.application.name=bible`
- H2 runs in-memory by default; add `spring.datasource.*` and `spring.jpa.*` properties here to customize
- For environment-specific config, use `application-{profile}.properties` and activate with `--spring.profiles.active={profile}`

## Notes

- Lombok annotation processing is enabled via `annotationProcessor`; IntelliJ needs "Enable annotation processing" checked
- Test dependencies use `spring-boot-starter-data-jpa-test` and `spring-boot-starter-webmvc-test`
