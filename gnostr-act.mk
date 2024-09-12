gnostr-act:##
	@touch ~/GITHUB_TOKEN.txt
	@export $(cat ~/GITHUB_TOKEN.txt) && act -C $(PWD) -vbr -W $(PWD)/.github/workflows/$@.yml
gnostr-static:##
	@touch ~/GITHUB_TOKEN.txt
	@export $(cat ~/GITHUB_TOKEN.txt) && act -C $(PWD) -vbr -W $(PWD)/.github/workflows/$@.yml
gnostr-node:##
	@touch ~/GITHUB_TOKEN.txt
	@export $(cat ~/GITHUB_TOKEN.txt) && act -C $(PWD) -vbr -W $(PWD)/.github/workflows/$@.yml

.PHONY:gnostr-docker-build-all
gnostr-docker-build-all:gnostr-docker-git-build gnostr-docker-org-build

.PHONY:gnostr-docker-git-build
gnostr-docker-git-build:docker-start
	@docker build --tag git.gnostr.org:latest -f git.dockerfile .

.PHONY:gnostr-docker-org-build
gnostr-docker-org-build:docker-start
	@docker build --tag org.gnostr.org:latest -f org.dockerfile .

.PHONY:gnostr-docker-git-service
gnostr-docker-git-service:gnostr-docker-git-build
	@docker run --detach \
    --name git.gnostr.org.$(WEEBLE).$(WOBBLE).$(BLOCKHEIGHT) \
    --volume $(HOME):/home/$(shell whoami) \
    --volume $(PWD):/srv/git \
    --env GIT_PASSWORD=$(APP_KEY) \
    --publish 2222:22 \
    git.gnostr.org:latest

.PHONY:gnostr-docker-org-service
gnostr-docker-org-service:gnostr-docker-org-build
	@docker run --detach \
    --name org.gnostr.org.$(WEEBLE).$(WOBBLE).$(BLOCKHEIGHT) \
    --volume $(PWD):/home/node/app \
    --publish ${PORT}:${PORT} \
    --publish 9229:9229 \
    org.gnostr.org:latest

gnostr-docker-service-all:gnostr-docker-org-service gnostr-docker-git-service

# vim: set noexpandtab:
# vim: set setfiletype make
