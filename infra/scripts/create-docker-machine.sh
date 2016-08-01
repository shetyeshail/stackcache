#! /bin/bash

# Create color variables.
esc_seq="\x1b["
no_color=$esc_seq"39;49;00m"
red_color=$esc_seq"31;01m"
blue_color=$esc_seq"34;01m"
green_color=$esc_seq"32;01m"

# Create requisite variables.
new_line_char="
"
hosts_file_path="/etc/hosts"
docker_machine_url="gauntlet.dev"
docker_machine_name="gauntlet-dev"
docker_db_volume_name="gauntlet-db-volume"

# Create an exit hook.
function on_premature_exit {
 if [[ "$?" -ne "0" ]]; then
   echo -e "${red_color}✗ Failed to create docker machine.${no_color}"
 fi
}

# Setup the exit hook.
trap 'on_premature_exit' EXIT

# Exit on error.
set -e

# Check if the docker machine exists already.
if [[ -z "$(docker-machine ls --filter="Name=$docker_machine_name" --format='{{.Name}}')" ]]; then
  # Does not exist.
  echo -e "${blue_color}ℹ Creating docker machine called '$docker_machine_name'...${no_color}"
  docker-machine create --driver virtualbox $docker_machine_name

  # Create volumes.
  echo -e "${blue_color}ℹ Creating the requisite volumes...${no_color}"
  eval "$(docker-machine env $docker_machine_name)"
  docker volume create --name $docker_db_volume_name

  # Write entry in hosts file.
  echo -e "${blue_color}ℹ Writing a new entry to the hosts file...${no_color}"
  docker_machine_ip=$(docker-machine ip $docker_machine_name)
  # Used to check if 'DOMAIN_ALIAS' is in the hosts file
  domain_alias_entry=$(sudo grep -E "^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\s+${docker_machine_url}$" --color=never ${hosts_file_path} || echo '')
  if [[ -z "$domain_alias_entry" ]]; then
    # This means that there is gophr staging host yet, so we must append it
    echo "${new_line_char}${docker_machine_ip} ${docker_machine_url}" | sudo tee -a $hosts_file_path 1> /dev/null 2> /dev/null
  else
    # This means that there is a gophr staging host, so we must replace it
    sudo sed -E -e "s/${domain_alias_entry}/${docker_machine_ip} ${docker_machine_url}/" -i "" $hosts_file_path 1> /dev/null 2> /dev/null
  fi

  # Report success.
  echo -e "${green_color}✓ Docker machine created successfully.${no_color}"
  echo ""
  echo -e "Execute ${blue_color}eval \$(docker-machine env $docker_machine_name)${no_color} to link it to your shell."
else
  # Already exists.
  echo "Docker machine called '$docker_machine_name' already exists!"
  echo -e "Execute ${blue_color}eval \$(docker-machine env $docker_machine_name)${no_color} to link it to your shell."
  exit 1
fi
