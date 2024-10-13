[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
# LLM-RDF
LLM-RDF: Large language model (LLM)-based reaction development framework.

The code and data repository of "Accelerated end-to-end chemical synthesis development with large language models".
+ The backend of the web application can be found in [backend](https://github.com/Ruan-Yixiang/LLM-RDF/tree/main/backend).
+ The frontend of the web application can be found in [frontend](https://github.com/Ruan-Yixiang/LLM-RDF/tree/main/frontend).
+ The Bayesian optimization algorithm and hardware scheduling control program used in reaction optimization are located in [AROPS](https://github.com/Ruan-Yixiang/LLM-RDF/tree/main/AROPS).
+ The files used to build llm-based agents and interact with llm-based agents can be found in [files](https://github.com/Ruan-Yixiang/LLM-RDF/tree/main/files).
## Deployment
### Backend & AROPS
1. `pip install -r requirements.txt`
2. Clone [backend](https://github.com/Ruan-Yixiang/LLM-RDF/tree/main/backend) and [AROPS](https://github.com/Ruan-Yixiang/LLM-RDF/tree/main/AROPS).
3. Run [backend.py](https://github.com/Ruan-Yixiang/LLM-RDF/blob/main/backend/backend.py).
### Frontend
1. Install enviroment on your device([Node.js](https://nodejs.dev/en/learn/how-to-install-nodejs/) v16.16.0 Recommended , and [detail steps](https://www.runoob.com/nodejs/nodejs-install-setup.html)); 
2. Clone [frontend](https://github.com/Ruan-Yixiang/LLM-RDF/tree/main/frontend);
3. (Recommended)`npm install -g npm@6.14.14`
4. `npm install` 
5. `npm run dev`

## Use Docker

1. docker pull demoivrelu/llm:v0.1
2. docker run --name display -d -p 9090:80 demoivrelu/llm:v0.1

​	In browser:	http://localhost:9090/#/main

## License

LLM-RDF is distributed under an MIT License.
