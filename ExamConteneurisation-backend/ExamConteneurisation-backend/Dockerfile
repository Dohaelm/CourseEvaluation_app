# Utiliser une image officielle OpenJDK 17
FROM openjdk:17-jdk-slim

# Installer Maven
RUN apt-get update && apt-get install -y maven

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier pom.xml et télécharger les dépendances
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copier tous les fichiers du projet dans l'image
COPY src /app/src

# Construire le projet avec Maven
RUN mvn clean install -DskipTests

# Exposer le port 8080
EXPOSE 8080

# Lancer l'application Spring Boot
CMD ["java", "-jar", "target/nom-du-fichier.jar"]
