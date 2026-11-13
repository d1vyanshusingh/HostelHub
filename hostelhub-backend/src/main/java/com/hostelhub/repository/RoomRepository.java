package com.hostelhub.repository;

import com.hostelhub.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findAllByOrderByBlockNameAscRoomNumberAsc();

    List<Room> findByBlockName(String blockName);
}
