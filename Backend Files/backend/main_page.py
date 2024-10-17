from fastapi import APIRouter
import glob
import os
import pickle

router = APIRouter()

@router.post("/get-projects")
async def get_projects():
    """
    Fetches the list of all projects and their details.

    Returns:
    - A list of project details including ID, order name, creation time, type, and status.
    """
    # Fetch all pickle files in the 'project' directory
    pkl_files = glob.glob(os.path.join('project', "*.pkl"))
    pkl_files.sort()
    project_list = []

    # Iterate through each file
    for file_path in pkl_files:
        with open(file_path, "rb") as file:
            f = pickle.load(file)
            # Determine the type of project based on the class name
            name = f.__class__.__name__
            if name == 'BoProject':
                type_project = "Optimization"
            elif name == 'ScreenProject':
                type_project = 'Screen'
            else:
                type_project = None

            # Append project details to the project list
            project_list.append({
                "id": f.id,
                "order_name": f.name,
                "create_time": f.create_time,
                "type": type_project,
                "name": "",
                "status": f.status
            })

    # Sort the project list by project ID
    project_list.sort(key=lambda x: x['id'])

    return project_list
