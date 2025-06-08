import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [feedback, setFeedback] = useState({ name: "", email: "", message: "" });
  const [feedbackList, setFeedbackList] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch("https://cyberwarefeedbackbackend.onrender.com/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedback)
      });

      if (res.ok) {
        setSuccess(true);
        setFeedback({ name: "", email: "", message: "" });
        fetchFeedback();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Submission failed.");
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };

  const fetchFeedback = async () => {
    try {
      const res = await fetch("https://cyberwarefeedbackbackend.onrender.com/feedback");
      const data = await res.json();
      setFeedbackList(data);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Feedback Form</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="name">Name</label>
                <input
                  name="name"
                  value={feedback.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  name="email"
                  value={feedback.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  type="email"
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="message">Feedback</label>
                <textarea
                  name="message"
                  value={feedback.message}
                  onChange={handleChange}
                  placeholder="Your feedback..."
                  className="form-control"
                  rows="4"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">Submit</button>

              {success && (
                <div className="alert alert-success mt-3" role="alert">
                  Feedback submitted successfully!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        <div className="col-md-10">
          <h4 className="mb-3">All Feedback</h4>
          <div className="list-group">
            {feedbackList.map(fb => (
              <div key={fb._id} className="list-group-item shadow-sm mb-2">
                <h5 className="mb-1">{fb.name} <small className="text-muted">({fb.email})</small></h5>
                <p className="mb-1">{fb.message}</p>
                <small className="text-muted">{new Date(fb.timestamp).toLocaleString()}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
