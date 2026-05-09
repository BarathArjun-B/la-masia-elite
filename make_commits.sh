#!/bin/bash

for i in {1..20}
do
  echo "<!-- Update $i: $(date) -->" >> README.md
  git add README.md
  git commit -m "Automated update $i"
done
