# Stage 1: Build
FROM maven:3-eclipse-temurin-22-alpine AS build
ARG SERVICE
COPY ../pom.xml /home/
COPY ./ /home/app
WORKDIR /home/app/$SERVICE
RUN mvn clean package -DskipTests

# Stage 2: Run
FROM openjdk:22-jdk-slim-buster
ARG SERVICE
ARG JAR_FILE=/home/app/$SERVICE/target/*.jar
COPY --from=build $JAR_FILE /app/runner.jar
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
