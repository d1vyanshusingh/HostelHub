package com.hostelhub.repository;

import com.hostelhub.model.Complaint;
import com.hostelhub.model.ComplaintStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    @Query("SELECT c FROM Complaint c JOIN FETCH c.user WHERE c.user.id = :userId ORDER BY c.createdAt DESC")
    List<Complaint> findByUserIdOrderByCreatedAtDesc(Long userId);

    @Query("SELECT c FROM Complaint c JOIN FETCH c.user ORDER BY c.createdAt DESC")
    List<Complaint> findAllWithUserOrderByCreatedAtDesc();

    List<Complaint> findByStatusOrderByCreatedAtDesc(ComplaintStatus status);
}
