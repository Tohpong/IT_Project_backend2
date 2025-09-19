import { Router } from 'express';
import { pool } from '../../db.js';
import { ah } from '../../utils/asyncHandler.js';


export const router = Router();


router.get('/', ah(async (_req, res) => {
const [rows] = await pool.query('SELECT * FROM member');
res.json(rows);
}));


router.get('/:id', ah(async (req, res) => {
const [rows] = await pool.query('SELECT * FROM member WHERE member_id = ?', [req.params.id]);
if (!rows.length) return res.status(404).json({ message: 'Not found' });
res.json(rows[0]);
}));


router.post('/', ah(async (req, res) => {
const { member_id, full_name, age, phone, birthdate, gender, account_id } = req.body;
const sql = `INSERT INTO member (member_id, full_name, age, phone, birthdate, gender, account_id)
VALUES (?, ?, ?, ?, ?, ?, ?)`;
const [r] = await pool.execute(sql, [member_id, full_name, age, phone, birthdate, gender, account_id]);
res.status(201).json({ affectedRows: r.affectedRows });
}));


router.put('/:id', ah(async (req, res) => {
const { full_name, age, phone, birthdate, gender, account_id } = req.body;
const sql = `UPDATE member SET full_name=?, age=?, phone=?, birthdate=?, gender=?, account_id=?
WHERE member_id=?`;
const [r] = await pool.execute(sql, [full_name, age, phone, birthdate, gender, account_id, req.params.id]);
if (!r.affectedRows) return res.status(404).json({ message: 'Not found' });
res.json({ affectedRows: r.affectedRows });
}));


router.delete('/:id', ah(async (req, res) => {
const [r] = await pool.execute('DELETE FROM member WHERE member_id = ?', [req.params.id]);
if (!r.affectedRows) return res.status(404).json({ message: 'Not found' });
res.json({ affectedRows: r.affectedRows });
}));