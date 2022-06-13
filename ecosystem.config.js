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
    max_memory_restart : "2G"
  },
  {
    name : "Learn Tree SignalR",
    script: "dotnet ltsignalr.api.dll --urls \"https://localhost:4156\"",
    cwd: "./apis/lt-signal-r/ltsignalr.api/bin/Debug/net6.0/",
    max_memory_restart: "2G"
  },
  {
    name: "Learn Tree Metadata API",
    script: "dotnet lt-core-api.dll --urls \"https://localhost:4157\"",
    cwd: "./apis/lt-core/lt-core-api/bin/Debug/net6.0/",
    max_memory_restart: "2G"
  }
 ]
}
