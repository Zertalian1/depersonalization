package com.big_case_club.depersonalization.repository.depersonalize;



import com.big_case_club.depersonalization.model.depersonalize.DepersonalizeData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepersonalizeDataRepository extends JpaRepository<DepersonalizeData, Long> {
}