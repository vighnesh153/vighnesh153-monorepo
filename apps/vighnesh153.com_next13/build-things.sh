#! /bin/zsh

if [[ -z "${DATABASE_URL}" ]]; then
  exit 0
if

npm run prisma:migrate:deploy
next build
