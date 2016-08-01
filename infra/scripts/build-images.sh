#! /bin/bash

# Create color variables.
esc_seq="\x1b["
no_color=$esc_seq"39;49;00m"
red_color=$esc_seq"31;01m"
blue_color=$esc_seq"34;01m"
green_color=$esc_seq"32;01m"

# Create requisite variables.
project_root="$( dirname $( dirname $( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd ) ) )"
image_name_db="gauntlet-db"
image_name_api="gauntlet-api"
image_name_web="gauntlet-web"

# Create an exit hook.
function on_premature_exit {
 if [[ "$?" -ne "0" ]]; then
   echo -e "${red_color}✗ Failed to build images.${no_color}"
 fi
}

# Setup the exit hook.
trap 'on_premature_exit' EXIT

# Exit on error.
set -e

# Create arrays for image metadata.
image_tags=('latest' 'latest' 'latest')
image_names=($image_name_api $image_name_db $image_name_web)
image_paths=("$project_root/infra/images/api" "$project_root/infra/images/db" "$project_root/infra/images/web")

# Build each of the images.
for (( i=0; i<${#image_tags[@]}; i++ ))
do
  image_tag=${image_tags[i]}
  image_name=${image_names[i]}
  image_path=${image_paths[i]}

  echo -e "${blue_color}ℹ Building '$image_name:image_tag'...${no_color}"
  docker build \
    --rm \
    -t "$image_name:$image_tag" \
    -f "$image_path/Dockerfile" \
    "$project_root"
done

# Report success.
echo -e "${green_color}✓ Images build successfully.${no_color}"
