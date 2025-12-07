# Swagger / OpenAPI Documentation

Le backend TalentMap inclut une documentation API interactive via Swagger UI.

## Accès à la documentation

Une fois l'application démarrée, la documentation Swagger est accessible via :

### Swagger UI (interface interactive)
```
http://localhost:8080/swagger-ui.html
```

### Spécification OpenAPI (JSON)
```
http://localhost:8080/api-docs
```

## Fonctionnalités

- **Interface interactive** : Testez directement les endpoints depuis votre navigateur
- **Documentation automatique** : Tous les endpoints REST sont automatiquement documentés
- **Schémas de données** : Visualisez les modèles de requête/réponse
- **Try it out** : Exécutez des requêtes directement depuis l'interface

## Configuration

Les propriétés SpringDoc sont configurées dans `application.properties` :

```properties
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.swagger-ui.operationsSorter=method
springdoc.swagger-ui.tagsSorter=alpha
springdoc.swagger-ui.tryItOutEnabled=true
```

## Personnalisation

La configuration OpenAPI se trouve dans `OpenApiConfig.java` :
- Informations de l'API (titre, version, description)
- Contact et licence
- URL des serveurs

## Utilisation avec Docker

Lorsque le backend est déployé via Docker Compose, Swagger UI est accessible à :
```
http://localhost:8080/swagger-ui.html
```

Depuis le frontend nginx, les endpoints API sont proxifiés via `/api`, donc la documentation complète est accessible directement sur :
```
http://localhost:3000/api-docs
```

## Documentation des endpoints

Pour documenter vos controllers, utilisez les annotations SpringDoc :

```java
@RestController
@RequestMapping("/api/users")
@Tag(name = "Users", description = "User management APIs")
public class UserController {
    
    @Operation(summary = "Get all users", description = "Returns list of all users")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @GetMapping
    public List<User> getAllUsers() {
        // ...
    }
}
```
