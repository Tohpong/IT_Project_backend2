import { Router } from 'express';
import { pool } from '../../db.js';
import { ah } from '../../utils/asyncHandler.js';


export const router = Router();


router.get('/', ah(async (_req, res) => {
const [rows] = await pool.query('SELECT * FROM trainer');
res.json(rows);
}));


router.get('/:id', ah(async (req, res) => {
const [rows] = await pool.query('SELECT * FROM trainer WHERE trainer_id = ?', [req.params.id]);
if (!rows.length) return res.status(404).json({ message: 'Not found' });
res.json(rows[0]);
}));


router.post('/', ah(async (req, res) => {
const { trainer_id, trainer_fullname, trainer_age, trainer_date, account_id } = req.body;
const sql = `INSERT INTO trainer (trainer_id, trainer_fullname, trainer_age, trainer_date, account_id)
VALUES (?, ?, ?, ?, ?)`;
const [r] = await pool.execute(sql, [trainer_id, trainer_fullname, trainer_age, trainer_date, account_id]);
res.status(201).json({ affectedRows: r.affectedRows });
}));


router.put('/:id', ah(async (req, res) => {
const { trainer_fullname, trainer_age, trainer_date, account_id } = req.body;
const sql = `UPDATE trainer SET trainer_fullname=?, trainer_age=?, trainer_date=?, account_id=?
WHERE trainer_id=?`;
const [r] = await pool.execute(sql, [trainer_fullname, trainer_age, trainer_date, account_id, req.params.id]);
if (!r.affectedRows) return res.status(404).json({ message: 'Not found' });
res.json({ affectedRows: r.affectedRows });
}));


router.delete('/:id', ah(async (req, res) => {
const [r] = await pool.execute('DELETE FROM trainer WHERE trainer_id = ?', [req.params.id]);
if (!r.affectedRows) return res.status(404).json({ message: 'Not found' });
res.json({ affectedRows: r.affectedRows });
}));