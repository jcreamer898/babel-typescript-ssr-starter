include .env

# ================================================================================
# Required targets, please do not modify
# ================================================================================

.PHONY: echo-image-name validate build image clean node_modules start

echo-image-name:
	@echo $(IMAGE_NAME)

validate:
	docker run --rm $(IMAGE_NAME) npm run validate

build:
	docker run --rm $(IMAGE_NAME) npm run build

start:
	docker run -p 3000:3000 -d $(IMAGE_NAME)

image:
	docker image build -t $(IMAGE_NAME) .

clean: rm-containers rm-images

# ================================================================================
# Custom (helper) Make targets go below here=
# ================================================================================

.PHONY: rm-containers rm-images node_modules dist

rm-containers:
	-@ docker container ls -aq -f "status=running" -f "label=my-service-id=$(MY_SERVICE_ID)" | xargs -I {} docker container kill {}
	-@ docker container ls -aq -f "status=exited" -f "label=my-service-id=$(MY_SERVICE_ID)" | xargs -I {} docker container rm {}

rm-images:
	-@ docker image ls -aq -f "dangling=true" -f "label=my-service-id=$(MY_SERVICE_ID)" | xargs -I {} docker image rm -f {}
