from fastapi import APIRouter
from pydantic import BaseModel
import glob
import os
import pickle
from typing import Any

router = APIRouter()

class IdData(BaseModel):
    """
    Pydantic model for receiving project ID data in API requests.
    """
    id: Any

@router.post("/load")
async def load(data: IdData):
    """
    Loads project data based on the provided ID.

    Parameters:
    - data (IdData): Request body containing the project ID.

    Returns:
    - JSON response with project code and screen CSV data.
    """
    id_data = str(data.id)
    pkl_files = glob.glob(os.path.join('project', "*.pkl"))
    for i in pkl_files:
        if i.split(os.path.sep)[-1].split("_")[0] == id_data:
            with open(i, "rb") as file:
                f = pickle.load(file)
    return {"code": f.code, "csv": f.screen_csv}
