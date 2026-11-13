package com.hostelhub.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComplaintRequest {

    @NotBlank(message = "Category is required (e.g. Electrical, Plumbing, Mess, Housekeeping)")
    private String category;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Priority is required (e.g. Low, Medium, High, Urgent)")
    private String priority;
}
