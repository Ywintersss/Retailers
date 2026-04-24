package com.retailers.shared.repository;

import com.retailers.shared.entity.EventStream;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventStreamRepository extends JpaRepository<EventStream, String> {
    List<EventStream> findTop10ByOrderByEventTimestampDesc();
}
