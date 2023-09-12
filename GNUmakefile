.ONESHELL:-
-:
	@mv node_modules/.pnpm/go-ipfs@0.17.0/node_modules/go-ipfs/go-ipfs node_modules/.pnpm/go-ipfs@0.17.0/node_modules/go-ipfs/bin || echo "if fail rename mv node_modules/.pnpm/go-ipfs@0.17.0/node_modules/go-ipfs/go-ipfs to bin"
	. ~/.nvm/nvm.sh && nvm exec npm install -g --force @pnpm/exe && nvm exec npm install -g node-pre-gyp && nvm exec npm install wrtc &&  nvm exec pnpm install
builder:
	. ~/.nvm/nvm.sh && nvm exec pnpm run builder
