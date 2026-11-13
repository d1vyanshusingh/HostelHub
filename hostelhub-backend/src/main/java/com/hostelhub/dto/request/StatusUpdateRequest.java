package com.hostelhub.dto.request;

import com.hostelhub.model.ComplaintStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatusUpdateRequest {

    @NotNull(message = "Status is required (PENDING, IN_PROGRESS, RESOLVED)")
    private ComplaintStatus status;
}
