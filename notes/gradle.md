# Gradle

## Intialize a project
```sh
gradle init
```

## Add gradle wrapper to an existing project
```sh
gradle wrapper
```

## Some gradle wrapper stuff
```sh
# Change gradle version
./gradlew wrapper --gradle-version=8.1.1

# List all sub-projects
./gradlew projects --info --console=verbose

# lists gradle daemons
./gradlew --status

# stop running daemons
./gradlew --stop

# run without a daemon (performance will degrade)
./gradlew --no-daemon
```

## dependencies
* `compileOnly`
* `runtimeOnly`
* `implementation`: both `compileOnly` and `runtimeOnly`
