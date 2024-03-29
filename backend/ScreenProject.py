import pickle
from typing import Dict
import time
import pandas as pd
from itertools import product


class ScreenProject:
    def __init__(self, front_data: Dict):
        self.front_data = front_data
        self.name = self.front_data['name']
        self.code = self.front_data['code']
        self.space = self.front_data['space']
        self.status = 'non-execution'
        self.screen_csv = self.generate_screen_matrix(self.space)
        self.create_time = time.strftime('%Y-%m-%d-%H-%M', time.localtime())
        self.id = self.get_id()

    def get_id(self):
        with open('D:/CentralControl/project/id.txt', 'r', encoding='utf-8') as f:
            id = int(f.read())
        with open('D:/CentralControl/project/id.txt', 'w', encoding='utf-8') as f:
            f.write(str(id + 1))
        return id

    def save_instance(self):
        filename = 'D:/CentralControl/project/' + str(self.id) + '_' + self.name + '.pkl'
        with open(filename, 'wb') as f:
            pickle.dump(self, f)

    def generate_screen_matrix(self, space):
        names = [item['name'] for item in space]
        ranges = [item['range'] for item in space]
        combinations = list(product(*ranges))
        df = pd.DataFrame(combinations, columns=names)
        df['value'] = ''
        df_str = df.to_csv(index=False, sep=',')
        return df_str
