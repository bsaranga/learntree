pm2 --name KeycloakServer start "./keycloak-baremetal/keycloak-17.0.1/bin/kc.sh" -- start;
pm2 --name LTSPA start npm -- start --prefix ltspa/;
pm2 --name LTGraphAPI start dotnet -- run --project apis/learntree-graph/learntree_graph.api/leantree_graph.csproj;
