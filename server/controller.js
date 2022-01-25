const { send } = require('express/lib/response')
const housing = require('./db.json')
const idCounter = 4




module.exports = {
    getHouses: (req,res) => {
        res.status(200).send(housing)
    },
    deleteHouse: (req,res) => {
        let { id } = req.params
        let index = housing.findIndex(house => +house.id === +id)
        housing.splice(index,1)
        res.status(200).send(housing)
    },
    createHouse: (req,res) => {
        let { id,address,price,imageURL } = req.body
        let newHouse = {
            id: idCounter,
            address: address,
            price: price,
            imageURL: imageURL
        }
        housing.push(newHouse)
        res.status(200).send(housing)
        idCounter++
    },
    updateHouse: (req,res) => {
        let { id } = req.params
        let { type } = req.body
        let index = housing.findIndex(house => +house.id === +id)
        if (housing[index].price === 0 && type === 'minus') {
            res.status(400).send('cannot go below 0')
        } else if (housing[index].price === 500000 && type === 'plus') {
            res.status(400).send('cannot go above 500,000')
        } else if (type === 'minus') {
            housing[index].price -= 10000
            res.status(200).send(housing)
        } else if (type === 'plus') {
            housing[index].price += 10000
            res.status(200).send(housing)
        } else {
            res.sendStatus(400)
        }
    }
}