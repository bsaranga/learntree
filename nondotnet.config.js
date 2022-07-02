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
  }
 ]
}
