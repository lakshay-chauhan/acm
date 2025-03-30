const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json()); 


app.get('/', (req, res) => {
    res.send("Currency Exchange API is running...");
});


app.get('/currencies', (req, res) => {
    db.query("SELECT * FROM currencies", (err, results) => {
        if (err) {
            console.error("❌ Error fetching currencies:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});


app.post('/currencies', (req, res) => {
    const { currency_code, rate_to_usd } = req.body;
    
    if (!currency_code || !rate_to_usd) {
        return res.status(400).json({ error: "Missing currency_code or rate_to_usd" });
    }

    db.query(
        "INSERT INTO currencies (currency_code, rate_to_usd) VALUES (?, ?)", 
        [currency_code, rate_to_usd], 
        (err) => {
            if (err) {
                console.error("❌ Error inserting currency:", err);
                return res.status(500).json({ error: "Database error" });
            }
            res.json({ message: "✅ Currency added" });
        }
    );
});


app.put('/currencies/:id', (req, res) => {
    const { id } = req.params;
    const { rate_to_usd } = req.body;

    if (!rate_to_usd) {
        return res.status(400).json({ error: "Missing rate_to_usd" });
    }

    db.query(
        "UPDATE currencies SET rate_to_usd=? WHERE id=?", 
        [rate_to_usd, id], 
        (err) => {
            if (err) {
                console.error("❌ Error updating currency:", err);
                return res.status(500).json({ error: "Database error" });
            }
            res.json({ message: "✅ Rate updated" });
        }
    );
});


app.delete('/currencies/:id', (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM currencies WHERE id=?", [id], (err) => {
        if (err) {
            console.error("❌ Error deleting currency:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "✅ Currency deleted" });
    });
});


app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
