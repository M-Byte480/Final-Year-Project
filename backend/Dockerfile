# Stage 1: Build
FROM maven:3-eclipse-temurin-22-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests=true

# Stage 2: Run
FROM openjdk:22-jdk-slim-buster
LABEL authors="milan"

WORKDIR /app

COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
