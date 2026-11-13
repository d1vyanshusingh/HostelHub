package com.hostelhub.controller;

import com.hostelhub.dto.request.ComplaintRequest;
import com.hostelhub.dto.request.StatusUpdateRequest;
import com.hostelhub.dto.response.ComplaintResponse;
import com.hostelhub.service.ComplaintService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    /**
     * Submit a new complaint ticket (Logged-in Student)
     */
    @PostMapping
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<ComplaintResponse> createComplaint(
            @Valid @RequestBody ComplaintRequest request,
            Authentication authentication) {
        String studentEmail = authentication.getName();
        ComplaintResponse response = complaintService.createComplaint(request, studentEmail);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Get complaints raised by the currently logged-in student
     */
    @GetMapping("/my-complaints")
    public ResponseEntity<List<ComplaintResponse>> getMyComplaints(Authentication authentication) {
        String studentEmail = authentication.getName();
        List<ComplaintResponse> complaints = complaintService.getMyComplaints(studentEmail);
        return ResponseEntity.ok(complaints);
    }

    /**
     * Get all hostel complaints (Restricted to WARDEN or ADMIN)
     */
    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('WARDEN', 'ADMIN')")
    public ResponseEntity<List<ComplaintResponse>> getAllComplaints() {
        List<ComplaintResponse> complaints = complaintService.getAllComplaints();
        return ResponseEntity.ok(complaints);
    }

    /**
     * Update complaint status (e.g., mark as RESOLVED or IN_PROGRESS by Warden or Admin)
     */
    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('WARDEN', 'ADMIN')")
    public ResponseEntity<ComplaintResponse> updateComplaintStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequest request) {
        ComplaintResponse updatedComplaint = complaintService.updateComplaintStatus(id, request);
        return ResponseEntity.ok(updatedComplaint);
    }
}
