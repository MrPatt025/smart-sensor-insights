# backend/app/services/cleaning.py
import pandas as pd
from typing import Tuple, Dict

def clean_sensor_dataframe(df: pd.DataFrame) -> Tuple[pd.DataFrame, Dict[str, float]]:
    """
    - Drop rows where value is null or name is missing
    - Convert timestamp column to datetime
    - Compute basic stats: mean, median, std
    """
    # drop nulls
    df = df.dropna(subset=["name", "value"])
    # cast timestamp
    df["timestamp"] = pd.to_datetime(df["timestamp"], errors="coerce")
    df = df.dropna(subset=["timestamp"])
    # compute stats
    stats = {
        "mean": df["value"].mean(),
        "median": df["value"].median(),
        "std": df["value"].std()
    }
    return df, stats
