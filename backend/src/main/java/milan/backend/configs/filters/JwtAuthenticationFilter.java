/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.configs.filters;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import milan.backend.service.JwtService;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetails userDetailsService;

    public JwtAuthenticationFilter( JwtService jwtService, CustomUserDetails userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        // Skip OPTIONS requests and public routes
        String path = request.getRequestURI();
        return request.getMethod().equalsIgnoreCase("OPTIONS") ||
                path.startsWith("/auth/register") ||
                path.startsWith("/auth/login") ||
                path.startsWith("/auth/test") ||
                path.startsWith("/api/email");
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final HttpServletResponse res =  response;

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
        res.setHeader("Access-Control-Max-Age", "3600");
        if ("OPTIONS".equalsIgnoreCase((request).getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        }


        List<String> permitAllPaths = Arrays.asList(
                "/auth/login",
                "/auth/register",
                "/api/email/send-verification",
                "/api/email/verify",
                "/api/sites/deployed-site",
                "/auth/test"
        );
        String path = request.getServletPath();

        if (permitAllPaths.contains(path) || request.getMethod().equals("OPTIONS")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("JWT Token is missing or invalid");
            filterChain.doFilter(request, response);
            return;
        }

            final String jwt = authHeader.substring(7);
            final String userEmail = jwtService.extractUsername(jwt);

        System.out.println("BEFORE AUTHENTICATION");
            Authentication authentication = SecurityContextHolder.getContext()
                    .getAuthentication();

            if (userEmail != null && authentication == null) {
                System.out.println("JWT Token is valid");
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

                if (jwtService.isTokenValid(jwt, userDetails)) {
                    System.out.println("JWT Token is valid and user details are loaded");
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities()
                    );

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }

            filterChain.doFilter(request, res);
    }
}
