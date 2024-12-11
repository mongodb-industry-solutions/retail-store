# docker compose --> mac
# docker-compose --> linux
git: 
	@git pull
	@git add .
	@git commit -m "$m" #m="your message"
	@git push 

status:
	@git status

open:
	@code .

build:
	docker-compose up --build -d

start: 
	docker-compose start

stop:
	docker-compose stop

clean:
	docker-compose down --rmi all -v