#! /bin/zsh

if [[ -z "${DATABASE_URL}" ]]; then
  echo "Database url not found. Skipping prisma migrate deploy..."
else
  npm run prisma:migrate:deploy  
fi

next build
