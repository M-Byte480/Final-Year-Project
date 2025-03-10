package milan.backend.controllers;

import org.springframework.http.RequestEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sites")
public class DeployedSites {

    @GetMapping("/get-site")
    public RequestEntity<Object> getSite(@RequestParam("subdomain") String subdomain){
        return null;
    }
}
