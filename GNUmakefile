SHELL                                   := /bin/bash
PWD                                     ?= pwd_unknown
TIME                                    := $(shell date +%s)
export TIME

OS                                      :=$(shell uname -s)
export OS
OS_VERSION                              :=$(shell uname -r)
export OS_VERSION
ARCH                                    :=$(shell uname -m)
export ARCH
ifeq ($(ARCH),x86_64)
TRIPLET                                 :=x86_64-linux-gnu
export TRIPLET
endif
ifeq ($(ARCH),arm64)
TRIPLET                                 :=aarch64-linux-gnu
export TRIPLET
endif
ifeq ($(ARCH),arm64)
TRIPLET                                 :=aarch64-linux-gnu
export TRIPLET
endif

HOMEBREW                                := $(shell type -P brew)
export HOMEBREW

PYTHON                                  := $(shell which python)
export PYTHON
PYTHON2                                 := $(shell which python2)
export PYTHON2
PYTHON3                                 := $(shell which python3)
ifeq ($(PYTHON3),)
PYTHON3                                 :=$(shell which python)
endif
export PYTHON3

PIP                                     := $(notdir $(shell which pip))
export PIP
PIP2                                    := $(notdir $(shell which pip2))
export PIP2
PIP3                                    := $(notdir $(shell which pip3))
export PIP3

ifeq ($(PYTHON3),/usr/local/bin/python3)
PIP                                    := pip
PIP3                                   := pip
export PIP
export PIP3
endif

#detect python
PYTHON_ENV                              = $(shell python -c "import sys; sys.stdout.write('1')  if hasattr(sys, 'base_prefix') else sys.stdout.write('0')" 2>/dev/null)
#detect python3
PYTHON3_ENV                             = $(shell python3 -c "import sys; sys.stdout.write('1') if hasattr(sys, 'base_prefix') else sys.stdout.write('0')")
export PYTHON_ENV
export PYTHON3_ENV

ifeq ($(PYTHON_ENV),1)
#likely in virtualenv
PYTHON_VENV                             := $(shell python -c "import sys; sys.stdout.write('1') if sys.prefix != sys.base_prefix else sys.stdout.write('0')" 2>/dev/null)
endif
export PYTHON_VENV

ifeq ($(PYTHON_VENV),1)
PYTHON3_VENV                            := $(shell python3 -c "import sys; sys.stdout.write('1') if sys.prefix != sys.base_prefix else sys.stdout.write('0')")
else
PYTHON_VENV                             :=$(PYTHON_ENV)
PYTHON3_VENV                            :=$(PYTHON3_ENV)
endif
export PYTHON3_VENV

ifeq ($(PYTHON_VENV),0)
USER_FLAG                               :=--user
else
USER_FLAG                               :=
endif

ifeq ($(project),)
PROJECT_NAME                            := $(notdir $(PWD))
else
PROJECT_NAME                            := $(project)
endif
export PROJECT_NAME

GIT_USER_NAME                           := $(shell git config user.name || echo $(PROJECT_NAME))
export GIT_USER_NAME
GH_USER_NAME                            := $(shell git config user.name || echo $(PROJECT_NAME))
ifneq ($(ghuser),)
GH_USER_NAME := $(ghuser)
endif
export GIT_USER_NAME

GIT_USER_EMAIL                          := $(shell git config user.email || echo $(PROJECT_NAME))
export GIT_USER_EMAIL
GIT_SERVER                              := https://github.com
export GIT_SERVER
GIT_SSH_SERVER                          := git@github.com
export GIT_SSH_SERVER
GIT_PROFILE                             := $(shell git config user.name || echo $(PROJECT_NAME))
export GIT_PROFILE
GIT_BRANCH                              := $(shell git rev-parse --abbrev-ref HEAD 2>/dev/null || echo $(PROJECT_NAME))
export GIT_BRANCH
GIT_HASH                                := $(shell git rev-parse --short HEAD 2>/dev/null || echo $(PROJECT_NAME))
export GIT_HASH
GIT_PREVIOUS_HASH                       := $(shell git rev-parse --short master@{1} 2>/dev/null || echo $(PROJECT_NAME))
export GIT_PREVIOUS_HASH
GIT_REPO_ORIGIN                         := $(shell git remote get-url origin 2>/dev/null || echo $(PROJECT_NAME))
export GIT_REPO_ORIGIN
GIT_REPO_NAME                           := $(PROJECT_NAME)
export GIT_REPO_NAME
GIT_REPO_PATH                           := $(HOME)/$(GIT_REPO_NAME)
export GIT_REPO_PATH

##TODO: make this more dynamic yet robust
RELAYS                                  =$(shell cat .relays)
export RELAYS


NODE_VERSION                            :=v16.14.2
export NODE_VERSION
NODE_ALIAS                              :=v16.14.0
export NODE_ALIAS
NVM_DIR                                 :=$(HOME)/.nvm
export NVM_DIR
PNPM_VERSION                            :=8.6.7
export PNPM_VERSION

PANDOC                                  :=$(shell which pandoc)
#PACKAGE_MANAGER                         :=yarn
#export PACKAGE_MANAGER
#PACKAGE_INSTALL                         :=add
#export PACKAGE_INSTALL

APP_KEY                                 :=$(shell cat APP_KEY)
export APP_KEY

WEEBLE                                  :=$(shell gnostr-weeble || echo "WEEBLE")
export WEEBLE
WOBBLE                                  :=$(shell gnostr-wobble || echo "WOBBLE")
export WOBBLE
BLOCKHEIGHT                             :=$(shell gnostr-blockheight || echo "BLOCKHEIGHT")
export BLOCKHEIGHT

ifneq ($(port),)
PORT :=$(port)
else
PORT =8080
endif
export PORT
-:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
## help

.PHONY: init
.ONESHELL:
	@touch requirements.txt
init:initialize venv##	initialize venv
## init
	@echo $(PYTHON)
	@echo $(PYTHON2)
	@echo $(PYTHON3)
	@echo $(PIP)
	@echo $(PIP2)
	@echo $(PIP3)
	@echo PATH=$(PATH):/usr/local/opt/python@3.10/Frameworks/Python.framework/Versions/3.10/bin
	@echo PATH=$(PATH):$(HOME)/Library/Python/3.10/bin
	test -d .venv || $(PYTHON3) -m virtualenv .venv
	( \
	   source .venv/bin/activate; $(PIP) install -q -r requirements.txt; \
	   $(PYTHON3) -m $(PIP) install $(USER_FLAG) --upgrade pip; \
	   $(PYTHON3) -m $(PIP) install $(USER_FLAG) -r requirements.txt; \
	   $(PIP) install -q --upgrade pip; \
	);
	( \
	    while ! docker system info > /dev/null 2>&1; do\
	    echo 'Waiting for docker to start...';\
	    if [[ '$(OS)' == 'Linux' ]]; then\
	     type -P systemctl && systemctl restart docker.service || type -P apk && apk add openrc docker && rc-service docker restart;\
	    fi;\
	    if [[ '$(OS)' == 'Darwin' ]]; then\
	     open --background -a /./Applications/Docker.app/Contents/MacOS/Docker;\
	    fi;\
	sleep 1;\
	done\
	)
	@bash -c ". .venv/bin/activate &"

help:## 	verbose help
	@sed -n 's/^## //p' ${MAKEFILE_LIST} | column -t -s ':' |  sed -e 's/^/ /'
.ONESHELL:
env:
	@echo -e "PORT=8080"                                 >.env
	@echo -e "HOST=0.0.0.0"                             >>.env
	@echo -e "NODE_ENV=development"                     >>.env
	@echo -e "APP_KEY=UgSS9o_p04BZ0duSOyJ1kz6TjlTXoOaE" >>.env
	@echo -e "DRIVE_DISK=local"                         >>.env
	@echo -e "SESSION_DRIVER=cookie"                    >>.env
	@echo -e "CACHE_VIEWS=false"                        >>.env
	@echo -e "PROXY_URL=wss://relay.gnostr.org"         >>.env
	@echo RELAYS=$(RELAYS)                              >>.env
	@echo "Try:"
	@echo "git update-index --assume-unchanged .env"
	@echo "git update-index --assume-unchanged APP_KEY"
#@cat .env > .env.example
.PHONY:pnpm
pnpm:nvm
	$(shell echo node ace generate:key) | sed 's/>.*//' > APP_KEY && cat APP_KEY
	@curl -fsSL https://get.pnpm.io/install.sh | sh - || echo "pnpm install script failed"
	@npm i --global yarn  --force || which yarn || echo "yarn not found"
	@npm i --global pnpm  --force || which pnpm || echo "pnpm not found"
	@pnpm install reflect-metadata || echo "pnpm install reflect-metadata failed"
	@pnpm install pino-pretty || echo "pnpm install pino-pretty failed"
	@pnpm install @adonisjs/core/build/standalone || echo "pnpm install @adonisjs/core/build/standalone failed..."

run:## 	gnostr-org
	@npm start
run-dev:run## 	run-dev
run-production:## 	run-production
	@npm run build && install .env build/ && cd build && pnpm install --prod && node server.js
lynx-dump:
	@type -P lynx && lynx -dump -dont_wrap_pre -nolist http://127.0.0.1:6102 || echo #&& \
    #make lynx-dump | jq -R
lynx-dump-github-gnostr-org:
	@type -P lynx >/tmp/github.gnostr.org.log&& lynx -dump -dont_wrap_pre -nolist https://github.gnostr.org | jq .[1].content | tr -ds \" \  || echo #&& \
    #make lynx-dump | jq -R

install:pnpm env## 	install
	@install gnostr-org /usr/local/bin/
gnostr-org:install
	@$(shell whick gnostr-org)
.PHONY: report
report:## 	report
## report
	@echo ''
	@echo '[ENV VARIABLES]	'
	@echo ''
	@echo 'TIME=${TIME}'
	@echo 'BASENAME=${BASENAME}'
	@echo 'PROJECT_NAME=${PROJECT_NAME}'
	@echo ''
	@echo 'PYTHON_ENV=${PYTHON_ENV}'
	@echo 'PYTHON3_ENV=${PYTHON3_ENV}'
	@echo ''
	@echo 'PYTHON_VENV=${PYTHON_VENV}'
	@echo 'PYTHON3_VENV=${PYTHON3_VENV}'
	@echo ''
	@echo 'PYTHON=${PYTHON}'
	@echo 'PIP=${PIP}'
	@echo 'PYTHON2=${PYTHON2}'
	@echo 'PIP2=${PIP2}'
	@echo 'PYTHON3=${PYTHON3}'
	@echo 'PIP3=${PIP3}'
	@echo ''
	@echo 'NODE_VERSION=${NODE_VERSION}'
	@echo 'NODE_ALIAS=${NODE_ALIAS}'
	@echo 'PNPM_VERSION=${PNPM_VERSION}'
	@echo 'NVM_DIR=${NVM_DIR}'
	@echo ''
	@echo 'PANDOC=${PANDOC}'
	@echo ''
	@echo 'HOMEBREW=${HOMEBREW}'
	@echo ''
	@echo 'GIT_USER_NAME=${GIT_USER_NAME}'
	@echo 'GH_USER_REPO=${GH_USER_REPO}'
	@echo 'GH_USER_SPECIAL_REPO=${GH_USER_SPECIAL_REPO}'
	@echo 'GIT_USER_EMAIL=${GIT_USER_EMAIL}'
	@echo 'GIT_SERVER=${GIT_SERVER}'
	@echo 'GIT_PROFILE=${GIT_PROFILE}'
	@echo 'GIT_BRANCH=${GIT_BRANCH}'
	@echo 'GIT_HASH=${GIT_HASH}'
	@echo 'GIT_PREVIOUS_HASH=${GIT_PREVIOUS_HASH}'
	@echo 'GIT_REPO_ORIGIN=${GIT_REPO_ORIGIN}'
	@echo 'GIT_REPO_NAME=${GIT_REPO_NAME}'
	@echo 'GIT_REPO_PATH=${GIT_REPO_PATH}'
	@echo ''
	@echo 'WEEBLE=${WEEBLE}'
	@echo 'WOBBLE=${WOBBLE}'
	@echo 'BLOCKHEIGHT=${BLOCKHEIGHT}'
	@echo ''
	@echo 'APP_KEY=${APP_KEY}'
	@echo ''

.PHONY: super
.ONESHELL:
super:
ifneq ($(shell id -u),0)
	@echo switch to superuser
	@echo cd $(TARGET_DIR)
	sudo -s
endif

checkbrew:##
## checkbrew
ifeq ($(HOMEBREW),)
	@/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" && $(MAKE) success || $(MAKE) failure
else
	@type -P brew && $(MAKE) success || $(MAKE) failure
endif

submodules:## 	submodules
## submodules
	# git submodule update --init --recursive
	git submodule foreach --recursive "git reset --hard; git submodule update --init; git fetch --all --tags"

.PHONY:public/gnostr-act
public/gnostr-act:
	type -P gnostr-act || git clone https://github.com/gnostr-org/gnostr-act.git ./public/gnostr-act 2>/tmp/gnostr.org.log || echo
	type -P gnostr-act || sudo su $(shell whoami) ./public/gnostr-act/install-gnostr-act && type -P gnostr-act && type -P go || echo

.ONESHELL:detect
.PHONY:detect
detect:## 	install sequence got Darwin and Linux
##detect
##	detect uname -s uname -m uname -p and install sequence

## 	Darwin
ifneq ($(shell id -u),0)
	@echo
	@echo $(shell id -u -n) 'not root'
	@echo
endif
	type -P gnostr-act || $(MAKE) public/gnostr-act
	#bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew update                     || echo "
	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install autoconf            || echo "
	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install automake            || echo "
##	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install boost               || echo "
	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install cmake --cask        || echo "
	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install coreutils           || echo "
	#bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install --cask docker       || echo "
	#bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install gcc                || echo "
	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install expat               || echo "
	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install gettext             || echo "
	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install gh                  || echo "
	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install git-archive-all     || echo "
	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install git-gui             || echo "
	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install glib-openssl        || echo "
	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install golang              || echo "
	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install libtool             || echo "
	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install mercurial           || echo "
	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install node@14             || echo "
	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install pandoc              || echo "
	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install pkg-config          || echo "
	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install python3             || echo "
	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install rustup              || echo "
	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install secp256k1           || echo "
	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install virtualenv          || echo "
	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew link --overwrite virtualenv || echo "
	bash -c "[ '$(shell uname -s)' == 'Darwin' ] && brew install zlib                || echo "
	#bash -c "[ '$(shell uname -s)' == 'Darwin' ] && /Applications/Docker.app/Contents/Resources/bin/docker system info || echo "







## 	Linux
ifneq ($(shell id -u),0)
	@echo
	@echo $(shell id -u -n) 'not root'
	@echo
endif
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get update                    || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install autoconf          || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install bison             || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install build-essential   || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install cargo             || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install clang             || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install cmake-curses-gui  || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install cmake             || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install expat             || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install gettext           || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install gh                || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install golang-go         || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install libcurl4-openssl-dev || echo"
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install libssl-dev        || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install libtool           || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install mercurial         || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install npm               || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install pandoc            || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install pkg-config        || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install python3           || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install python3-pip       || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install python-is-python3 || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install util-linux        || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install virtualenv        || echo   "
	bash -c "[ '$(shell uname -s)' == 'Linux' ] && sudo apt-get install zlib              || echo   "

##	install gvm sequence
	@rm -rf $(HOME)/.gvm || echo "not removing ~/.gvm"
	@bash -c "bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer) || echo 'not installing gvm...'"
	bash -c "[ '$(shell uname -m)' == 'x86_64' ] && echo 'is x86_64' || echo 'not x86_64';"
	bash -c "[ '$(shell uname -m)' == 'arm64' ] && [ '$(shell uname -s)' == 'Darwin' ] && type -P brew && brew install pandoc || echo 'not arm64 AND Darwin';"
	bash -c "[ '$(shell uname -m)' == 'i386' ] && echo 'is i386' || echo 'not i386';"

##	install rustup sequence
	$(shell echo which rustup) || curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | bash -s -- -y --no-modify-path --default-toolchain stable --profile default & . "$(HOME)/.cargo/env"

##	install nvm sequence
	@bash -c "curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash && export NVM_DIR='$(HOME)/.nvm'; [ -s '$(NVM_DIR)/nvm.sh' ] && \. '$(NVM_DIR)/nvm.sh'; [ -s '$(NVM_DIR)/bash_completion' ] && \. '$(NVM_DIR)/bash_completion' &"

	bash -c "which autoconf                   || echo "
	bash -c "which automake                   || echo "
	bash -c "which brew                       || echo "
	bash -c "which cargo                      || echo "
	bash -c "which cmake                      || echo "
	bash -c "which go                         || echo "
	bash -c "which node                       || echo "
	bash -c "which rustup                     || echo "

## 	install gnostr-org proxy
.ONESHELL:public
.PHONY:public
public:
	@bash ./gnostr.org\:public.sh || echo

.PHONY:index.html
index.html:
	pandoc profile/README.md > index.html

.PHONY:profile/README.md
profile/README.md:
	gnostr --sec $(shell gnostr-sha256) -t $(shell gnostr-weeble) -t $(shell gnostr-wobble) -t $(shell gnostr-blockheight) --envelope --content "curl https://raw.githubusercontent.com/gnostr-org/.github/master/gnostr-org | bash" > profile/README.md
.PHONY:profile
profile:profile/README.md

.ONESHELL:
docker-start:
## docker-start
	touch requirements.txt && $(PYTHON3) -m ensurepip --user && \
    $(PYTHON3) -m pip install -U -q -r requirements.txt
	test -d .venv || $(PYTHON3) -m virtualenv .venv
	( \
	   source .venv/bin/activate; $(PYTHON3) -m pip install -U -q -r requirements.txt; \
	   $(PYTHON3) -m pip install -U -q --upgrade pip; \
	);
	( \
	    while ! docker system info > /dev/null 2>&1; do\
	    echo 'Waiting for docker to start...';\
	    if [[ '$(OS)' == 'Linux' ]] && [[ '$(GITHUB_ACTIONS)' == 'false' ]]; then\
	    type -P apt && apt install docker*;\
	    type -P systemctl && systemctl restart docker.service || type -P service && service docker.service restart || type -P apk &&  apk add openrc docker && rc-service docker restart || echo "try installing docker manually...";\
	    fi;\
	    if [[ '$(OS)' == 'Darwin' ]] && [[ '$(GITHUB_ACTIONS)' == 'false' ]]; then\
	     open --background -a /./Applications/Docker.app/Contents/MacOS/Docker;\
	    fi;\
	sleep 1;\
	docker pull catthehacker/ubuntu:act-latest;\
	done\
	)

initialize:## 	initialize
## initialize
	@[[ '$(shell uname -m)' == 'x86_64' ]] && [[ '$(shell uname -s)' == 'Darwin' ]] && echo "is_Darwin/x86_64" || echo "not_Darwin/x86_64"
	@[[ '$(shell uname -m)' == 'x86_64' ]] && [[ '$(shell uname -s)' == 'Linux' ]] && echo "is_Linux/x86_64" || echo "not_Linux/x86_64"

failure:
	@-/usr/bin/false && ([ $$? -eq 0 ] && echo "success!") || echo "failure!"
success:
	@-/usr/bin/true && ([ $$? -eq 0 ] && echo "success!") || echo "failure!"

.PHONY: nvm
.ONESHELL:
nvm: ## 	nvm
	@echo "v16.14.2" > .nvmrc
	@curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash || git pull -C $(HOME)/.nvm && export NVM_DIR="$(HOME)/.nvm" && [ -s "$(NVM_DIR)/nvm.sh" ] && \. "$(NVM_DIR)/nvm.sh" && [ -s "$(NVM_DIR)/bash_completion" ] && \. "$(NVM_DIR)/bash_completion"  && nvm install $(NODE_VERSION) && nvm use $(NODE_VERSION)
	@source ~/.bashrc && nvm alias $(NODE_ALIAS) $(NODE_VERSION) &

nvm-clean: ## 	nvm-clean
	@rm -rf ~/.nvm

clean:## 	clean
	@git clean -xfd && git submodule foreach --recursive git clean -xfd && git reset --hard && git submodule foreach --recursive git reset --hard && git submodule update --init --recursive

tag:
	@git tag $(OS)-$(OS_VERSION)-$(ARCH)-$(shell date +%s)
	@git push -f --tags || echo "unable to push tags..."


test-curl:
	@gnostr --sec $(shell gnostr-sha256) \
    --envelope \
    --content \
    "$(shell curl -s http://127.0.0.1:6102 | grep "<li>" | sed 's/<li>//' | sed 's/<\/li\>//')"
test-query:
	@gnostr-query \
    -t gnostr \
    -t weeble \
    -t wobble | gnostr-cat -u ws://relay.gnostr.org:6102
test-curl-gnostr-org:
	@gnostr --sec $(shell gnostr-sha256) \
    --envelope \
    --content \
    "$(shell curl -s wss://relay.gnostr.org:6102 | grep "<li>" | sed 's/<li>//' | sed 's/<\/li\>//')"
test-query-gnostr-org:
	@gnostr-query \
    -t gnostr \
    -t weeble \
    -t wobble | gnostr-cat -u wss://relay.gnostr.org:6102

test-github-gnostr-org:
	@gnostr --sec $(shell gnostr-sha256) \
    --envelope \
    --content \
    "$(shell curl -s https://github.gnostr.org | grep "<li>" | sed 's/<li>//' | sed 's/<\/li\>//')"

-include Makefile
-include venv.mk
-include gnostr-act.mk

# vim: set noexpandtab
# vim: set setfiletype make
