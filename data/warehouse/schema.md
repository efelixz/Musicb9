# Data Warehouse Structure

## ETL Pipeline
- **Source:** PostgreSQL (OLTP)
- **Target:** Snowflake / BigQuery
- **Orchestration:** Airflow / dbt

## Core Tables
- `f_generations`: Fact table for all AI generations.
- `d_users`: User dimension with plan history.
- `d_voice_profiles`: Dimensions for vocal identity profiles.
- `f_billing_events`: Revenue and credit usage events.
