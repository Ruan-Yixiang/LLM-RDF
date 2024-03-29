from fastapi import APIRouter
from pydantic import BaseModel
import glob
import os
import pickle
from typing import Any

router = APIRouter()


class IdData(BaseModel):
    id: Any


@router.post("/load")
async def load(data: IdData):
    id_data = str(data.id)
    pkl_files = glob.glob(os.path.join('D:\\CentralControl\\project', "*.pkl"))
    for i in pkl_files:
        if i.split("\\")[-1].split("_")[0] == id_data:
            with open(i, "rb") as file:
                f = pickle.load(file)
    return {"code": f.code, "csv": f.screen_csv}
