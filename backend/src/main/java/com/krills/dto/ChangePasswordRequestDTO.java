package com.krills.dto;

import com.krills.validation.ValidPasswordChange;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@ValidPasswordChange
public class ChangePasswordRequestDTO {
    @NotBlank(message = "Old password is required")
    public String oldPassword;

    @NotBlank(message = "New password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$",
            message = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
    public String newPassword;

    @NotBlank(message = "Confirm password is required")
    public String confirmNewPassword;
}