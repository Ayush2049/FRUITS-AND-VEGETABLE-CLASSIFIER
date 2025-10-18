import { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setPrediction(null);
      setError(null);
    }
  };

  const handlePredict = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      console.log('Sending request to Flask...');
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Prediction failed');
      }

      setPrediction(data);
    } catch (err) {
      console.error('Error:', err);
      setError(`Error: ${err.message}. Make sure Flask server is running on http://localhost:5000`);
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setSelectedFile(null);
    setPreview(null);
    setPrediction(null);
    setError(null);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Fruit & Vegetable Classifier</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>Upload an image to classify</p>

      <div style={{ border: '2px dashed #ccc', borderRadius: '10px', padding: '40px', textAlign: 'center', marginTop: '30px' }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          id="file-input"
        />
        <label htmlFor="file-input">
          {preview ? (
            <div>
              <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '10px' }} />
              <br />
              <button onClick={resetAll} style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer' }}>
                Clear Image
              </button>
            </div>
          ) : (
            <div style={{ cursor: 'pointer' }}>
              <p style={{ fontSize: '50px', margin: '0' }}>📤</p>
              <p style={{ fontSize: '18px', margin: '10px 0' }}>Click to Upload Image</p>
              <p style={{ fontSize: '14px', color: '#666' }}>PNG, JPG, JPEG</p>
            </div>
          )}
        </label>
      </div>

      {selectedFile && !prediction && (
        <button
          onClick={handlePredict}
          disabled={loading}
          style={{
            width: '100%',
            marginTop: '20px',
            padding: '15px',
            fontSize: '18px',
            backgroundColor: loading ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Analyzing...' : 'Classify Image'}
        </button>
      )}

      {error && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#ffebee', border: '1px solid #f44336', borderRadius: '8px', color: '#c62828' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {prediction && prediction.success && (
        <div style={{ marginTop: '30px' }}>
          <div style={{ padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '10px', border: '2px solid #4CAF50' }}>
            <h3>Prediction Result</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#2e7d32', textTransform: 'capitalize' }}>
                {prediction.prediction}
              </span>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#555' }}>
                {prediction.confidence.toFixed(2)}%
              </span>
            </div>
          </div>

          <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
            <h4>Top 5 Predictions:</h4>
            {prediction.all_predictions.slice(0, 5).map((pred, idx) => (
              <div key={idx} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ textTransform: 'capitalize', fontWeight: '500' }}>{pred.class}</span>
                  <span style={{ fontWeight: 'bold' }}>{pred.confidence.toFixed(1)}%</span>
                </div>
                <div style={{ width: '100%', height: '10px', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${pred.confidence}%`,
                      height: '100%',
                      backgroundColor: '#4CAF50',
                      borderRadius: '5px',
                      transition: 'width 0.5s ease'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={resetAll}
            style={{
              width: '100%',
              marginTop: '20px',
              padding: '12px',
              fontSize: '16px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Classify Another Image
          </button>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '40px', color: '#666' }}>
        <p>Powered by TensorFlow & React</p>
      </div>
    </div>
  );
}

export default App;