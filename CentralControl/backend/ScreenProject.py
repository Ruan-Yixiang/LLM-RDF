import pickle
from typing import Dict
import time
import pandas as pd
from itertools import product


class ScreenProject:
    """
    A class to represent a screening project for experimental design.

    Attributes:
    - front_data (Dict): Dictionary containing initial project data from the front end.
    - name (str): Name of the project.
    - code (str): Project code.
    - space (list): List of parameter spaces for the screening.
    - status (str): Current status of the project.
    - screen_csv (str): CSV string of the screening matrix.
    - create_time (str): Project creation time.
    - id (int): Unique project ID.
    """

    def __init__(self, front_data: Dict):
        """
        Initializes the ScreenProject instance with provided front-end data.

        Parameters:
        - front_data (Dict): Initial data from the front end.
        """
        self.front_data = front_data
        self.name = self.front_data['name']
        self.code = self.front_data['code']
        self.space = self.front_data['space']
        self.status = 'non-execution'
        self.screen_csv = self.generate_screen_matrix(self.space)
        self.create_time = time.strftime('%Y-%m-%d-%H-%M', time.localtime())
        self.id = self.get_id()

    def get_id(self):
        """
        Retrieves and updates the project ID from a file.

        Returns:
        - id (int): Project ID.
        """
        with open('project/id.txt', 'r', encoding='utf-8') as f:
            id = int(f.read())
        with open('project/id.txt', 'w', encoding='utf-8') as f:
            f.write(str(id + 1))
        return id

    def save_instance(self):
        """
        Saves the current instance of ScreenProject to a pickle file.
        """
        filename = 'project/' + str(self.id) + '_' + self.name + '.pkl'
        with open(filename, 'wb') as f:
            pickle.dump(self, f)

    def generate_screen_matrix(self, space):
        """
        Generates a screening matrix based on the provided parameter space.

        Parameters:
        - space (list): List of parameter spaces for the screening.

        Returns:
        - df_str (str): CSV string of the screening matrix.
        """
        names = [item['name'] for item in space]
        ranges = [item['range'] for item in space]
        combinations = list(product(*ranges))
        df = pd.DataFrame(combinations, columns=names)
        df['value'] = ''
        df_str = df.to_csv(index=False, sep=',')
        return df_str
