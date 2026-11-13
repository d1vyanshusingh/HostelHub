package com.hostelhub.service;

import com.hostelhub.dto.response.RoomResponse;
import com.hostelhub.exception.ResourceNotFoundException;
import com.hostelhub.model.Room;
import com.hostelhub.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Transactional(readOnly = true)
    public List<RoomResponse> getAllRooms() {
        return roomRepository.findAllByOrderByBlockNameAscRoomNumberAsc()
                .stream()
                .map(RoomResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public RoomResponse getRoomById(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room", "id", id));
        return RoomResponse.fromEntity(room);
    }
}
