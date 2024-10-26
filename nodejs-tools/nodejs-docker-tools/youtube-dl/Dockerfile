FROM python:3

SHELL ["/bin/bash", "--login", "-c"]

# install youtube-dl
RUN pip install --upgrade --force-reinstall "git+https://github.com/ytdl-org/youtube-dl.git"

# install nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
RUN nvm install 20
RUN nvm use 20

RUN npm install -g @vighnesh153/ftp-server

WORKDIR /app

COPY ./ftp-server.sh ./ftp-server.sh

EXPOSE 3000

# Single video
#RUN youtube-dl --restrict-filenames "https://www.youtube.com/watch?v=siRtCe8ubUw"

# Playlist
#RUN youtube-dl --restrict-filenames "https://www.youtube.com/playlist?list=PLWjnUvtRvqfJ_KSltq8VHxGofttyge1rL"

CMD ./ftp-server.sh
