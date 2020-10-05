function encode(data){
    // Get Heap
    this.heap = new BinaryHeap();

    // store frequency count
    const mp = new Map();
    for(let i=0;i<data.length;i++){
        if(data[i] in mp){
            mp[data[i]] = mp[data[i]] + 1;
        }
        else{
            mp[data[i]] = 1
        }
    }


    // Insert elements to heap
    // -neg because we need min heap

    for(const key in mp){
        this.heap.insert([-mp[key], key]);
    }


    // Creating Huffman tree
    while(this.heap.size() > 1){
        const node1 = this.heap.extractMax();
        const node2 = this.heap.extractMax();
        
        const node = [[node1[0] + node2[0], [node1, node2]];
        this.heap.insert(node);

    }

    // Extracting Huffman tree
    const huffman_encoder = this.heap.extractMax();


    // Get character to Binary string mappings
    this.mappings = {};
    this.getMappings(huffman_encoder, "");


    // Mapping character string to binary string
    let binary_string = "";
    for(let i=0; i<data.length; i++){
        binary_string = binary_string + this.mappings[data[i]];
    }


    // Padding binary string to make length multiple of 8
    let rem = ( 8 - binary_string.length % 8 ) % 8;
    let padding = "";
    for(let i=0; i<rem; i++){
        padding = padding + "0";
        binary_string = binary_string + padding;
    }

    
    // Binary string to corresponding array
    let result = "";
    for(let i=0; i<binary_string.length; i++){
        let num = 0;
        for(let j=0; j<8; j++){
            num = num*2 + (binary_string[i+j] - "0");
        }
        result = result + String.fromCharCode(num);
    }

    // Concatenating required info to decode the tree
    let final_res = this.stringify(huffman_encoder) + '\n' + rem + '\n' + result;
    let info = "Compression Ratio:" + data.length/final_res.length;
    info = "Compression complete and file sent for download" + '\n' + info;

    // Returning encoded data, tree structure, extra info
    return [final_res, this.display(huffman_encoder, false), info];

}



