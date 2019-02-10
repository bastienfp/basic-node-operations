const fs = require('fs');

//write out data
function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

//where we will store our commands
function evaluateCmd(userInput) {
  //parses the user input to understand which command was typed
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch (command) {
    case "echo":
    //we will add the functionality of echo next within the object commandLibrary
    commandLibrary.echo(userInputArray.slice(1).join(" "));
    break;
    case "cat":
    commandLibrary.cat(userInputArray.slice(1));
    break;
    case "sort":
    commandLibrary.sort(userInputArray.slice(1));
    break;
    case "wc":
    commandLibrary.wc(userInputArray.slice(1));
    break;
    case "uniq":
    commandLibrary.uniq(userInputArray.slice(1));
    break;
    case "head":
    commandLibrary.head(userInputArray.slice(1));
    break;
    case "tail":
    commandLibrary.tail(userInputArray.slice(1));
    break;
    default:
    commandLibrary.errorHandler(userInputArray[0]);
    break;
  }
}

//where we will store the logic of our commands
const commandLibrary = {
  //the echo command
  "echo": function(userInput) {
    done(userInput);
  },
  //the cat command
  "cat": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if(err) throw err;
      done(data);
    });
  },
  //the sort command
  "sort": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if(err) throw err;
      let result = data.toString().split("\n").sort().join("\n");
      done(result);
    });
  },
  //the wc command
  "wc": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if(err) throw err;
      let lineArray = data.toString().split("\n");
      let lineCount = lineArray.length;
      let wordCount = 0;
      let decompose = lineArray.forEach(line => {
        let wordArray = [];
        if(line === ''){
          return ;
        } else {
          let wordSplit = line.split(' ').forEach(word => {
            if(word === ''){
              return ;
            } else {
              wordArray.push(word);
            }
          });
        }
        wordCount += wordArray.length;
        return ;
      });
      let bitesCount = fs.lstatSync(fileName).size;
      let result = lineCount + ' ' + wordCount + ' ' + bitesCount + ' ' + fileName;
      done(result);
    });
  },
  //the uniq command
  // "uniq": function(fullPath) {
  //   const fileName = fullPath[0];
  //   fs.readFile(fileName, (err, data) => {
  //     if(err) throw err;
  //     let lineArray = data.toString().split("\n");
  //     let uniqArray = lineArray;
  //     for(i=0; i <= lineArray.length -1; i++){
  //       if(lineArray[i] === lineArray[i+1]){
  //
  //       } else {
  //
  //       }
  //     }
  //   });
  // },
  //the head command
  "head": function(fullPath) {
    let fileName;
    let n;
    let fullPathLength = fullPath.length;
    if(fullPathLength === 1){
      fileName = fullPath[0];
      n = 10;
    } else {
      fileName = fullPath[fullPath.length - 1];
      fullPath.pop();
      let findingNString = fullPath.join('');
      let findingNArray = findingNString.match(/\d+/g).map(Number);
      n = findingNArray[0];
    }
    fs.readFile(fileName, (err, data) => {
      if(err) throw err;
      let lineArray = data.toString().split("\n");
      let resultArray = [];
      for(i=0; i < n; i++) {
        resultArray.push(lineArray[i]);
      }
      let result = resultArray.join("\n");
      done(result);
    });
  },
  //the tail command
  "tail": function(fullPath) {
    let fileName;
    let n;
    let fullPathLength = fullPath.length;
    if(fullPathLength === 1){
      fileName = fullPath[0];
      n = 10;
    } else {
      fileName = fullPath[fullPath.length - 1];
      fullPath.pop();
      let findingNString = fullPath.join('');
      let findingNArray = findingNString.match(/\d+/g).map(Number);
      n = findingNArray[0];
    }
    fs.readFile(fileName, (err, data) => {
      if(err) throw err;
      let lineArray = data.toString().split("\n");
      let resultArray = [];
      for(i=lineArray.length-1; i > lineArray.length-1-n; i--) {
        resultArray.unshift(lineArray[i]);
      }
      let result = resultArray.join("\n");
      done(result);
    });
  },
  //errorHandler command
  "errorHandler": function(wrongCommand) {
    let result = '-bash: '+ wrongCommand + ': command not found';
    done(result);
  }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
