package com.hostelhub.service;

import com.hostelhub.dto.request.ComplaintRequest;
import com.hostelhub.dto.request.StatusUpdateRequest;
import com.hostelhub.dto.response.ComplaintResponse;
import com.hostelhub.exception.ResourceNotFoundException;
import com.hostelhub.model.Complaint;
import com.hostelhub.model.ComplaintStatus;
import com.hostelhub.model.User;
import com.hostelhub.repository.ComplaintRepository;
import com.hostelhub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public ComplaintResponse createComplaint(ComplaintRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        Complaint complaint = Complaint.builder()
                .category(request.getCategory())
                .description(request.getDescription())
                .priority(request.getPriority())
                .status(ComplaintStatus.PENDING)
                .user(user)
                .build();

        Complaint savedComplaint = complaintRepository.save(complaint);
        return ComplaintResponse.fromEntity(savedComplaint);
    }

    @Transactional(readOnly = true)
    public List<ComplaintResponse> getMyComplaints(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        return complaintRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(ComplaintResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ComplaintResponse> getAllComplaints() {
        return complaintRepository.findAllWithUserOrderByCreatedAtDesc()
                .stream()
                .map(ComplaintResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public ComplaintResponse updateComplaintStatus(Long complaintId, StatusUpdateRequest request) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint", "id", complaintId));

        complaint.setStatus(request.getStatus());
        Complaint updatedComplaint = complaintRepository.save(complaint);

        return ComplaintResponse.fromEntity(updatedComplaint);
    }
}
