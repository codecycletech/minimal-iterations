# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.224.3/containers/debian/.devcontainer/base.Dockerfile

# [Choice] Debian version (use bullseye on local arm64/Apple Silicon): bullseye, buster
ARG VARIANT="buster"

# https://hub.docker.com/r/denoland/deno
FROM denoland/deno as deno

# https://hub.docker.com/_/microsoft-vscode-devcontainers
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}


COPY --from=deno . .

# ** [Optional] Uncomment this section to install additional packages. **
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>
