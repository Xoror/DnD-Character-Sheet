const fs = require("fs")

const doesFolderExist = (path) => {
    fs.access(path, (err) => {
        if(err) {
            if(err.code === "ENOENT") {
                fs.smkdir(path, { recursive: true }, (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        }
        else {
            console.log("folder already exists :3")
        }
    })
}

const loadAllCharacters = async (event, arg, app) => {
    let path = app.getPath("userData") + "\\characters"
    doesFolderExist(path)
    let characters = []
    const promiseTest = new Promise((resolve, reject) => {
        fs.readdir(path, async (err, files) => {
            if (err) {
                console.error(err);
                resolve({status:"err", body: err})
            }
            files.forEach((file) => {
                const toLoadPath = (name) => {
                    return path + "\\" + name
                }
                fs.open(toLoadPath(file), "r", async (err, fd) => {
                    if (err) {
                        console.log(err)
                        resolve({status: "err", body: err})
                    }
                    fs.readFile(toLoadPath(file), (err, data) => {
                        if (err) {
                            console.log(err)
                            resolve({status:"err", body: err})
                        }
                        else{
                            let dataParsed = JSON.parse(data)
                            characters.push({
                                name: dataParsed.name,
                                id: dataParsed.id
                            })
                            fs.close(fd, (err) => {
                                if(err) {
                                    console.log(err)
                                    resolve({status: "err", body: err})
                                }
                            })
                            if(characters.length === files.length) {
                                resolve({status: "ok", body: characters})
                            }
                        }
                    })
                })
            })
        })
    })
    let bla = await promiseTest
    return bla
}
const loadCharacter = async (event, arg, app) => {
    let path = app.getPath("userData") + "\\characters"
    doesFolderExist(path)
    let data = {
      name: arg[1],
    }
    let testName = data.name
    const toLoadPath = (name) => {
        return path + "\\" + name+".json"
    }
    const promiseTest = new Promise((resolve, reject) => {
        fs.open(toLoadPath(testName), "r", async (err, fd) => {
            if (err) {
                console.log(err)
                resolve({status: "err", body: err})
            }
            fs.readFile(toLoadPath(testName), (err, readData) => {
                if (err) {
                    console.log(err)
                    resolve({status:"err", body: err})
                }
                else{
                    let dataParsed = JSON.parse(readData)
                    fs.close(fd, (err) => {
                        if(err) {
                            console.log(err)
                            resolve({status: "err", body: err})
                        }
                        resolve({status: "ok", body: dataParsed})
                    })

                }
            })
        })
    })
    return await promiseTest
}
const saveCharacter = async (event, arg, app) => {
    let path = app.getPath("userData") + "\\characters"
    doesFolderExist(path)
    
    let data = {
      name: arg[1][0],
      lastSaved: arg[1][2],
      id: arg[1][3],
      state: arg[1][1]
    }
    let testName = data.name
    const toSavePath = (name) => {
        return path + "\\" + name+".json"
    }
    const promiseTest = new Promise((resolve, reject) => {
        fs.open(toSavePath(testName), "wx", async (err, fd) => {
            if (err) {
                console.log(err)
                resolve({status: "err", body: err})
            }
            fs.writeFile(toSavePath(testName), JSON.stringify(data), (err) => {
                if (err) throw err;
                else{
                    fs.close(fd, (err) => {
                        if(err) {
                            console.log(err)
                            resolve({status: "err", body: err})
                        }
                        resolve({status: "ok", body: data})
                    })
                }
            })
        })
    })
    return await promiseTest
}
const updateCharacter = async (event, arg, app) => {
    let path = app.getPath("userData") + "\\characters"
    doesFolderExist(path)
    
    let data = {
      name: arg[1][0],
      state: arg[1][1],
      lastSaved: arg[1][2]
    }
    let testName = data.name
    const toSavePath = (name) => {
        return path + "\\" + name+".json"
    }
    const promiseTest = new Promise((resolve, reject) => {
        fs.open(toSavePath(testName), "w+", async (err, fd) => {
            if (err) {
                resolve({status:"err", body: err})
            }
            fs.writeFile(toSavePath(testName), JSON.stringify(data), (err) => {
                if (err) throw err;
                else{
                    fs.close(fd, (err) => {
                        if(err) {
                            resolve({status:"err", body: err})
                        }
                        resolve({status: "ok", body: data})
                    })
                }
            })
        })
    })
    return await promiseTest
}

module.exports = { loadAllCharacters, loadCharacter, saveCharacter, updateCharacter }