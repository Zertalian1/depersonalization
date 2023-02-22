package com.big_case_club.depersonalization.repositoryDepersonalize;



import com.big_case_club.depersonalization.modelDepersonalize.DepersonalizeData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepersonalizeDataRepository extends JpaRepository<DepersonalizeData, Long> {
}