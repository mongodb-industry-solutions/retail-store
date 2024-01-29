git: 
	@git pull
	@git add .
	@git commit -m "$m" #m="your message"
	@git push 

status:
	@git status

open:
	@code .
