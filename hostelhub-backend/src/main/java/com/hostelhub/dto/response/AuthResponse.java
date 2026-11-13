package com.hostelhub.dto.response;

import com.hostelhub.model.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private String token;
    @Builder.Default
    private String tokenType = "Bearer";
    private Long id;
    private String email;
    private String name;
    private String regNo;
    private Role role;

    public AuthResponse(String token, Long id, String email, String name, String regNo, Role role) {
        this.token = token;
        this.tokenType = "Bearer";
        this.id = id;
        this.email = email;
        this.name = name;
        this.regNo = regNo;
        this.role = role;
    }
}
