package dev.royaumendi.talentmap.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.tags.Tag;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

        @Bean
        public OpenAPI talentMapOpenAPI() {
                Server devServer = new Server();
                devServer.setUrl("http://localhost:8080");
                devServer.setDescription("Server URL in Development environment");

                Contact contact = new Contact();
                contact.setName("TalentMap Team");
                contact.setEmail("contact@royaumendi.dev");

                License license = new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT");

                Info info = new Info()
                                .title("TalentMap API")
                                .version("1.0.0")
                                .contact(contact)
                                .description("API for the TalentMap platform - a talent discovery and collaboration tool for Nuit de l'Info 2025")
                                .license(license);

                Tag authTag = new Tag().name("Auth").description("Authentication and registration endpoints");
                Tag publicTag = new Tag().name("Public").description("Public talent browsing endpoints");
                Tag profileTag = new Tag().name("Profile").description("User profile management endpoints");
                Tag adminTag = new Tag().name("Admin").description("Admin endpoints for talent verification");

                return new OpenAPI()
                                .info(info)
                                .servers(List.of(devServer))
                                .tags(List.of(authTag, publicTag, profileTag, adminTag));
        }
}
