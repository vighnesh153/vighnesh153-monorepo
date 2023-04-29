FROM python:3

SHELL ["/bin/bash", "--login", "-c"]

# install youtube-dl
RUN pip install --upgrade --force-reinstall "git+https://github.com/ytdl-org/youtube-dl.git"

# install nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
RUN nvm install 18
RUN nvm use 18

WORKDIR /app

RUN mkdir src

COPY ./lol.js ./src/lol.js

RUN node ./src/lol.js
#RUN youtube-dl --verbose "https://www.youtube.com/watch?v=2ueCyvI4DEo"
