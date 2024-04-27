const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(express.static('static'));

// Handle language detection request
app.post('/getLanguage', (req, res) => {
  const text = req.body.text;
  let responseSent = false;

  const pythonProcess = spawn('python', ['language_detection.py']);

  pythonProcess.stdin.write(text + '\n');
  pythonProcess.stdin.end();

  pythonProcess.stdout.on('data', (data) => {
    const language = data.toString().trim();
    if (!responseSent) {
      res.json({ language });
      responseSent = true;
    }
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error('Error:', data.toString());
    if (!responseSent) {
      res.status(500).json({ error: 'Internal server error' });
      responseSent = true;
    }
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0 && !responseSent) {
      console.error(`Python process exited with code ${code}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});


app.post('/getSummary', (req, res) => {
  const text = req.body.text;

  // Step 1: Get language from language detection endpoint
  fetch('/getLanguage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: text })
  })
  .then(response => response.json())
  .then(data => {
    const language = data.language;

    // Step 2: Use language in the summarization process
    const pythonProcess = spawn('python', ['summarization.py', language]);

    pythonProcess.stdin.write(text + '\n');
    pythonProcess.stdin.end();

    pythonProcess.stdout.on('data', (data) => {
      const summary = data.toString().trim();
      res.json({ summary });
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error('Error:', data.toString());
      res.status(500).json({ error: 'Internal server error' });
    });
  })
  .catch(error => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  });
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
