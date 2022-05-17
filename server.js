require('dotenv').config();

const PORT = 8000;
const express = require('express');
const cors = require('cors');
// const axios = require('axios');
const app = express();
app.use(cors());
app.use(express.json());

const paypal = require('@paypal/checkout-server-sdk');
const Environment = 
    process.env.NODE_ENV === 'production'
        ? paypal.core.LiveEnvironment
        : paypal.core.SandboxEnvironment;
const paypalClient = new paypal.core.PayPalHttpClient(
    new Environment(
        process.env.REACT_APP_PAYPAL_CLIENT_ID, 
        process.env.REACT_APP_PAYPAL_CLIENT_SECRET
    )
);

const storeItems = new Map([
    [1, {price: 10, name: "Item A"}],
    [2, {price: 20, name: "Item B"}],
])

// app.get('/music', (req, res) => {
//     const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
//     res.json(CLIENT_ID);
// })

// app.get('/', (req, res) => {
//     res.render('index', {paypalClientId: process.env.REACT_APP_PAYPAL_CLIENT_ID})
// })

app.get("/get-items", (req, res) => {
    let array = Array.from(storeItems, ([id, details]) => ({ id, details }));
    res.send({message: "Backend: Get Items", data: array});
  })

app.post('/create-order', async (req, res) => {
    const request = new paypal.orders.OrdersCreateRequest();
    const total = req.body.items.reduce((sum, item) => {
        return sum + storeItems.get(item.id).price * item.quantity;
    }, 0);
    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'CAD',
                    value: total,
                    breakdown: {
                        item_total: {
                            currency_code: "CAD",
                            value: total
                        }
                    }
                },
                items: req.body.items.map(item => {
                    const storeItem = storeItems.get(item.id);
                    return {
                        name: storeItem.name,
                        unit_amount: {
                            currency_code: "CAD",
                            value: storeItem.price
                        },
                        quantity: item.quantity
                    }
                })
            }
        ]
    })

    try {
        const order = await paypalClient.execute(request);
        res.json({id: order.result.id});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
})

app.listen(8000, () => console.log(`Server is running on ${PORT}`));