# Frontend Build: React App

This project provides the front-end code for new AEM projects using the React Decoupled JS archetype option. In this mode, the react app will no longer be bundled into clientlibs, but be built and deploeyed through [AEM as a Cloud Service's front-end pipeline](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/content/sites/administering/site-creation/enable-front-end-pipeline.html?lang=en).

## Usage

To get started, create a new project with the [AEM Project Archetype](https://github.com/adobe/aem-project-archetype) using the decoupled frontend module

```
mvn -B org.apache.maven.plugins:maven-archetype-plugin:3.2.1:generate \
 -D archetypeGroupId=com.adobe.aem \
 -D archetypeArtifactId=aem-project-archetype \
 -D archetypeVersion=40 \
 -D appTitle="My Site" \
 -D appId="mysite" \
 -D groupId="com.mysite" \
 -D frontendModule="decoupled"
```

This will generate a SPA project with the front-end pipeline preconfigured.

Next create a new repository from this template, clone it, install it and run it

```
npm install
npm run start
```

A post install script will ask for the Application Id (appId), which must be the same as before when creating the project from the archetype ("mysite").

This is in particular important as the script adjusts the references to the default content, the resource-type mappings and the package name in the prroject.
