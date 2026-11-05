package com.prayas.portfolio;

import java.util.Map;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/** Read-only public profile API. No database or authentication is needed for public resume content. */
@RestController
public class ProfileController {
    @GetMapping(value = "/api/profile", produces = MediaType.APPLICATION_JSON_VALUE)
    public Resource profile() {
        return new ClassPathResource("static/profile.json");
    }

    @GetMapping("/api/health")
    public Map<String, String> health() {
        return Map.of("status", "ok", "service", "portfolio");
    }
}
