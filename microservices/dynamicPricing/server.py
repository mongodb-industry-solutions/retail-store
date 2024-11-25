from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import subprocess, os, signal
from fastapi.responses import JSONResponse
import asyncio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

running_process = None

@app.get("/")
def status():
    return {"status": "OK"} 

@app.get("/start")
async def run_dataloader():
    global running_process
    if running_process is not None:
        return JSONResponse(content={"message": "A script is already running."}, status_code=400)
    try:
        print("Running...")
        running_process = subprocess.Popen(['python3', 'generator.py'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        asyncio.create_task(stop_script_after_timeout(120))
        return JSONResponse(content={"message": "generator.py started successfully."}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"message": "Failed to start generator.py", "error": str(e)}, status_code=500)

@app.get("/stop")
async def stop_dataloader():
    global running_process
    if running_process is None:
        return JSONResponse(content={"message": "No script is currently running."}, status_code=400)
    return await force_stop_script()

async def force_stop_script():
    global running_process
    try:
        running_process.send_signal(signal.SIGINT)
        running_process = None
        print("Script stopped successfully")
        return JSONResponse(content={"message": "Script stopped successfully."}, status_code=200)
    except Exception as e:
        print("Failed to stop the script")
        return JSONResponse(content={"message": "Failed to stop the script", "error": str(e)}, status_code=500)

async def stop_script_after_timeout(timeout):
    await asyncio.sleep(timeout)
    if running_process:
        await force_stop_script()
        print("Done")  # Print statement after 120 seconds
