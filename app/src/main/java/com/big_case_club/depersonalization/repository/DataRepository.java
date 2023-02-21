package com.big_case_club.depersonalization.repository;

import com.big_case_club.depersonalization.model.Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DataRepository extends CrudRepository<Data, Long> {
}