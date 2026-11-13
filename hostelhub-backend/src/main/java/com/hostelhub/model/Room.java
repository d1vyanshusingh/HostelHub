package com.hostelhub.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "rooms")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, length = 100)
    private String blockName;

    @NotBlank
    @Column(nullable = false, length = 30)
    private String roomNumber;

    @NotNull
    @Column(nullable = false)
    private Integer capacity;

    @NotNull
    @Column(nullable = false)
    private Integer currentOccupancy;

    public Room(String blockName, String roomNumber, Integer capacity, Integer currentOccupancy) {
        this.blockName = blockName;
        this.roomNumber = roomNumber;
        this.capacity = capacity;
        this.currentOccupancy = currentOccupancy;
    }

    public boolean isAvailable() {
        return this.capacity > this.currentOccupancy;
    }

    public int getAvailableBeds() {
        return Math.max(0, this.capacity - this.currentOccupancy);
    }
}
