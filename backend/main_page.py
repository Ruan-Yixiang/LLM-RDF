from fastapi import APIRouter
import glob
import os
import pickle

router = APIRouter()


@router.post("/get-projects")
async def get_projects():
    pkl_files = glob.glob(os.path.join('D:\\CentralControl\\project', "*.pkl"))
    pkl_files.sort()
    project_list = []
    for file_path in pkl_files:
        with open(file_path, "rb") as file:
            f = pickle.load(file)
            name = f.__class__.__name__
            if name == 'BoProject':
                type_project = "Optimization"
            elif name == 'ScreenProject':
                type_project = 'Screen'
            else:
                type_project = None
            project_list.append({
                "id": f.id,
                "order_name": f.name,
                "create_time": f.create_time,
                "type": type_project,
                "name": "",
                "status": f.status
            })
    project_list.sort(key=lambda x: x['id'])
    return project_list
