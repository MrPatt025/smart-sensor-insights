# backend/app/tests/services/test_cleaning.py
import pandas as pd
import pytest
from app.services.cleaning import clean_sensor_dataframe

@pytest.fixture
def sample_df():
    return pd.DataFrame([
        {"name": "s1", "value": 10.0, "timestamp": "2025-05-01T10:00:00Z"},
        {"name": None, "value": 12.0, "timestamp": "2025-05-01T11:00:00Z"},
        {"name": "s2", "value": None, "timestamp": "invalid"},
        {"name": "s3", "value": 15.0, "timestamp": "2025-05-01T12:00:00Z"},
    ])

def test_cleaning_drops_invalid(sample_df):
    df_clean, stats = clean_sensor_dataframe(sample_df)
    # only s1 and s3 remain
    assert len(df_clean) == 2
    assert set(df_clean["name"]) == {"s1", "s3"}

def test_stats_correct(sample_df):
    _, stats = clean_sensor_dataframe(sample_df)
    # values [10.0,15.0]
    assert pytest.approx(stats["mean"], rel=1e-3) == 12.5
    assert pytest.approx(stats["median"], rel=1e-3) == 12.5
    assert pytest.approx(stats["std"], rel=1e-3) == pytest.approx((5.0**0.5), rel=1e-3)
