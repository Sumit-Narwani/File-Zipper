function decode(data){
    // Splitting string into huffman tree, padding, encoded text
    data = data.split('\n');
    if(data.length === 4){
        // Handling new line in huffman tree
        data[0] = data[0] + '\n' + data[1];
        data[1] = data[2];
        data[2] = data[3];
        data.pop();
    }

    this.ind = 0;

    // Decoding Huffman tree
    const huffman_encoder = this.destrigify(data[0]);

    // data[2] contains the encoded text
    const text = data[2];

    // Encoded text to binary string
    let binary_string = "";
    for(let i=0; i<text.length; i++){

        // Converting character to binary string
        let num = text[i].charCodeAt(0);
        let bin = "";
        for(let j=0; j<8; j++){
            bin = num%2 + bin;
            num = Math.floor(num/2);
        }
        binary_string = binary_string + bin;
    }
}


// Removing padding
binary_string = binary_string.substring(0, binary_string.length - data[1]);


// Binary string to original text using huffman tree    
let res = "";
let node = huffman_decoder;
for(let i=0; i<binary_string.length; i++){
    if(binary_string[i] === '0'){
        node = node[0];
    }
    else {
        node = node[1];
    }

    if(typeof(node[0]) === 'string'){
        res += node[0];
        node = huffman_decoder;
    }
}

let info = "Decompression complete and file sent for download";

// Returning decoded text, tree structure, extra info
return [res, this.display(huffman_decoder, true), info];
