#!/bin/bash

fecha="$(date '+%Y%m%d')"
echo $fecha

filename="nepeype${fecha}BK.sql"
echo "backing db nepeype to ${filename} ... "
pg_dump -U victordbu -d nepeype > $filename

echo "Done"
