function destringify(data){
    // Decoding huffman tree
    // node array to store tree nodes
    let node = [];     
     
    // Only when it gets <'> , then it is a character(Leaf Node)
    if(data[this.ind] === '\''){
       
        // Incrementing the index to skip the <'> character
        this.ind++;         
        
        // Pushing the element to the node array
        node.push(data[this.ind]);      
        this.ind++;
        return node;
    }

    // else part (if there are internal nodes)
    this.ind++;

    // Surely the internal node will have two childs
    // Incremented the index, then we got the left child by calling the function destringify
    let left = this.destringify(data);
    
    // Pushing the left node to the node array.
    node.push(left);
    this.ind++;

    // Again the char at next index would be the right child.
    let right = this.destringify(data);
    
    // Pushing the right node to the node array
    node.push(right);

    return node;
}