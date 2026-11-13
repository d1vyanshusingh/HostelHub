package com.hostelhub.config;

import com.hostelhub.model.*;
import com.hostelhub.repository.ComplaintRepository;
import com.hostelhub.repository.RoomRepository;
import com.hostelhub.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            logger.info("Database is empty. Initializing demo seed data for HostelHub...");

            // 1. Seed Users (Student, Warden, Admin)
            User student = User.builder()
                    .email("alex.doe@hostelhub.edu")
                    .password(passwordEncoder.encode("password123"))
                    .name("Alex Doe")
                    .regNo("RA211100301089")
                    .role(Role.STUDENT)
                    .build();

            User warden = User.builder()
                    .email("warden.blocka@hostelhub.edu")
                    .password(passwordEncoder.encode("password123"))
                    .name("Dr. R. Ramanathan")
                    .regNo("STAFF-WAR-402")
                    .role(Role.WARDEN)
                    .build();

            User admin = User.builder()
                    .email("admin@hostelhub.edu")
                    .password(passwordEncoder.encode("password123"))
                    .name("Dr. Sunita Sharma")
                    .regNo("ADM-DIR-001")
                    .role(Role.ADMIN)
                    .build();

            userRepository.save(student);
            userRepository.save(warden);
            userRepository.save(admin);

            // 2. Seed Hostel Rooms
            roomRepository.save(new Room("Nelson Mandela Block", "A-201", 3, 3));
            roomRepository.save(new Room("Nelson Mandela Block", "A-202", 3, 2));
            roomRepository.save(new Room("Nelson Mandela Block", "A-203", 2, 2));
            roomRepository.save(new Room("Nelson Mandela Block", "A-204", 3, 2)); // 1 bed vacant
            roomRepository.save(new Room("Tagore Block", "B-101", 4, 3));
            roomRepository.save(new Room("Tagore Block", "B-102", 4, 4));
            roomRepository.save(new Room("Tagore Block", "B-103", 2, 0)); // 2 beds vacant

            // 3. Seed Sample Complaints for Student
            complaintRepository.save(Complaint.builder()
                    .category("Mess / Food Quality")
                    .description("Dinner soup was served cold and chapati was undercooked on Wednesday evening.")
                    .priority("Medium")
                    .status(ComplaintStatus.PENDING)
                    .createdAt(LocalDateTime.now().minusDays(1))
                    .user(student)
                    .build());

            complaintRepository.save(Complaint.builder()
                    .category("Electrical")
                    .description("Study lamp socket switch sparking occasionally when laptop charger is plugged in.")
                    .priority("High")
                    .status(ComplaintStatus.IN_PROGRESS)
                    .createdAt(LocalDateTime.now().minusDays(3))
                    .user(student)
                    .build());

            complaintRepository.save(Complaint.builder()
                    .category("Plumbing")
                    .description("Washroom basin drain draining slower than normal.")
                    .priority("Low")
                    .status(ComplaintStatus.RESOLVED)
                    .createdAt(LocalDateTime.now().minusDays(7))
                    .user(student)
                    .build());

            logger.info("HostelHub demo seed data successfully populated!");
        }
    }
}
