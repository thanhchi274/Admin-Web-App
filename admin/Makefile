build-dev:
	docker build -t admin-app-dev -f Dockerfile.dev .

###################

build-local:
	docker build \
		-t admin-app-production:local \
		--build-arg CADDYFILE=Caddyfile.local \
		--build-arg BASE_URL=http://localhost:5000/api \
		-f Dockerfile.production .

###################

build-production:
	docker build \
		-t admin-app-production:production \
		--build-arg CADDYFILE=Caddyfile.production \
		--build-arg BASE_URL=https://chistoreadmin.com/api \
		-f Dockerfile.production .
