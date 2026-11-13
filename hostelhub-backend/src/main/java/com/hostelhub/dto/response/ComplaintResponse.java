package com.hostelhub.dto.response;

import com.hostelhub.model.Complaint;
import com.hostelhub.model.ComplaintStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComplaintResponse {

    private Long id;
    private String category;
    private String description;
    private ComplaintStatus status;
    private String priority;
    private LocalDateTime createdAt;
    private Long userId;
    private String userName;
    private String userRegNo;
    private String userEmail;

    public static ComplaintResponse fromEntity(Complaint complaint) {
        return ComplaintResponse.builder()
                .id(complaint.getId())
                .category(complaint.getCategory())
                .description(complaint.getDescription())
                .status(complaint.getStatus())
                .priority(complaint.getPriority())
                .createdAt(complaint.getCreatedAt())
                .userId(complaint.getUser() != null ? complaint.getUser().getId() : null)
                .userName(complaint.getUser() != null ? complaint.getUser().getName() : null)
                .userRegNo(complaint.getUser() != null ? complaint.getUser().getRegNo() : null)
                .userEmail(complaint.getUser() != null ? complaint.getUser().getEmail() : null)
                .build();
    }
}
