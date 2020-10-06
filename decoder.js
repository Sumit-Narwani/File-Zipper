function decode(data){
    data = data.split('\n');
    if(data.length===4){
        // Handling new line
        data[0] = data[0] + '\n' + data[1];
        data[1] = data[2];
        data[2] = data[3];
        data.pop();
    }

    this.ind = 0;
    const huffman_decoder = this.destringify(data[0]);
    const text = data[2];

    let binary_string = "";
    for(let i=0;i<text.length;i++){
        let num = text[i].charCodeAt(0);
        let bin = "";
        for(let j=0;j<8;j++){
            bin = num%2 + bin;
            num = Math.floor(num/2);
        }
        binary_string = binary_string + bin;
    }
    binary_string = binary_string.substring(0,binary_string.length-data[1]);

    console.log(binary_string.length);

    let res = "";
    let node = huffman_decoder;
    for(let i=0;i<binary_string.length;i++){
        if(binary_string[i]==='0'){
            node = node[0];
        } else{
            node = node[1];
        }

        if(typeof(node[0])==="string"){
            res += node[0];
            node = huffman_decoder;
        }
    }
    let info = "Decompression complete and file sent for download";
    return [res, this.display(huffman_decoder, true), info];
}

