function stringify(node){
    
    // Encoding huffman tree
    if(typeof(node[1])==="string"){
        return '\''+node[1];
    }

    return '0' + this.stringify(node[1][0]) + '1' + this.stringify(node[1][1]);
}
