package com.big_case_club.depersonalization.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.HashMap;

@EnableJpaRepositories(
        entityManagerFactoryRef = DatabaseDepersonalizeConfig.ENTITY_MANAGER_FACTORY,
        transactionManagerRef = DatabaseDepersonalizeConfig.TRANSACTION_MANAGER,
        basePackages = DatabaseDepersonalizeConfig.JPA_REPOSITORY_PACKAGE
)
@Configuration
public class DatabaseDepersonalizeConfig {
    public static final String PROPERTY_PREFIX = "app.depersonalize.datasource";
    public static final String JPA_REPOSITORY_PACKAGE = "com.big_case_club.depersonalization.repository.depersonalize";
    public static final String ENTITY_PACKAGE = "com.big_case_club.depersonalization.model.depersonalize";
    public static final String ENTITY_MANAGER_FACTORY = "depersonalizeEntityManagerFactory";
    public static final String DATA_SOURCE = "depersonalizeDataSource";
    public static final String DATABASE_PROPERTY = "depersonalizeDatabaseProperty";
    public static final String TRANSACTION_MANAGER = "depersonalizeTransactionManager";

    @Bean(DATABASE_PROPERTY)
    @ConfigurationProperties(prefix = PROPERTY_PREFIX)
    public DatabaseProperty appDatabaseProperty() {
        return new DatabaseProperty();
    }

    @Bean(DATA_SOURCE)
    public DataSource appDataSource(
            @Qualifier(DATABASE_PROPERTY) DatabaseProperty databaseProperty
    ) {
        return DataSourceBuilder
                .create()
                .username(databaseProperty.getUsername())
                .password(databaseProperty.getPassword())
                .url(databaseProperty.getUrl())
                .driverClassName(databaseProperty.getClassDriver())
                .build();
    }

    @Bean(ENTITY_MANAGER_FACTORY)
    public LocalContainerEntityManagerFactoryBean appEntityManager(
            @Qualifier(DATA_SOURCE) DataSource dataSource
    ) {
        final LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource);
        em.setPersistenceUnitName(ENTITY_MANAGER_FACTORY);
        em.setPackagesToScan(ENTITY_PACKAGE);
        em.setJpaVendorAdapter(new HibernateJpaVendorAdapter());

        final HashMap<String, Object> properties = new HashMap<>();
        properties.put("javax.persistence.validation.mode", "none");
        properties.put("hibernate.hbm2ddl.auto", "update");
        properties.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
        em.setJpaPropertyMap(properties);
        return em;
    }

    @Bean(TRANSACTION_MANAGER)
    public PlatformTransactionManager sqlSessionTemplate(
            @Qualifier(ENTITY_MANAGER_FACTORY) LocalContainerEntityManagerFactoryBean entityManager,
            @Qualifier(DATA_SOURCE) DataSource dataSource
    ) {
        final JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManager.getObject());
        transactionManager.setDataSource(dataSource);
        return transactionManager;
    }
}
