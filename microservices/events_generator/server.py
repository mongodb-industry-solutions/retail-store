from typing import Union
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import subprocess, os, signal
from fastapi.responses import JSONResponse
from fastapi import APIRouter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

running_process = None

@app.get("/start")
async def run_dataloader():
    global running_process
    if running_process is not None:
        return JSONResponse(content={"message": "A script is already running."}, status_code=400)
    try:
        print("Running...")
        running_process = subprocess.Popen(['python3', 'generator.py'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        return JSONResponse(content={"message": "generator.py started successfully."}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"message": "Failed to start generator.py", "error": str(e)}, status_code=500)

@app.get("/stop")
async def stop_dataloader():
    global running_process
    if running_process is None:
        return JSONResponse(content={"message": "No script is currently running."}, status_code=400)
    try:
        running_process.send_signal(signal.SIGINT)  
        stdout, stderr = running_process.communicate()  
        running_process = None
        return JSONResponse(content={"message": "Script stopped successfully.", "output": stdout, "error": stderr}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"message": "Failed to stop the script", "error": str(e)}, status_code=500)

