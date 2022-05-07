using System.Text.Json;
using Models;

string file = "Files/testLpath.json";

var stream = File.OpenText(file).BaseStream;
var data = await JsonSerializer.DeserializeAsync<Node>(stream);

void GetAllChildren(Node node) {
    var cList = node.Children;
    
}