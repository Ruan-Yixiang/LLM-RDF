[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
# LLM-RDF
LLM-RDF: Large language model (LLM)-based reaction development framework.

The code and data repository of "Accelerated end-to-end chemical synthesis development with large language models".
+ The backend of the web application can be found in [backend](https://github.com/Ruan-Yixiang/LLM-RDF/tree/main/Backend%20Files/backend).
+ The frontend of the web application can be found in [frontend](https://github.com/Ruan-Yixiang/LLM-RDF/tree/main/frontend).
+ The source data of figures in the paper can be found in [Source Data](https://github.com/Ruan-Yixiang/LLM-RDF/tree/main/Source%20Data).
+ The files used to build llm-based agents and interact with llm-based agents can be found in [Files for LLM-based agents](https://github.com/Ruan-Yixiang/LLM-RDF/tree/main/Files%20for%20LLM-based%20agents).
+ An online deployment of the application: https://ruan-yixiang.github.io/LLM-RDF/#/main
## Deployment
Please refer to the demo.mp4 file provided to use the web application.
### Docker (Recommended, may take a few minutes)
1. Pull Docker Images
```shell
# AMD64
docker pull ruanyixiang/llm_rdf_back:latest
docker pull ruanyixiang/llm_rdf_front:latest
# ARM64
docker pull ruanyixiang/llm_rdf_back:arm
docker pull ruanyixiang/llm_rdf_front:arm
```
2. Run Back-End Service
```shell
docker run -p {BACKEND_PORT}:81 -d ruanyixiang/llm_rdf_back
```
3. Run Front-End Service\
Replace {BACKEND_URL} with the actual backend deployment URL.\
Replace {OPENWEBUI_URL} with the actual OpenWebUI deployment URL (unnecessary).
```shell
docker run --env=BACKEND_URL={BACKEND_URL} --env=VUE_APP_OPENWEBUI_URL={OPENWEBUI_URL} -p {FRONTEND_PORT}:83 -d ruanyixiang/llm_rdf_front
# Example
docker run --env=BACKEND_URL="http://127.0.0.1:81" -p 83:83 -d ruanyixiang/llm_rdf_front
```
4. Access the Application\
{FRONTEND_URL}/main\
Example: http://127.0.0.1:83/main
![main](https://github.com/user-attachments/assets/b6daca4c-6625-47fe-bc8d-7492731b104f)
### Manual Deployment (Not recommended, It may only work successfully on Intel CPU Windows 10.)
1. Clone the repository:
```shell
git clone https://github.com/Ruan-Yixiang/LLM-RDF.git
cd LLM-RDF
```
2. Install the backend environment\
Use conda to install the dependencies listed in [requirements.txt](https://github.com/Ruan-Yixiang/LLM-RDF/blob/main/CentralControl/requirements.txt):
```shell
# Create a new conda environment named 'llm_rdf_back' with Python 3.8
conda create -n llm_rdf_back python=3.8

# Activate the newly created environment
conda activate llm_rdf_back

# Install the required Python packages from requirements.txt
pip install -r CentralControl/requirements.txt
```
3. Run Back-End Service\
You can modify the backend url in [backend/backend.py](https://github.com/Ruan-Yixiang/LLM-RDF/blob/main/CentralControl/backend/backend.py#L31)
```shell
cd Source\ Data/
python backend/backend.py
```
4. Install [Node.js (v16.16.0)](https://nodejs.org/dist/v16.16.0/) on your device
5. Install the npm\
In a new terminal, navigate to the frontend directory and install npm:
```shell
cd frontend
npm install -g npm@6.14.14
```
6. Run Front-End Service\
You can modify the backend_url and openwebui_url in [vue.config.js](https://github.com/Ruan-Yixiang/LLM-RDF/blob/main/frontend/vue.config.js#L7-L8)
```shell
npm run dev
```
## License
LLM-RDF is distributed under an MIT License.
