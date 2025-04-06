package milan.backend.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "https://milan.ie",
                        "https://www.milan.ie",
                        "https://milan-kovacs.ie",
                        "https://www.milan-kovacs.ie",
                        "http://localhost:4200",
                        "http://127.0.0.1:4200",
                        "http://[::1]:4200"
                )
                .allowedMethods("GET", "POST", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false);
    }
}
