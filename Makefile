### DEV

build-dev:
	cd admin && $(MAKE) build-dev
	cd backend && $(MAKE) build

run-dev:
	docker-compose -f docker-compose-dev.yml up

### LOCAL (prod config)

build-local:
	cd admin && $(MAKE) build-local
	cd backend && $(MAKE) build

run-local:
	ENV=local docker-compose -f docker-compose-production.yml up

### PROD

build-production:
	cd admin && $(MAKE) build-production
	cd backend && $(MAKE) build

run-production:
	ENV=production docker-compose -f docker-compose-production.yml up
stop:
	docker-compose docker-compose-production.yml down


### REMOTE

SSH_STRING:=root@188.166.176.71

ssh:
	ssh $(SSH_STRING)


# apt install make

copy-files:
	scp -r ./* $(SSH_STRING):/root/

# when you add firewall rule, have to add SSH on port 22 or it will stop working

# run challenge with cloudflare on flexible, then bump to full

