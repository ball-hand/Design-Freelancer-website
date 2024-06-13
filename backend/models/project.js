const pool = require('../database');

const Project = {
  getAll: async () => {
    const res = await pool.query('SELECT * FROM projects');
    console.log(res)
    return res.rows;
    
  },
  create: async (data) => {
    const { headline, budget, description, attachment } = data;
    const res = await pool.query(
      'INSERT INTO projects (headline, budget, description, attachment, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [headline, budget, description, attachment, 'available']
    );
    return res.rows[0];
  },
  update: async (id, data) => {
    const { headline, budget, description, attachment } = data;
    const res = await pool.query(
      'UPDATE projects SET headline = $1, budget = $2, description = $3, attachment = $4, status = $5 WHERE id = $6 RETURNING *',
      [headline, budget, description, attachment, 'available [edited]', id]
    );
    return res.rows[0];
  },
  delete: async (id) => {
    await pool.query('DELETE FROM projects WHERE id = $1', [id]);
  },
};
console.log(Project.getAll);
module.exports = Project;
