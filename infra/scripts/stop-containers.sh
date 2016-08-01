#! /bin/bash

# Create color variables.
esc_seq="\x1b["
no_color=$esc_seq"39;49;00m"
blue_color=$esc_seq"34;01m"
green_color=$esc_seq"32;01m"

# Create requisite variables.
container_name_db="gauntlet-db"
container_name_api="gauntlet-api"
container_name_web="gauntlet-web"

# Create arrays for container metadata.
container_names=($container_name_db $container_name_api $container_name_web)

# Stop each of the containers.
for (( i=0; i<${#container_names[@]}; i++ ))
do
  container_name=${container_names[i]}

  echo -e "${blue_color}ℹ Stopping '$container_name'...${no_color}"
  docker stop $container_name && docker rm $container_name
done

# Report success.
echo -e "${green_color}✓ Containers stopped successfully.${no_color}"
