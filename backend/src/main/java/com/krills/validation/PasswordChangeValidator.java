package com.krills.validation;

import com.krills.dto.ChangePasswordRequestDTO;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordChangeValidator implements ConstraintValidator<ValidPasswordChange, ChangePasswordRequestDTO> {

    @Override
    public boolean isValid(ChangePasswordRequestDTO dto, ConstraintValidatorContext context) {
        if (dto == null) {
            return true;
        }

        context.disableDefaultConstraintViolation();

        boolean isValid = true;

        // Check if new password matches confirmation
        if (dto.newPassword != null && !dto.newPassword.equals(dto.confirmNewPassword)) {
            context.buildConstraintViolationWithTemplate("New password and confirmation do not match")
                    .addPropertyNode("confirmNewPassword")
                    .addConstraintViolation();
            isValid = false;
        }

        // Check if new password is different from old password
        if (dto.oldPassword != null && dto.newPassword != null && dto.oldPassword.equals(dto.newPassword)) {
            context.buildConstraintViolationWithTemplate("New password must be different from old password")
                    .addPropertyNode("newPassword")
                    .addConstraintViolation();
            isValid = false;
        }

        return isValid;
    }
}