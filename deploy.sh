#!/bin/bash
set -e

echo "Building production bundle..."
npm run build

echo "Deploying to Vercel..."
if [ -n "$VERCEL_TOKEN" ]; then
  ./node_modules/.bin/vercel --prod --yes --token "$VERCEL_TOKEN"
else
  ./node_modules/.bin/vercel deploy --temporary --yes
fi

echo "Deployment complete!"
