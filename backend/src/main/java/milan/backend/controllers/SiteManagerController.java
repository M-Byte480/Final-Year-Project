/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.controllers;

import milan.backend.service.SiteManagerService;
import org.springframework.stereotype.Controller;

@Controller("/api/manager")
public class SiteManagerController {
    private final SiteManagerService managerService;

    public SiteManagerController(SiteManagerService managerService) {
        this.managerService = managerService;
    }
    
}
