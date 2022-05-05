module.exports = {
  apps : [{
    name   : "Keycloak Server",
    script : "./keycloak-baremetal/keycloak-17.0.1/bin/kc.sh start",
    max_memory_restart : "2G"
  },
  {
    name   : "LearnTree SPA",
    script : "npm start --prefix ltspa/",
    max_memory_restart : "2G"
  },
  {
    name   : "Learn Tree Graph API",
    script : "dotnet ltgraph.api.dll --urls \"https://localhost:4155\"",
    cwd: "./apis/learntree-graph/ltgraph.api/bin/Debug/net6.0/",
    watch: true,
    max_memory_restart : "2G"
  },
  {
    name : "Learn Tree MessageHub",
    script: "dotnet message-hub.api.dll --urls \"https://localhost:4156\"",
    cwd: "./apis/lt-message-hub/message-hub.api/bin/Debug/net6.0/",
    watch: true,
    max_memory_restart: "2G"
  }
 ]
}
