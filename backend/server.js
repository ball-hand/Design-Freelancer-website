const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const projectRoutes = require('./routes/projectRoutes');
const bidRoutes = require('./routes/bidRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/projects', projectRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/users', userRoutes);
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
module.exports = app ;