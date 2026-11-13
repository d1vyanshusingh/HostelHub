package com.hostelhub.dto.response;

import com.hostelhub.model.Room;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomResponse {

    private Long id;
    private String blockName;
    private String roomNumber;
    private Integer capacity;
    private Integer currentOccupancy;
    private Integer availableBeds;
    private Boolean isAvailable;

    public static RoomResponse fromEntity(Room room) {
        return RoomResponse.builder()
                .id(room.getId())
                .blockName(room.getBlockName())
                .roomNumber(room.getRoomNumber())
                .capacity(room.getCapacity())
                .currentOccupancy(room.getCurrentOccupancy())
                .availableBeds(room.getAvailableBeds())
                .isAvailable(room.isAvailable())
                .build();
    }
}
