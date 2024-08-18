from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from main_page import router as router_main_page
from input_screen import router as router_input_screen
from input_optimization import router as router_input_optimization
from display_optimization import router as router_display_optimization
from display_screen import router as router_display_screen

# Initialize the FastAPI app
app = FastAPI()

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include routers for different endpoints
app.include_router(router_main_page, prefix="/main-page", tags=["main-page"])
app.include_router(router_input_screen, prefix="/input-screen", tags=["input-screen"])
app.include_router(router_input_optimization, prefix="/input-optimization", tags=["input-optimization"])
app.include_router(router_display_optimization, prefix="/display-optimization", tags=["display-optimization"])
app.include_router(router_display_screen, prefix="/display-screen", tags=["display-screen"])

# Run the application
if __name__ == '__main__':
    uvicorn.run(app="backend:app", host="0.0.0.0", port=81, timeout_keep_alive=999999999)
