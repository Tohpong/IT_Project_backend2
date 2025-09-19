import { Router } from 'express';
import { pool } from '../../db.js';
import { ah } from '../../utils/asyncHandler.js';


export const router = Router();


router.get('/', ah(async (_req, res) => {
const [rows] = await pool.query('SELECT * FROM account');
res.json(rows);
}));


router.get('/:id', ah(async (req, res) => {
const [rows] = await pool.query('SELECT * FROM account WHERE account_id = ?', [req.params.id]);
if (!rows.length) return res.status(404).json({ message: 'Not found' });
res.json(rows[0]);
}));


router.post('/', ah(async (req, res) => {
const { account_id, username, password } = req.body;
const sql = 'INSERT INTO account (account_id, username, password) VALUES (?, ?, ?)';
const [r] = await pool.execute(sql, [account_id, username, password]);
res.status(201).json({ affectedRows: r.affectedRows });
}));


router.put('/:id', ah(async (req, res) => {
const { username, password } = req.body;
const sql = 'UPDATE account SET username = ?, password = ? WHERE account_id = ?';
const [r] = await pool.execute(sql, [username, password, req.params.id]);
if (!r.affectedRows) return res.status(404).json({ message: 'Not found' });
res.json({ affectedRows: r.affectedRows });
}));


router.delete('/:id', ah(async (req, res) => {
const [r] = await pool.execute('DELETE FROM account WHERE account_id = ?', [req.params.id]);
if (!r.affectedRows) return res.status(404).json({ message: 'Not found' });
res.json({ affectedRows: r.affectedRows });
}));